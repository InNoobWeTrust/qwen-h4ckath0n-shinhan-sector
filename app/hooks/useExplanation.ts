import { useCallback, useEffect, useRef, useState } from "react"
import type { ScoreComponents } from "../src/lib/creditScoring"
import { PUTER_PROVIDERS, checkPuterAuth } from "../src/lib/explainSession"

interface ExplanationPayload {
  score: number
  band: string
  components: ScoreComponents
  merchantName: string
}

interface UseExplanationOptions {
  payload: ExplanationPayload
  getProvider: () => { provider: string; baseUrl: string; apiKey: string; model: string } | null
  onProviderRequired?: () => void
  onPuterNotSignedIn?: () => void
}

const COOLDOWN_MS = 3000

const componentMetadata: Array<{ key: keyof ScoreComponents; label: string; weight: number }> = [
  { key: "revenue", label: "Doanh thu", weight: 0.35 },
  { key: "stability", label: "Ổn định", weight: 0.25 },
  { key: "payment", label: "Thanh toán", weight: 0.25 },
  { key: "diversity", label: "Đa dạng", weight: 0.15 },
]

function buildPrompt(score: number, band: string, components: ScoreComponents, merchantName: string): { system: string; user: string } {
  const activeComponents = componentMetadata.filter(({ key }) => components[key] > 0)
  const focus = activeComponents.length === 1 ? activeComponents[0] : null

  const componentLines = componentMetadata
    .map(({ key, label, weight }) => `- ${label}: ${components[key]}/100 (trọng số ${Math.round(weight * 100)}%)`)
    .join("\n")

  const system =
    "Bạn là trợ lý giải thích điểm tín dụng cho merchant SME tại Việt Nam. Chỉ sử dụng dữ liệu được cung cấp, không bịa đặt thêm, không nhắc đến hệ thống nội bộ hay nhà cung cấp. Trả lời bằng tiếng Việt có dấu trong 3-4 câu rõ ràng, thực tế và hữu ích cho người kinh doanh."

  const focusInstruction = focus
    ? `Hãy tập trung giải thích riêng trụ cột ${focus.label}, vì đây là yêu cầu cho nút sparkle tại thẻ thành phần.`
    : "Hãy giải thích tổng quan 4 trụ cột, nếu điểm mạnh và điểm cần ưu tiên cải thiện."

  const user = [
    `Merchant: ${merchantName}`,
    `Tổng điểm hồ sơ: ${score}`,
    `Phân loại: ${band}`,
    "Thành phần điểm:",
    componentLines,
    focusInstruction,
    "Kết thúc bằng một gợi ý ngắn gọn về hành động merchant nên ưu tiên tiếp theo.",
  ].join("\n")

  return { system, user }
}

function buildFallback(score: number, band: string, components: ScoreComponents, merchantName: string): string {
  const strongest = componentMetadata.reduce((best, c) =>
    components[c.key] > components[best.key] ? c : best,
  )
  const weakest = componentMetadata.reduce((worst, c) =>
    components[c.key] < components[worst.key] ? c : worst,
  )
  return `${merchantName} đang có điểm tín dụng ${score}/850 thuộc nhóm ${band}. Trụ cột ${strongest.label.toLowerCase()} hiện là điểm tựa tốt nhất, trong khi ${weakest.label.toLowerCase()} đang kéo tổng điểm xuống. Nếu merchant ưu tiên cải thiện ${weakest.label.toLowerCase()} song song với việc duy trì ${strongest.label.toLowerCase()}, khả năng được đề xuất hạn mức sẽ tích cực hơn.`
}

export function useExplanation({ payload, getProvider, onProviderRequired, onPuterNotSignedIn }: UseExplanationOptions) {
  const [explanation, setExplanation] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lastRequestedAtRef = useRef(0)

  useEffect(() => {
    setExplanation(null)
    setError(null)
    setLoading(false)
  }, [
    payload.score,
    payload.band,
    payload.merchantName,
    payload.components.revenue,
    payload.components.stability,
    payload.components.payment,
    payload.components.diversity,
  ])

  const requestExplanation = useCallback(async () => {
    if (loading) return

    const provider = getProvider()
    if (!provider) {
      onProviderRequired?.()
      return
    }

    const now = Date.now()
    if (now - lastRequestedAtRef.current < COOLDOWN_MS) return
    lastRequestedAtRef.current = now

    setExplanation(null)
    setLoading(true)
    setError(null)

    const { system, user } = buildPrompt(
      payload.score,
      payload.band,
      payload.components,
      payload.merchantName,
    )

    try {
      let text: string | null = null

      if (PUTER_PROVIDERS.has(provider.provider)) {
        // Puter uses SDK instead of HTTP fetch
        const auth = await checkPuterAuth()
        if (!auth.signedIn) {
          onPuterNotSignedIn?.()
          setError("Vui lòng đăng nhập Puter trước.")
          setExplanation(buildFallback(payload.score, payload.band, payload.components, payload.merchantName))
          setLoading(false)
          return
        }

        const puter = (window as any).puter
        const messages = [
          { role: "system", content: system },
          { role: "user", content: user },
        ]

        const response = await puter.ai.chat(messages, {
          model: provider.model || "qwen/qwen-plus",
          temperature: 0.4,
          max_tokens: 320,
        })

        if (response?.message?.content) {
          const content = response.message.content
          if (typeof content === "string") {
            text = content.trim()
          } else if (Array.isArray(content)) {
            text = content.map((c: any) => typeof c?.text === "string" ? c.text : "").join("\n").trim()
          }
        }
      } else {
        // Standard HTTP fetch for all other providers
        const baseUrl = provider.baseUrl.replace(/\/+$/, "")
        const endpoint = `${baseUrl.replace(/\/chat\/completions$/, "")}/chat/completions`

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${provider.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: provider.model,
            messages: [
              { role: "system", content: system },
              { role: "user", content: user },
            ],
            temperature: 0.4,
            max_tokens: 320,
          }),
        })

        if (!response.ok) {
          let msg = `Yêu cầu thất bại (${response.status})`
          try {
            const errData = await response.json()
            msg = errData?.error || msg
          } catch {}
          throw new Error(msg)
        }

        const data = await response.json()

        if (typeof data?.choices?.[0]?.message?.content === "string") {
          text = (data.choices[0].message.content as string).trim()
        } else if (Array.isArray(data?.choices?.[0]?.message?.content)) {
          text = (data.choices[0].message.content as Array<{ type?: string; text?: string }>)
            .map((p) => (typeof p?.text === "string" ? p.text : ""))
            .join("\n")
            .trim()
        }
      }

      if (!text) {
        setExplanation(buildFallback(payload.score, payload.band, payload.components, payload.merchantName))
        setError("Không nhận được nội dung từ mô hình.")
      } else {
        setExplanation(text)
      }
    } catch (err) {
      setExplanation(buildFallback(payload.score, payload.band, payload.components, payload.merchantName))
      setError(err instanceof Error ? err.message : "Không thể tạo giải thích lúc này.")
    } finally {
      setLoading(false)
    }
  }, [getProvider, loading, onProviderRequired, onPuterNotSignedIn, payload])

  return { explanation, loading, error, requestExplanation }
}
