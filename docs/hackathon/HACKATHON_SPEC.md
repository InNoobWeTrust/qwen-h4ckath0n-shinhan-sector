# Hackathon Spec: Alternative Credit Scoring POC Demo

> **Status**: approved  
> **Scope**: 4-hour hackathon implementation  
> **Source inputs reviewed**: `docs/trd/CREDIT_SCORING_TRD.md`, `docs/prd/CREDIT_SCORING_PRD.md`, `app/components/CreditScoreModal.jsx`, `app/components/LoanApplicationModal.jsx`

## Goal

Build the smallest end-to-end demo that tells the full product story inside the existing SoftPOS UI: merchant profile selection, credit score preview, score explanation, and loan application submission. All data is mock, all outputs are deterministic, and all UI copy is optimized for demo clarity rather than production completeness.

---

## 1. Demo Flow

The demo starts on the existing Dashboard with one preselected merchant profile and one new credit-scoring card. The judge can switch between three merchants, instantly see how the score, score band, and loan limit change, open a detailed explanation modal, and then continue directly into a loan application flow with a pre-filled amount or a decline state. The full story must be visible in one sitting: verified-like operating data in the UI, a computed mock score, explainable factors, and a lending outcome.

```text
Merchant selects profile
        ↓
Dashboard shows CreditScorePanel card
        ↓
Click "Xem chi tiết"
        ↓
CreditScoreModal shows score + breakdown + factors + what-if
        ↓
Click "Đăng ký vay"
        ↓
LoanApplicationModal opens with pre-filled amount or decline state
        ↓
Submit
        ↓
Confirmation with mock requestId
```

---

## 2. Mock Merchant Profiles

### 2.1 Demo Profiles Table

| ID | Name | Business | Score | Band | Limit | Story |
|---|---|---|---:|---|---:|---|
| M1 | Chị Linh | Cửa hàng tiện lợi 24/7 | 760 | Tốt | 95M | Approved, good merchant |
| M2 | Anh Hùng | Quán trà sữa nhỏ | 640 | Trung bình | 30M | Borderline, needs improvement |
| M3 | Chị Mai | Hàng quán vỉa hè | 480 | Yếu nhiều | 0 | Declined, show adverse action |

### 2.2 Profile Details

#### M1 — Chị Linh

- **90-day transaction summary**
  - Total revenue: `286,400,000 VND`
  - Transaction count: `1,842`
  - Refund rate: `1.2%`
  - Unique payers: `624`
  - Data sources: `POS`, `MoMo`, `Shopee`
- **Internal scoring inputs (mock)**
  - Revenue: `59`
  - Stability: `54`
  - Payment: `52`
  - Diversity: `46`
  - Final formula result: `~759.4`, pin to `760` for demo
- **Displayed breakdown scores**
  - Revenue Stability: `82`
  - Payment Behavior: `78`
  - Business Consistency: `80`
- **Positive reason codes**
  - `R01` — Doanh thu ổn định hàng tháng
  - `R02` — Tỷ lệ đối soát đúng hạn cao
  - `R03` — Nguồn thu đa dạng
- **Negative reason codes**
  - `R06` — Doanh thu có biến động bất thường
  - `R07` — Tỷ lệ hoàn trả cao trong 30 ngày
  - `R10` — Nghi vấn mô hình giao dịch
- **Top 3 positive factors (VI)**
  - Doanh thu theo tuần ổn định trong suốt 90 ngày.
  - Tỷ lệ đối soát đúng hạn duy trì ở mức cao.
  - Nguồn thu đến từ nhiều kênh POS, MoMo và Shopee.
- **Top 3 negative factors (VI)**
  - Có một cụm doanh thu giảm nhẹ giữa tuần cần theo dõi.
  - Tỷ lệ hoàn trả tăng nhẹ trong 30 ngày gần nhất.
  - Một nhóm giao dịch lặp giá trị cần tiếp tục quan sát.
- **What-if**
  - Condition: `Doanh thu bình quân tháng tăng thêm 10% và giữ refund rate dưới 2%`
  - Improvement: `Điểm có thể tăng lên khoảng 772 và hạn mức hiển thị lên 100M`

#### M2 — Anh Hùng

- **90-day transaction summary**
  - Total revenue: `118,900,000 VND`
  - Transaction count: `742`
  - Refund rate: `5.8%`
  - Unique payers: `188`
  - Data sources: `POS`, `MoMo`
