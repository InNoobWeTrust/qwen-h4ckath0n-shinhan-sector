import type { ScoreComponents } from "../lib/creditScoring"
import {
  normalizeProviderBaseUrl,
  type ProviderCredential,
} from "../lib/explainSession"
import { mockMerchants } from "../lib/mockMerchants"
import { getStaticExplanation } from "../lib/qwenExplain"
import { errorResponse, jsonResponse } from "../lib/utils"

interface ExplainScoreRequestBody {
  score?: number
  band?: string
  components?: unknown
  merchantName?: string
  customProvider?: ProviderCredential & { provider?: string }
}

interface ChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string | Array<{ type?: string; text?: string }>
    }
  }>
}

const componentMetadata: Array<{
  key: keyof ScoreComponents
  label: string
  weight: number
}> = [
  { key: "revenue", label: "Doanh thu", weight: 0.35 },
  { key: "stability", label: "Ổn định", weight: 0.25 },
  { key: "payment", label: "Thanh toán", weight: 0.25 },
  { key: "diversity", label: "Đa dạng", weight: 0.15 },
]

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value)
}

function normalizeComponents(input: unknown): ScoreComponents | null {
  if (!input || typeof input !== "object") return null

  const raw = input as Record<string, unknown>
  const revenue = raw.revenue ?? raw.revenueScore
  const stability = raw.stability ?? raw.stabilityScore
  const payment = raw.payment ?? raw.paymentScore
  const diversity = raw.diversity ?? raw.diversityScore

  if (
    !isFiniteNumber(revenue) ||
    !isFiniteNumber(stability) ||
    !isFiniteNumber(payment) ||
    !isFiniteNumber(diversity)
  ) {
    return null
  }

  return { revenue, stability, payment, diversity }
}

function extractTextContent(content: string | Array<{ type?: string; text?: string }> | undefined): string | null {
  if (typeof content === "string") {
    return content.trim() || null
  }

  if (!Array.isArray(content)) return null

  const text = content
    .map((item) => (typeof item?.text === "string" ? item.text : ""))
    .join("\n")
    .trim()

  return text || null
}

function detectFocus(components: ScoreComponents) {
  const activeComponents = componentMetadata.filter(({ key }) => components[key] > 0)
  return activeComponents.length === 1 ? activeComponents[0] : null
}

function buildFallbackExplanation(
  score: number,
  band: string,
  components: ScoreComponents,
  merchantName: string,
): string {
  const focus = detectFocus(components)

  if (focus) {
    const value = components[focus.key]
    const contribution = Math.round(value * focus.weight * 8.5)
    const assessment =
      value >= 70
        ? "đang là điểm mạnh rõ ràng"
        : value >= 55
          ? "đang ở mức khá ổn"
          : value >= 40
            ? "cần được cải thiện để tránh kéo tổng điểm đi xuống"
            : "đang là điểm nghẽn lớn nhất trong hồ sơ hiện tại"

    return `${focus.label} của ${merchantName} đang ở mức ${value}/100 và ${assessment}. Với trọng số ${Math.round(focus.weight * 100)}%, trụ cột này đóng góp khoảng ${contribution} điểm vào tổng đánh giá. Nếu ưu tiên cải thiện trụ cột này trong 1-2 chu kỳ kinh doanh tiếp theo, khả năng tiếp cận hạn mức sẽ dễ dàng hơn.`
  }

  const strongest = componentMetadata.reduce((best, current) =>
    components[current.key] > components[best.key] ? current : best,
  )
  const weakest = componentMetadata.reduce((worst, current) =>
    components[current.key] < components[worst.key] ? current : worst,
  )
  const matchedMerchant = Object.values(mockMerchants).find((m) => m.name === merchantName)

  if (matchedMerchant) {
    const staticExplanation = getStaticExplanation(matchedMerchant.id)
    return `${merchantName} đang có điểm tín dụng ${score}/850 thuộc nhóm ${band}. ${staticExplanation.summary} ${staticExplanation.positiveNarrative} ${staticExplanation.negativeNarrative} ${staticExplanation.whatIf}.`
  }

  return `${merchantName} đang có điểm tín dụng ${score}/850 thuộc nhóm ${band}. Trụ cột ${strongest.label.toLowerCase()} hiện là điểm tựa tốt nhất, trong khi ${weakest.label.toLowerCase()} đang kéo tổng điểm xuống. Nếu merchant ưu tiên cải thiện ${weakest.label.toLowerCase()} song song với việc duy trì ${strongest.label.toLowerCase()}, khả năng được đề xuất hạn mức sẽ tích cực hơn.`
}

function buildPrompt(score: number, band: string, components: ScoreComponents, merchantName: string) {
  const focus = detectFocus(components)
  const componentLines = componentMetadata
    .map(
      ({ key, label, weight }) =>
        `- ${label}: ${components[key]}/100 (trọng số ${Math.round(weight * 100)}%)`,
    )
    .join("\n")

  const system =
    "Bạn là trợ lý giải thích điểm tín dụng cho merchant SME tại Việt Nam. Chỉ sử dụng dữ liệu được cung cấp, không bịa đặt thêm, không nhắc đến hệ thống nội bộ hay nhà cung cấp. Trả lời bằng tiếng Việt có dấu trong 3-4 câu rõ ràng, thực tế và hữu ích cho người kinh doanh."

  const user = [
    `Merchant: ${merchantName}`,
    `Tổng điểm hồ sơ: ${score}`,
    `Phân loại: ${band}`,
    "Thành phần điểm:",
    componentLines,
    focus
      ? `Hãy tập trung giải thích riêng trụ cột ${focus.label}, vì đây là yêu cầu cho nút sparkle tại thẻ thành phần.`
      : "Hãy giải thích tổng quan 4 trụ cột, nếu điểm mạnh và điểm cần ưu tiên cải thiện.",
    "Kết thúc bằng một gợi ý ngắn gọn về hành động merchant nên ưu tiên tiếp theo.",
  ].join("\n")

  return { system, user }
}

async function requestExplanation(
  provider: ProviderCredential,
  score: number,
  band: string,
  components: ScoreComponents,
  merchantName: string,
): Promise<string> {
  const { system, user } = buildPrompt(score, band, components, merchantName)
  const modelName = provider.model.trim() || "x-ai/grok-code-fast-1:optimized:free"
  const endpoint = `${provider.baseUrl.replace(/\/+$/, "")}/chat/completions`

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${provider.apiKey}`,
    },
    body: JSON.stringify({
      model: modelName,
      temperature: 0.4,
      max_tokens: 320,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`Upstream request failed with status ${response.status}`)
  }

  const data = (await response.json()) as ChatCompletionResponse
  const explanation = extractTextContent(data.choices?.[0]?.message?.content)

  if (!explanation) {
    throw new Error("No explanation returned from upstream model")
  }

  return explanation
}

export async function handleExplainScore(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return errorResponse("Method Not Allowed", 405)
  }

  let body: ExplainScoreRequestBody

  try {
    body = (await request.json()) as ExplainScoreRequestBody
  } catch {
    return errorResponse("Invalid JSON", 400)
  }

  const components = normalizeComponents(body.components)

  if (
    !isFiniteNumber(body.score) ||
    typeof body.band !== "string" ||
    !body.band.trim() ||
    typeof body.merchantName !== "string" ||
    !body.merchantName.trim() ||
    !components
  ) {
    return errorResponse("Missing or invalid fields", 400)
  }

  if (!body.customProvider) {
    return errorResponse("Vui lòng cấu hình provider trước khi sử dụng.", 400)
  }

  const baseUrl = normalizeProviderBaseUrl(body.customProvider.baseUrl)
  const apiKey = body.customProvider.apiKey?.trim()

  if (!baseUrl || !apiKey) {
    return errorResponse("Base URL và API key là bắt buộc.", 400)
  }

  const provider: ProviderCredential = {
    baseUrl,
    apiKey,
    model: body.customProvider.model?.trim() || "x-ai/grok-code-fast-1:optimized:free",
  }

  const fallbackExplanation = buildFallbackExplanation(
    body.score,
    body.band,
    components,
    body.merchantName,
  )

  try {
    const explanation = await requestExplanation(
      provider,
      body.score,
      body.band,
      components,
      body.merchantName,
    )
    return jsonResponse({ explanation })
  } catch {
    return jsonResponse({ explanation: fallbackExplanation })
  }
}