- **Internal scoring inputs (mock)**
  - Revenue: `45`
  - Stability: `42`
  - Payment: `38`
  - Diversity: `30`
  - Final formula result: `~642.1`, pin to `640` for demo
- **Displayed breakdown scores**
  - Revenue Stability: `58`
  - Payment Behavior: `49`
  - Business Consistency: `52`
- **Positive reason codes**
  - `R02` — Tỷ lệ đối soát đúng hạn cao
  - `R04` — Lịch sử giao dịch trên 90 ngày
  - `R05` — Đối soát thanh toán thường xuyên
- **Negative reason codes**
  - `R06` — Doanh thu có biến động bất thường
  - `R07` — Tỷ lệ hoàn trả cao trong 30 ngày
  - `R08` — Ít nguồn dữ liệu được xác minh
- **Top 3 positive factors (VI)**
  - Lịch sử giao dịch đã đủ dài để tham chiếu.
  - Đối soát thanh toán diễn ra khá đều.
  - Doanh thu vẫn duy trì được mức nền cơ bản mỗi tháng.
- **Top 3 negative factors (VI)**
  - Doanh thu biến động khá mạnh theo tuần.
  - Tỷ lệ hoàn trả cao hơn nhóm hồ sơ tốt.
  - Mới có hai nguồn dữ liệu được xác minh.
- **What-if**
  - Condition: `Giảm refund rate xuống dưới 3% và thêm 1 nguồn dữ liệu mới như Shopee`
  - Improvement: `Điểm có thể tăng lên khoảng 690 và hạn mức hiển thị lên 50M`

#### M3 — Chị Mai

- **90-day transaction summary**
  - Total revenue: `42,300,000 VND`
  - Transaction count: `268`
  - Refund rate: `12.6%`
  - Unique payers: `41`
  - Data sources: `POS`
- **Internal scoring inputs (mock)**
  - Revenue: `28`
  - Stability: `22`
  - Payment: `18`
  - Diversity: `10`
  - Final formula result: `~481.1`, pin to `480` for demo
- **Displayed breakdown scores**
  - Revenue Stability: `32`
  - Payment Behavior: `24`
  - Business Consistency: `20`
- **Positive reason codes**
  - `R02` — Tỷ lệ đối soát đúng hạn cao
  - `R04` — Lịch sử giao dịch trên 90 ngày
  - `R05` — Đối soát thanh toán thường xuyên
- **Negative reason codes**
  - `R06` — Doanh thu có biến động bất thường
  - `R07` — Tỷ lệ hoàn trả cao trong 30 ngày
  - `R08` — Ít nguồn dữ liệu được xác minh
- **Top 3 positive factors (VI)**
  - Hồ sơ đã có dữ liệu giao dịch vượt 90 ngày.
  - Dòng tiền vẫn được đối soát khá thường xuyên.
  - Có hoạt động bán hàng lặp lại theo các khung giờ quen thuộc.
- **Top 3 negative factors (VI)**
  - Doanh thu biến động mạnh và thiếu ổn định.
  - Tỷ lệ hoàn trả cao trong 30 ngày gần nhất.
  - Chỉ có một nguồn dữ liệu được xác minh.
- **What-if**
  - Condition: `Thêm nguồn MoMo hoặc Shopee, giảm refund rate xuống dưới 4%, không có tuần trống giao dịch`
  - Improvement: `Điểm có thể tăng lên khoảng 620 và đủ điều kiện cho khoản vay nhỏ 10M`

---

## 3. Scoring Mechanism

Use one transparent mock formula in `creditScoring.ts` and keep the three demo merchants precomputed so the UI is stable during the presentation.

```typescript
score = (
  revenue_score * 0.35 +
  stability_score * 0.25 +
  payment_score * 0.25 +
  diversity_score * 0.15
) * 8.5 + 300
```

- Each component is `0-100` and derived from the hardcoded merchant profile.
- `Math.round()` the final score, then clamp to `300-850`.
- For demo stability, the endpoint returns the pre-pinned profile score (`760`, `640`, `480`) rather than recalculating from live inputs every render.
- The 3-bar UI breakdown is a presentation layer, not the exact weighted formula inputs.

### Demo Band Mapping

Use these simplified bands for the hackathon build:

- `750+`: `Tốt`
- `700-749`: `Khá`
- `640-699`: `Trung bình`
- `600-639`: `Yếu`
- `<600`: `Yếu nhiều`

> Demo note: `640` is intentionally treated as `Trung bình` so M2 stays a clear borderline case in the UI.

### Demo Limit Envelopes

- `750+`: `95-100M VND`
- `700-749`: `50-95M VND`
- `640-699`: `20-50M VND`
- `600-639`: `5-20M VND`
- `<600`: `0` (decline)

Profile limits are fixed inside those envelopes:

- `M1` → `95M`
- `M2` → `30M`
- `M3` → `0`

---

## 4. Reason Codes

Use exactly 10 active reason codes for the demo.

| Code | VI | EN | Polarity |
|---|---|---|---|
| R01 | Doanh thu ổn định hàng tháng | Stable monthly revenue | + |
| R02 | Tỷ lệ đối soát đúng hạn cao | High on-time settlement rate | + |
| R03 | Nguồn thu đa dạng | Diverse revenue streams | + |
| R04 | Lịch sử giao dịch trên 90 ngày | Transaction history over 90 days | + |
| R05 | Đối soát thanh toán thường xuyên | Regular payment reconciliation | + |
| R06 | Doanh thu có biến động bất thường | Abnormal revenue fluctuation | - |
| R07 | Tỷ lệ hoàn trả cao trong 30 ngày | High refund rate in last 30 days | - |
| R08 | Ít nguồn dữ liệu được xác minh | Few verified data sources | - |
| R09 | Khoảng thời gian không hoạt động | Inactive period detected | - |
| R10 | Nghi vấn mô hình giao dịch | Suspicious transaction pattern | - |

Assignment rule for demo:

- Every merchant profile ships with exactly `3` positive codes and `3` negative codes.
- API response expands code IDs into Vietnamese text.
- English text stays in `reasonCodes.ts` for pitch deck or later bilingual use, but the first-pass UI only needs Vietnamese.

---

## 5. UI Integration Spec

### 5.1 CreditScorePanel.jsx (new)

Add one new dashboard card that matches the existing `OverviewCard` visual language.

- Large number: score (`760` style) with band-colored badge
- Progress bar: visual score position across `300-850`
- Subtitle: `Đề xuất hạn mức: X triệu VND`
- Button: `Xem chi tiết` → opens `CreditScoreModal`
- Button: `Đăng ký vay` → opens `LoanApplicationModal`
- If `score < 600`, hide the loan button or replace it with `Không đủ điều kiện`

Fastest integration path:

- Replace one existing overview card in `Dashboard.jsx`, not the hero section
- Add a small `Chuyển hồ sơ` dropdown above or inside the credit card
- Default selected merchant: `M1`

### 5.2 CreditScoreModal wiring

Reuse the existing modal shell and gauge. Keep the visual layout; only make the content data-driven.

```typescript
{
  score,
  maxScore = 850,
  change,
  breakdown,
  positiveFactors,
  negativeFactors,
  whatIf,
}
```

- `score` is passed directly to the existing gauge component
- `breakdown` shape:
  `[{ label, score: 0-100, description }]`
- `positiveFactors` and `negativeFactors` shape:
  `[{ code, text }]`
- Replace the current static support/risk text blocks with mapped factor lists
- Add one small what-if panel under the factors if time allows

### 5.3 LoanApplicationModal wiring

Reuse the existing 4-step modal flow. Do not redesign the steps.

- Add `initialAmount` prop and initialize step 1 from it
- If `score < 600` or `initialAmount === 0`, show a decline state instead of the amount slider
- On submit, generate a mock `requestId` client-side
- Confirmation screen stays as-is, but reflects the selected merchant and requested amount

---

## 6. API Endpoint

One endpoint is enough for the POC.

```typescript
// POST /api/credit-score
// Request: { merchantId: string }
// Response:
{
  merchantId: string,
  score: number,           // 300-850
  band: string,            // "Tốt" | "Khá" | "Trung bình" | "Yếu" | "Yếu nhiều"
  limit: number,           // VND amount, 0 if declined
  change: string,          // "+12 điểm" or "-8 điểm"
  breakdown: [
    { label: string, score: number, description: string }
  ],
  positiveFactors: [{ code: string, text: string }],
  negativeFactors: [{ code: string, text: string }],
  whatIf: { condition: string, improvement: string }
}
```

Implementation notes:

- Read the merchant from `mockMerchants.ts`
- Expand reason code IDs using `reasonCodes.ts`
- Return hardcoded JSON immediately; no database and no async scoring job
- Keep `change` fixed per merchant for the demo, e.g. `M1 +12 điểm`, `M2 -4 điểm`, `M3 -11 điểm`

---

## 7. Mock Data Structure

```typescript
interface MerchantProfile {
  id: string
  name: string
  businessType: string
  dataSources: string[]       // ["POS", "Shopee", "MoMo"]
  historyDays: number
  transactions: {
    totalRevenue: number      // VND
    txnCount: number
    refundRate: number        // 0-1
    uniquePayers: number
    avgMonthlyRevenue: number
    revenueCV: number         // coefficient of variation
  }
  scores: {
    revenue: number           // 0-100
    stability: number
    payment: number
    diversity: number
  }
  score: number               // computed final, pinned for demo stability
  band: string
  limit: number
  positiveFactors: string[]   // reason code IDs
  negativeFactors: string[]
  whatIf: { condition: string, improvement: string }
}
```

API layer additions:

- `breakdown[]` is derived from the profile into 3 UI bars
- factor text is expanded from the reason code lookup table
- no persistence is required

---

## 8. File Structure

```text
app/src/lib/
  creditScoring.ts      # score calculation + band/limit helpers
  mockMerchants.ts      # 3 pre-built MerchantProfile objects
  reasonCodes.ts        # 10 reason code definitions with VI/EN text

app/routes/api/
  credit-score.ts       # POST handler, returns mock response

app/components/
  CreditScorePanel.jsx  # NEW: dashboard card, score preview + buttons
  CreditScoreModal.jsx  # EXISTING: keep shell, make content data-driven
  LoanApplicationModal.jsx # EXISTING: add initialAmount + decline state
```

---

## 9. Implementation Steps (4 Hours)

### Hour 1 — Data and Endpoint

- Create `mockMerchants.ts` with the 3 fixed profiles
- Create `reasonCodes.ts` with the 10 active codes
- Create `creditScoring.ts` with formula, band mapping, and limit mapping helpers
- Create `POST /api/credit-score` returning one resolved mock profile

### Hour 2 — Dashboard Card

- Build `CreditScorePanel.jsx`
- Add it to the dashboard overview row
- Add local state for `selectedMerchant`
- Fetch `/api/credit-score` when the merchant changes
- Preselect `M1`

### Hour 3 — Modal Wiring

- Pass API payload into `CreditScoreModal`
- Replace static factor text with mapped positive/negative factors
- Pass `initialAmount` into `LoanApplicationModal`
- Add decline state for `M3`
- Test `M1 → M2 → M3`

### Hour 4 — Demo Polish

- Add `Chuyển hồ sơ` dropdown
- Verify score color/badge changes correctly by band
- Verify Vietnamese strings render cleanly
- Add what-if panel if still missing
- Run full demo flow start-to-finish without touching code

---

## 10. Out of Scope

- No DuckDB
- No real data pipeline
- No WoE calibration or model training
- No entity resolution
- No fraud rules engine beyond static reason codes
- No seasonality normalization
- No LLM calls
- No PDPD or SBV compliance package
- No progressive limit automation
- No persistence of submitted loan applications

Everything above is future roadmap, not part of the 4-hour POC.

---

## 11. Acceptance Criteria

1. Dashboard shows `CreditScorePanel` for `M1` by default with score `760`, band `Tốt`, and limit `95M`
2. Switching to `M2` shows score `640`, band `Trung bình`, and limit `30M`
3. Switching to `M3` shows score `480`, band `Yếu nhiều`, and limit `0` with a decline message
4. `CreditScoreModal` opens with the correct gauge position, breakdown bars, and positive/negative factors for the selected merchant
5. `LoanApplicationModal` pre-fills the amount from the selected merchant limit and shows a mock confirmation after submit
6. `M3` does not allow a normal loan application flow; the UI either hides `Đăng ký vay` or shows `Không đủ điều kiện`

---

## 12. Qwen Cloud LLM Integration

This section defines an optional sponsor-aligned demo mode for the hackathon presentation. The base POC remains deterministic in local development, while demo mode can use Qwen Cloud to generate richer Vietnamese credit explanations.

### 12.1 Why Qwen

- Qwen is Alibaba's flagship LLM (sponsor model — use it for hackathon demo to show sponsor alignment)
- OpenAI-compatible API — drop-in replacement
- Global endpoint (Singapore): `https://dashscope-intl.aliyuncs.com/compatible-mode/v1`
- New user free quota available
- Coding Plan: `$50/mo for 90K requests` (if needed)

### 12.2 Relevant Qwen Capabilities for Credit Scoring

1. **Function Calling** — connect LLM to structured reason code catalog
2. **Structured Output (JSON mode)** — guaranteed valid JSON responses
3. **Thinking Mode** — step-by-step reasoning for explainability
4. **Multilingual** — excellent Vietnamese support
5. **1M context** — enough for full merchant profile + reason code context

### 12.3 Model Selection

| Model | Use Case | Cost |
|---|---|---|
| `qwen3.5-flash` | Local dev/testing (free tier) | Free tier / `$0.3/M input` |
| `qwen3.6-plus` | Hackathon demo (flagship) | `$0.05-2.5/M input`, `$3-6/M output` |

### 12.4 Dual-Model Architecture (Local + Qwen)

```text
Development mode (ENV=local):
  → Use static Vietnamese text from reasonCodes.ts
  → No API call, no latency, no cost
  → All explanations pre-written

Demo mode (ENV=demo, hackathon):
  → Call Qwen3.6-plus API
  → Pass reason codes as structured context
  → Get natural language explanation in Vietnamese
  → Compare: static vs LLM-generated (show both)
```

### 12.5 Prompt Template for Reason Code Explanation

```text
System: Bạn là trợ lý giải thích tín dụng cho doanh nhân Việt Nam.
Bạn chỉ được dịch/render các lý do có trong danh sách cho phép.
Không được phép thêm, bớt, hoặc thay đổi bất kỳ thông tin nào.

Cho phép: {list_of_active_codes}

Mã {code_id}: {vi_text}

---

Merchant: {merchant_name}
Điểm: {score}/850
Ngày: {date}

Chỉ sử dụng các mã từ danh sách cho phép bên trên.
Trả lời bằng JSON.
```

### 12.6 API Integration Code

```typescript
// app/src/lib/qwenExplain.ts
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
})

export async function explainWithQwen(
  merchantId: string,
  score: number,
  positiveCodes: string[],
  negativeCodes: string[]
): Promise<{
  summary: string
  positiveNarrative: string
  negativeNarrative: string
  whatIf: string
}> {
  const isDemo = process.env.ENV === 'demo'
  
  if (!isDemo) {
    // Return static explanations in dev mode
    return getStaticExplanation(merchantId)
  }

  const completion = await client.chat.completions.create({
    model: 'qwen3.6-plus',
    messages: [
      {
        role: 'system',
        content: `Bạn là trợ lý giải thích tín dụng. Chỉ dịch/render các mã lý do được cung cấp.
Không được phép tạo mới, sửa đổi, hoặc thêm thông tin.
Luôn trả lời bằng JSON hợp lệ.`
      },
      {
        role: 'user',
        content: `Merchant: ${merchantId}\nĐiểm: ${score}/850\nCác yếu tố tích cực: ${positiveCodes.join(', ')}\nCác yếu tố tiêu cực: ${negativeCodes.join(', ')}\n\nTrả lời JSON với: summary, positiveNarrative, negativeNarrative, whatIf`
      }
    ],
    response_format: { type: 'json_object' },
  })

  return JSON.parse(completion.choices[0].message.content)
}
```

### 12.7 Qwen Credentials Setup

- Get API key: https://home.qwencloud.com/api-keys
- Set in `.dev.vars`: `DASHSCOPE_API_KEY=sk-...`
- Set `ENV=demo` in wrangler for hackathon demo
- `ENV=local` or unset → static explanations (no API call)

### 12.8 What to Show Judges (Demo Talking Points)

1. "We use Qwen Cloud for production-grade LLM explanations — cost effective vs OpenAI"
2. Show side-by-side: static VI text vs Qwen-generated narrative
3. "Qwen's structured output guarantees valid JSON — no hallucination risk"
4. "Function calling lets us build agentic credit assistants in the future"
5. Cost comparison: Qwen vs GPT-4o for same task

### 12.9 Fallback Safety

- If Qwen API fails → fall back to static explanations
- If `ENV != demo` → always use static (no API dependency during development)
- Timeout: `3` second max for demo; fallback on timeout
