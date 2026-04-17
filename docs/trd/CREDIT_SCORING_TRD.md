# Technical Requirements Document: Alternative Credit Scoring — Hackathon Build

> **Status**: approved
> **Scope**: Hackathon demo build (36–48 hours)
> **Parent PRD**: `docs/specs/CREDIT_SCORING.md`
> **PRD Goals addressed**: Explainable alternative scoring for Vietnam SME merchants; WoE logistic scorecard; fixed reason codes; auditable pipeline; bilingual explanation renderer
> **Author**: Engineering Team
> **Created**: 2026-04-17

---

## 1. Purpose and Hackathon Scope

This TRD specifies what the team **builds and demos** in 36–48 hours. It strips the full PRD down to the minimum coherent slice that tells the story: raw merchant transactions → normalized ledger → WoE scorecard → bilingual explanation → interactive dashboard.

Everything else is **post-hackathon**. The goal is a compelling, explainable demo — not a production system.

The credit scoring feature is **not a standalone app**. It integrates directly into the existing SoftPOS React application as an additional card and two modal flows that are already scaffolded in the codebase.

---

## 2. System Architecture

```
┌──────────────────────────┐
│  mockMerchantData.ts      │  (5 merchants × 90-day TypeScript tx history)
└───────────┬──────────────┘
            │ merchant profile + raw tx arrays
            ▼
┌──────────────────────────┐
│  canonicalLedger.ts       │  (DuckDB in-process, 14-field schema)
└───────────┬──────────────┘
            │ SQL aggregates
            ▼
┌──────────────────────────┐
│  creditScoring.ts         │  (feature engine + WoE bins + reason router)
│  • history_len            │
│  • revenue_zscore         │
│  • inflow_cv              │
│  • fast_refund_rate       │
└───────────┬──────────────┘
            │ { score, band, breakdown, factors, limit }
            ▼
┌──────────────────────────┐
│  POST /api/credit-score   │  (app/routes/api/credit-score.ts)
└───────────┬──────────────┘
            │ JSON response
            ▼
┌──────────────────────────────────────────────────────────┐
│  Dashboard.jsx  (existing SoftPOS React app)              │
│                                                           │
│  OverviewCard grid  ←  NEW: CreditScorePanel.jsx          │
│  (Tín dụng của tôi card — score preview + limit + CTA)   │
│                    │                                      │
│                    ├──► CreditScoreModal.jsx (existing)   │
│                    │    • Gauge (score/850)               │
│                    │    • Breakdown bars                  │
│                    │    • Positive/Negative factors       │
│                    │                                      │
│                    └──► LoanApplicationModal.jsx (exist.) │
│                         • 4-step flow                     │
│                         • amount pre-filled from limit    │
│                         • mock requestId confirmation     │
└──────────────────────────────────────────────────────────┘
```

**Key architectural decision**: Everything runs in the existing React/TypeScript app. The scoring pipeline executes server-side inside the app's API route using DuckDB-WASM or the Node.js DuckDB binding. No separate Python process, no separate server, no Streamlit. The entire demo runs from `npm run dev` on one port.

---

## 3. Component Specifications

### 3.1 Mock Data Generator

**File**: `app/src/lib/mockMerchantData.ts`

Produces 5 merchant profiles with 90-day transaction histories as TypeScript objects. Writes directly to DuckDB via `canonicalLedger.ts`.

#### Merchant Profiles

| ID | Name | Business Type | History | Profile Intent |
|----|------|---------------|---------|----------------|
| `M001` | Nguyễn Thị Linh | Food & Beverage POS | 90 days | **Good** — stable revenue, low refunds, diverse counterparties |
| `M002` | Trần Văn Hùng | Marketplace seller | 90 days | **Borderline** — moderate revenue, moderate refund rate, some inactivity gaps |
| `M003` | Lê Thị Mai | E-wallet services | 90 days | **Declined** — high fast-refund rate, concentrated counterparties, volatile inflows |
| `M004` | Phạm Quốc Bảo | Marketplace | 14 days | **Thin-file** — brand new seller, minimal history |
| `M005` | Vũ Minh Tuấn | Mixed POS + EWALLET | 90 days | **Gaming pattern** — circular counterparties, velocity spikes (fraud flags triggered) |

#### Generation Rules

- `M001`: 8–15 inflow transactions/week, inflow CV < 0.20, refund rate < 2%, unique payer ratio > 0.60
- `M002`: 4–8 inflow transactions/week, inflow CV 0.25–0.40, refund rate 4–7%, some 5–7 day gaps
- `M003`: 3–6 inflow transactions/week, fast-refund rate > 12%, top-3 payers > 75% of inflows
- `M004`: transactions only in last 14 calendar days, < 20 total inflow records
- `M005`: includes 3 weeks of velocity spike (> 4× baseline), ≥ 5 circular counterparty pairs

#### Source Types to Mock

| Source | Merchants | Authenticity Multiplier Used |
|--------|-----------|------------------------------|
| `POS` | M001, M005 | `1.00` (API import) |
| `MARKETPLACE` | M002, M004 | `1.00` |
| `EWALLET` | M003, M005 | `1.00` |

#### Confidence Score Shortcut (Hackathon)

For all mock records, use a simplified confidence score:

```typescript
const confidenceScore =
  SOURCE_WEIGHTS[sourceType] * 1.00 * 1.00 * TIER_MULTIPLIERS[resolutionTier] * 1.00
// connectorAuthenticity = 1.00 (all mock = API import)
// fieldCompleteness     = 1.00 (all fields populated by generator)
// duplicatePenalty      = 1.00 (no duplicates in mock data)
```

Source weights per PRD: `POS=0.80`, `MARKETPLACE=0.85`, `EWALLET=0.90`.
Resolution tiers: M001–M004 use `TIER_2_BANK_ACCOUNT` (multiplier `0.95`); M005 uses `TIER_4_PHONE_ONLY` (multiplier `0.65`).

---

### 3.2 DuckDB Canonical Ledger

**File**: `app/src/lib/canonicalLedger.ts`

Single DuckDB file: `app/data/demo.duckdb`. Schema is the full 14-field canonical schema from the PRD — no shortcuts on the schema, since it is the artifact judges will inspect.

#### Table: `canonical_ledger`

```sql
CREATE TABLE canonical_ledger (
  ledger_txn_id       VARCHAR PRIMARY KEY,
  canonical_entity_id VARCHAR NOT NULL,
  source_type         VARCHAR NOT NULL,   -- POS | MARKETPLACE | EWALLET
  source_record_id    VARCHAR NOT NULL,
  event_timestamp     TIMESTAMPTZ NOT NULL,
  settlement_timestamp TIMESTAMPTZ,
  currency_code       VARCHAR NOT NULL DEFAULT 'VND',
  amount_minor        BIGINT NOT NULL CHECK (amount_minor > 0),
  direction           VARCHAR NOT NULL CHECK (direction IN ('INFLOW','OUTFLOW')),
  counterparty_ref    VARCHAR NOT NULL,
  channel             VARCHAR NOT NULL,
  transaction_type    VARCHAR NOT NULL,
  confidence_score    DECIMAL(4,3) NOT NULL CHECK (confidence_score BETWEEN 0 AND 1),
  raw_record_hash     VARCHAR NOT NULL,
  UNIQUE (source_type, source_record_id)
);
```

**Validation on insert** (enforced in TypeScript, not DB triggers for hackathon speed):
- Reject if `confidence_score < 0.250`
- Reject if `amount_minor <= 0`
- Reject duplicate `(source_type, source_record_id)` pairs

---

### 3.3 Feature Engine

**File**: `app/src/lib/creditScoring.ts` (feature section)

Computes exactly **4 features** from the canonical ledger via DuckDB SQL. Takes `canonicalEntityId` as input, returns a feature dict.

#### Active Features (Hackathon)

| Feature ID | Name | SQL Derivation Window | Scorecard Role |
|------------|------|-----------------------|----------------|
| `F01` | `history_length_days` | `MAX(event_timestamp) - MIN(event_timestamp)` over all records | Thin-file gate + scorecard |
| `F03` | `revenue_zscore` | Simplified: normalized weekly avg inflow vs peer median (hard-coded peer medians per sector in mock) | Primary revenue signal |
| `F04` | `inflow_cv` | `STDDEV(weekly_inflow) / AVG(weekly_inflow)` over 90d | Stability signal |
| `F06` | `fast_refund_rate` | `SUM(amount WHERE type=REFUND AND settled<72h) / SUM(amount WHERE direction=INFLOW)` over 30d | Risk signal |

**Thin-file gate** (mirrors PRD): if `history_length_days < 30` OR total inflow count < 20 → use thin-file path (feature set reduced to `F01` + `F06` only; `revenue_zscore` and `inflow_cv` set to `MISSING` bin).

**Peer medians for hackathon** (hard-coded constants, not a real cohort query):

```typescript
const SECTOR_PEER_MEDIANS: Record<string, number> = {
  food_beverage: 8_500_000,  // VND weekly
  marketplace:   5_200_000,
  services:      4_100_000,
  default:       5_000_000,
}
```

---

### 3.4 WoE Scorecard

**File**: `app/src/lib/creditScoring.ts` (scorecard section)

Mock-calibrated WoE scorecard. Weights are **not statistically trained** — they are manually tuned to produce sensible scores for the 5 demo merchants. This must be disclosed to judges.

#### Score Formula (from PRD, preserved exactly)

```typescript
const FACTOR = 20 / Math.log(2)            // ≈ 28.85
const OFFSET = 700 - FACTOR * Math.log(20) // ≈ 550.35

const logit = BETA_0 + featureContributions.reduce((sum, f) => sum + f.beta * f.woe, 0)
const rawScore = OFFSET + FACTOR * logit
const finalScore = Math.min(850, Math.max(300, rawScore + fraudPenalty))
// Apply resolution cap: TIER_4_PHONE_ONLY → cap at 650
```

#### Bin Definitions and Mock WoE Values

**F01 — `history_length_days`** (`beta = 0.45`)

| Bin | Range | WoE |
|-----|-------|-----|
| `THIN` | < 30 days | -1.20 |
| `SHORT` | 30–59 days | -0.40 |
| `MEDIUM` | 60–89 days | +0.30 |
| `LONG` | 90+ days | +0.80 |
| `MISSING` | null | -1.50 |

**F03 — `revenue_zscore`** (`beta = 0.55`)

| Bin | Z-score range | WoE |
|-----|---------------|-----|
| `VERY_WEAK` | < -1.5 | -1.80 |
| `WEAK` | -1.5 to -0.5 | -0.90 |
| `AVERAGE` | -0.5 to +0.5 | 0.00 |
| `STRONG` | +0.5 to +1.5 | +0.75 |
| `VERY_STRONG` | > +1.5 | +1.40 |
| `MISSING` | null | -1.00 |

**F04 — `inflow_cv`** (`beta = -0.40`) *(lower CV = better; inverted)*

| Bin | CV range | WoE |
|-----|----------|-----|
| `STABLE` | < 0.20 | +1.10 |
| `MODERATE` | 0.20–0.40 | +0.30 |
| `VOLATILE` | 0.40–0.70 | -0.50 |
| `HIGHLY_VOLATILE` | > 0.70 | -1.30 |
| `MISSING` | null | -0.80 |

**F06 — `fast_refund_rate`** (`beta = -0.50`) *(higher rate = worse; inverted)*

| Bin | Rate range | WoE |
|-----|------------|-----|
| `VERY_LOW` | < 1% | +1.20 |
| `LOW` | 1–3% | +0.60 |
| `MODERATE` | 3–7% | -0.30 |
| `HIGH` | 7–12% | -0.90 |
| `VERY_HIGH` | > 12% | -1.60 |
| `MISSING` | null | -0.50 |

**BETA_0 (intercept)**: `1.80` (tuned to center the score distribution near 650 for average merchants)

#### Score Bands (Demo Labels)

| Band Label | Score Range | UI Color | Lending Action Shown |
|------------|-------------|----------|----------------------|
| **Excellent** | 750–850 | `#22c55e` green | Prime limit schedule |
| **Good** | 700–749 | `#84cc16` lime | Standard limit schedule |
| **Fair** | 650–699 | `#eab308` yellow | Reduced limit schedule |
| **Poor** | 600–649 | `#f97316` orange | Micro-credit only |
| **Bad** | 300–599 | `#ef4444` red | Declined / Observation only |

> **Note for judges**: The "Bad < 600" band subsumes the PRD's `DECLINE (300-499)` and `OBSERVE (500-579)` and `STARTER (580-649)` for demo simplicity. Full production bands are in the PRD.

---

### 3.5 Reason Code Router

**File**: `app/src/lib/creditScoring.ts` (reason router section)

Maps each feature's bin+WoE contribution to one of 10 active reason codes. Returns exactly **top-3 positive + top-3 negative** ordered by absolute point contribution.

#### Active Reason Codes (10 of 27)

| Code | Feature | Polarity | VI Template Key | EN Template Key |
|------|---------|----------|-----------------|-----------------|
| `RC01` | history_length | Positive | `rc01_vi` | `rc01_en` |
| `RC02` | history_length | Negative | `rc02_vi` | `rc02_en` |
| `RC07` | revenue_zscore | Positive | `rc07_vi` | `rc07_en` |
| `RC08` | revenue_zscore | Negative | `rc08_vi` | `rc08_en` |
| `RC10` | inflow_cv | Positive | `rc10_vi` | `rc10_en` |
| `RC11` | inflow_cv | Negative | `rc11_vi` | `rc11_en` |
| `RC16` | fast_refund_rate | Positive | `rc16_vi` | `rc16_en` |
| `RC17` | fast_refund_rate | Negative | `rc17_vi` | `rc17_en` |
| `RC04` | entity_confidence | Positive | `rc04_vi` | `rc04_en` |
| `RC05` | entity_confidence | Negative | `rc05_vi` | `rc05_en` |

**Routing logic**:
```typescript
function routeReasonCodes(featureContributions: FeatureContribution[]): ReasonCodeResult {
  // featureContributions = [{ featureId, points: signed float, reasonCode }]
  const positive = featureContributions
    .filter(c => c.points > 0)
    .sort((a, b) => b.points - a.points)
    .slice(0, 3)
  const negative = featureContributions
    .filter(c => c.points < 0)
    .sort((a, b) => a.points - b.points)
    .slice(0, 3)
  // Pad to 3 if needed using next-best same-sign contributor (thin-file case)
  return { positive, negative }
}
```

**Point contribution formula**:
```typescript
const pointContribution_i = FACTOR * beta_i * woeValue_i
```

---

### 3.6 Static Explanation Renderer

**File**: `app/src/lib/creditScoring.ts` (template + renderer section)

No LLM call. Pre-written template strings, parameterized with actual and threshold values.

#### Template Structure

```typescript
const TEMPLATES: Record<string, { label: string; description: string; guidance: string }> = {
  rc08_vi: {
    label: "Doanh thu thấp hơn mức trung bình ngành",
    description: "Doanh thu hàng tuần của bạn thấp hơn {gap_pct}% so với ngưỡng trung bình.",
    guidance: "Tăng doanh thu thêm {target_increase_pct}% trong 30 ngày tới để cải thiện điểm.",
  },
  rc08_en: {
    label: "Revenue below sector average",
    description: "Your weekly revenue is {gap_pct}% below the peer benchmark.",
    guidance: "Increase revenue by {target_increase_pct}% over the next 30 days to improve your score.",
  },
  rc17_vi: {
    label: "Tỷ lệ hoàn tiền nhanh cao",
    description: "Tỷ lệ hoàn tiền trong 72 giờ của bạn là {actual_pct}%, vượt ngưỡng cho phép {threshold_pct}%.",
    guidance: "Giảm hoàn tiền nhanh xuống dưới {threshold_pct}% để tránh bị trừ điểm.",
  },
  rc17_en: {
    label: "High fast-refund rate",
    description: "Your 72-hour refund rate is {actual_pct}%, above the {threshold_pct}% threshold.",
    guidance: "Reduce fast refunds below {threshold_pct}% to avoid score penalty.",
  },
  // ... (all 10 codes × 2 locales = 20 template pairs)
}
```

#### Adverse Action Block

Rendered when `score_band IN ('Bad', 'Poor')`:

```typescript
function renderAdverseAction(factors: NegativeFactor[], locale: 'vi' | 'en'): string {
  // Returns threshold-met/not-met string + improvement list
  // Example VI: "Điểm của bạn (582) thấp hơn ngưỡng cho vay tiêu chuẩn (650)."
  // Example EN: "Your score (582) is below the standard lending threshold (650)."
}
```

#### What-If Panel

Pre-computed for demo: each merchant has 3 hard-coded counterfactual scenarios:

```typescript
const WHATIF_SCENARIOS: Record<string, WhatIfScenario[]> = {
  M001: [
    { change: "revenue +10%", scoreDelta: +8, vi: "Nếu doanh thu tăng 10%, điểm sẽ tăng thêm 8 điểm." },
    // ...
  ],
  // ...
}
```

> **Hackathon shortcut**: What-if is pre-computed, not re-run live. Re-running the scorecard on perturbed inputs is the production approach; pre-computation is fine for demo.

---

### 3.7 In-House Dashboard Integration

The credit scoring feature surfaces inside the **existing SoftPOS React app** via three React components: one new card (`CreditScorePanel`) and two existing modals (`CreditScoreModal`, `LoanApplicationModal`) that are wired to the WoE pipeline output.

#### 3.7.1 CreditScorePanel (new)

**File**: `app/components/CreditScorePanel.jsx`

A new `OverviewCard`-style card added to the `xl:grid-cols-4` overview grid in `Dashboard.jsx` (currently at line 224). It provides a score preview and serves as the entry point to the two modal flows.

**Visual spec**:
- Accent color: `sky` (consistent with `OverviewCard` palette)
- Icon: `ShieldCheck` from lucide-react (already imported in Dashboard)
- Label: `"Tín dụng của tôi"`
- Title: numeric score (e.g. `"720"`) or `"—"` while loading
- Value: score band label (e.g. `"Tốt"`) + limit (e.g. `"Hạn mức: 7,5 triệu VND"`)
- Change text: `"Tăng +12 điểm so với tháng trước"` (from `change` prop)
- CTA button: `"Xem chi tiết"` → opens `CreditScoreModal`
- Secondary link: `"Đăng ký vay"` → opens `LoanApplicationModal`

**Props interface**:
```typescript
interface CreditScorePanelProps {
  score: number            // WoE score 300–850
  band: string             // "Excellent" | "Good" | "Fair" | "Poor" | "Bad"
  limitVnd: number         // pre-filled amount for LoanApplicationModal
  change: number           // monthly delta (signed int, e.g. +12)
  onViewDetail: () => void // opens CreditScoreModal
  onApplyLoan: () => void  // opens LoanApplicationModal
  loading?: boolean
}
```

#### 3.7.2 CreditScoreModal wiring (existing)

**File**: `app/components/CreditScoreModal.jsx` — **no structural changes needed**. Wire props from the API response.

The modal already accepts:
```jsx
<CreditScoreModal
  open={open}
  onClose={onClose}
  score={score}       // WoE score 300–850, passed as-is to Gauge
  maxScore={850}      // fixed
  change={change}     // monthly delta as string e.g. "12"
  breakdown={breakdown}
/>
```

**`breakdown` array** — maps directly from the API `breakdown` field:
```typescript
interface BreakdownItem {
  label: string        // e.g. "Lịch sử giao dịch"
  score: number        // 0–100, normalized for the bar width in CreditScoreModal line 115
  description: string  // rendered explanation string (VI)
}
```

**Breakdown normalization** — the API returns `point_contribution` (signed float, e.g. +22.3 or -31.2). Normalize each feature's contribution to 0–100 for the modal bar:
```typescript
// map contribution range [-50, +50] → [0, 100]
const normalizedScore = Math.round(Math.min(100, Math.max(0, (contribution + 50))))
```

**Positive/Negative factors panel** — the two existing panels in `CreditScoreModal` at lines 90–105 are currently static text. Wire them to the API's `top_positive_factors` and `top_negative_factors`:
- Positive panel (`ShieldCheck`, emerald): render `top_positive_factors[0].label` as headline text
- Negative panel (`AlertTriangle`, rose): render `top_negative_factors[0].label` as headline text
- Full factor lists are shown in the `breakdown` section below the gauge

**Gauge rendering** — `Gauge` uses `score/maxScore` to compute `strokeDashoffset`. With `score=720` and `maxScore=850`, the arc fills `720/850 ≈ 84.7%` of the semicircle. No changes needed to the Gauge component.

#### 3.7.3 LoanApplicationModal wiring (existing)

**File**: `app/components/LoanApplicationModal.jsx` — add `initialAmount` prop only.

**Current**: `useState(95000000)` hard-coded default (line 20).
**Updated**: accept `initialAmount` prop and use it as default:
```jsx
function LoanApplicationModal({ open, onClose, initialAmount = 95000000 }) {
  const [amount, setAmount] = useState(initialAmount)
  // ...
}
```

**Pre-fill logic** — `initialAmount` is derived from the score band's progressive limit table:

| Score Band | Limit (VND) |
|------------|-------------|
| Excellent (750–850) | 120,000,000 |
| Good (700–749) | 75,000,000 |
| Fair (650–699) | 50,000,000 |
| Poor (600–649) | 12,500,000 |
| Bad (300–599) | 0 (loan flow disabled) |

The slider range (5M–120M, step 5M) and 4-step flow remain unchanged. `requestId` generation on submit (`SCC-${random}`) is already implemented at line 56.

#### 3.7.4 Dashboard.jsx integration

Wire the panel and modals into `Dashboard.jsx`:

1. Add `useState` for `creditScoreModalOpen`, `loanModalOpen`
2. Add `useEffect` to fetch `/api/credit-score` on mount with the demo merchant ID
3. Add `CreditScorePanel` as the 5th card in the `xl:grid-cols-4` grid (wraps to a new row or expand to `xl:grid-cols-4` with the panel spanning 1 column)
4. Render `<CreditScoreModal>` and `<LoanApplicationModal>` at the bottom of the component tree alongside the existing modal pattern

**Import additions for Dashboard.jsx**:
```jsx
import CreditScorePanel from './CreditScorePanel'
import CreditScoreModal from './CreditScoreModal'
import LoanApplicationModal from './LoanApplicationModal'
```

---

## 4. Mock Data Specifications

### Variance Matrix

| Merchant | Weekly Inflow (avg VND) | Inflow CV | Fast Refund Rate | Unique Payer Ratio | Max Gap (days) | Fraud Flags |
|----------|------------------------|-----------|------------------|--------------------|----------------|-------------|
| M001 Linh | 11,200,000 | 0.15 | 1.2% | 0.68 | 2 | none |
| M002 Hùng | 6,400,000 | 0.32 | 5.8% | 0.44 | 6 | FR03_WARNING |
| M003 Mai | 4,900,000 | 0.55 | 13.4% | 0.22 | 4 | FR02_SEVERE, FR04_WARNING |
| M004 Bảo | 3,200,000 | 0.28 | 2.1% | 0.51 | 1 | none (thin-file) |
| M005 Tuấn | 9,100,000 | 0.68 | 3.5% | 0.18 | 3 | FR01_SEVERE, FR04_SEVERE |

### Expected Score Outputs (Target for Calibration)

| Merchant | Expected Score | Band | Loan Offer (VND) |
|----------|----------------|------|------------------|
| M001 Linh | ~770 | Excellent | 120,000,000 (prime) |
| M002 Hùng | ~660 | Fair | 50,000,000 (reduced) |
| M003 Mai | ~540 | Bad | 0 (declined) |
| M004 Bảo | ~590 | Bad | 0 (thin-file micro) |
| M005 Tuấn | ~580 (capped 650 by TIER_4) | Bad | 0 (starter only) |

> Calibrate `BETA_0` and bin WoE values iteratively until all 5 merchants hit their target band.

---

## 5. API Contract (Hackathon)

**File**: `app/routes/api/credit-score.ts`

```
POST /api/credit-score          → score + breakdown for given merchantId
GET  /api/credit-score/merchants → list of 5 merchant profiles (for demo selector)
GET  /api/credit-score/whatif/:merchantId → pre-computed counterfactuals
```

#### POST /api/credit-score — Request

```json
{ "merchantId": "M002" }
```

#### POST /api/credit-score — Response Shape (matches PRD output contract, simplified)

```json
{
  "merchant_id": "M002",
  "merchant_name": "Trần Văn Hùng",
  "score": 660,
  "score_band": "Fair",
  "history_length_days": 90,
  "model_path": "full_file",
  "breakdown": [
    {
      "label": "Lịch sử giao dịch",
      "score": 72,
      "description": "Lịch sử 90 ngày đủ điều kiện đánh giá đầy đủ."
    },
    {
      "label": "Doanh thu so với ngành",
      "score": 38,
      "description": "Doanh thu hàng tuần thấp hơn 19% so với mức trung bình phân khúc."
    },
    {
      "label": "Độ ổn định dòng tiền",
      "score": 58,
      "description": "Biến động dòng tiền ở mức trung bình, có thể cải thiện."
    },
    {
      "label": "Tỷ lệ hoàn tiền",
      "score": 45,
      "description": "Tỷ lệ hoàn tiền 5.8% ở mức trung bình, cần theo dõi."
    }
  ],
  "top_positive_factors": [
    { "reason_code": "RC01", "label": "Lịch sử kinh doanh đủ dài", "point_contribution": 22.3 },
    { "reason_code": "RC16", "label": "Tỷ lệ hoàn tiền thấp", "point_contribution": 14.1 },
    { "reason_code": "RC10", "label": "Dòng tiền ổn định", "point_contribution": 9.8 }
  ],
  "top_negative_factors": [
    { "reason_code": "RC08", "label": "Doanh thu thấp hơn ngưỡng", "point_contribution": -31.2 },
    { "reason_code": "RC11", "label": "Biến động dòng tiền cao", "point_contribution": -18.7 },
    { "reason_code": "RC17", "label": "Hoàn tiền nhanh cao", "point_contribution": -12.4 }
  ],
  "fraud_flags": ["FR03_WARNING"],
  "fraud_penalty_points": -15,
  "limit_offer_vnd": 50000000,
  "monthly_change": 12,
  "adverse_action": null
}
```

**Error responses**:
- `404` if `merchantId` not in `["M001","M002","M003","M004","M005"]`
- `400` if request body missing `merchantId`

---

## 6. File Structure (Hackathon)

```
app/
├── components/
│   ├── CreditScorePanel.jsx      # NEW: Dashboard card — score preview + limit + CTAs
│   ├── CreditScoreModal.jsx      # EXISTING: wired to WoE output (breakdown + factors)
│   ├── LoanApplicationModal.jsx  # EXISTING: add initialAmount prop for pre-fill
│   └── Dashboard.jsx             # EXISTING: add CreditScorePanel + modal state
│
├── src/
│   └── lib/
│       ├── creditScoring.ts      # WoE scorecard + feature engine + reason router + templates
│       ├── mockMerchantData.ts   # 5 merchant profiles + 90-day tx history arrays
│       └── canonicalLedger.ts   # DuckDB schema + insert/query helpers
│
├── routes/
│   └── api/
│       └── credit-score.ts      # POST endpoint → scoring pipeline → JSON response
│
└── data/
    └── demo.duckdb               # Generated at startup from mockMerchantData.ts
```

---

## 7. Fraud Rules (Hackathon Subset)

Only 2 of 5 fraud rules implemented for demo. The others are noted as roadmap.

| Rule | Hackathon? | Implementation |
|------|-----------|----------------|
| `FR02` Fast refund rate | ✅ Yes | Directly derived from `fast_refund_rate` feature; severe → -60 pts |
| `FR04` Counterparty circularity | ✅ Yes | Unique payer ratio < 0.20 → warning (-20); circular pairs > 30% → severe (-50) |
| `FR01` Volume velocity | 🗓 Roadmap | — |
| `FR03` Inactive gaps | 🗓 Roadmap | — |
| `FR05` Cross-channel | 🗓 Roadmap | — |

**Aggregate cap preserved**: total fraud penalty never exceeds -150 (enforced in `creditScoring.ts`).

---

## 8. Acceptance Criteria

### Backend / Pipeline

| # | Criterion | Verifiable By |
|---|-----------|--------------|
| AC1 | `canonicalLedger.ts` populates `demo.duckdb` with 5 merchants and ≥ 400 ledger rows on startup | DuckDB query: `SELECT canonical_entity_id, COUNT(*) FROM canonical_ledger GROUP BY 1` |
| AC2 | All 5 merchants produce a score in range [300, 850] | Unit test: `creditScoring.test.ts` |
| AC3 | M001 Linh scores ≥ 750, M003 Mai scores ≤ 600, M005 Tuấn score capped ≤ 650 | Unit test: `creditScoring.test.ts::expectedBands` |
| AC4 | Every POST `/api/credit-score` response contains exactly 3 positive + 3 negative factors and a `breakdown` array of 4 items | API response assertion in test |
| AC5 | Vietnamese description strings in `breakdown` contain correct numeric substitutions | Manual review by Vietnamese speaker on team |

### React UI

| # | Criterion | Verifiable By |
|---|-----------|--------------|
| AC6 | Dashboard displays "Tín dụng của tôi" `CreditScorePanel` card showing a score in 650–780 range for M001/M002 demo merchants | Browser smoke test |
| AC7 | Clicking "Xem chi tiết" on `CreditScorePanel` opens `CreditScoreModal` with gauge arc filled to correct proportion and 4 breakdown bars rendered | Browser smoke test |
| AC8 | `CreditScoreModal` positive factors panel (`ShieldCheck` / emerald) shows M001 Linh's top positive factor label; negative factors panel (`AlertTriangle` / rose) shows M003 Mai's top negative factor label | Browser smoke test, swap merchant via demo selector |
| AC9 | Clicking "Đăng ký vay" opens `LoanApplicationModal` with amount slider pre-set to the score band's limit (e.g. M001 → 120M, M002 → 50M) | Browser smoke test |
| AC10 | All 3 primary demo merchants (Linh/Hùng/Mai) produce distinct score bands when selected in the demo merchant picker | Browser smoke test |
| AC11 | End-to-end demo flow (load Dashboard → view credit card → open CreditScoreModal → open LoanApplicationModal → submit → see requestId confirmation) completes without errors | Rehearsed demo run in browser |

---

## 9. Build Timeline Hint (36 hours)

| Hours | Milestone |
|-------|-----------|
| 0–4 | `canonicalLedger.ts` + DuckDB schema + `mockMerchantData.ts` producing valid ledger rows |
| 4–8 | Feature engine in `creditScoring.ts` + manual validation against expected feature values |
| 8–12 | Scorecard + bin calibration → all 5 merchants hit target bands |
| 12–16 | Reason code router + explanation templates (all 20 VI+EN strings written) |
| 16–20 | `POST /api/credit-score` endpoint wired to pipeline; verify response shape |
| 20–26 | `CreditScorePanel.jsx` built; `CreditScoreModal` and `LoanApplicationModal` wired with real props |
| 26–30 | Dashboard integration: state management, fetch on mount, modal open/close, demo merchant selector |
| 30–34 | End-to-end integration test + bug fixes + AC validation |
| 34–36 | Polish UI, rehearse demo script, write 3-line architecture explanation for judges |

---

## 10. Post-Hackathon Roadmap

> Items below are **OUT OF SCOPE** for the 36-hour build. Do not implement these.

| Item | Why Deferred |
|------|-------------|
| Real API connectors (MoMo, Shopee Pay, Techcombank) | Requires partner integration agreements + OAuth flows |
| Production feature store (Feast + Redis) | Overkill for in-memory demo |
| WoE weight calibration on real labeled data | No labeled loan portfolio exists yet |
| Full 27 reason codes | 10 active codes cover all demo scenarios |
| Production entity resolution (fuzzy name + address hash) | Demo uses pre-assigned entity IDs |
| EBM challenger model | Forbidden in production path per PRD; challenger track only |
| SBV prudence documentation pack | Regulatory artifact, not engineering |
| PDPD consent management UI | Requires legal review of consent language |
| Rolling calibration pipeline (Airflow/Prefect) | No scheduler infrastructure |
| Multi-bank deployment topology | No infrastructure provisioned |
| FR01, FR03, FR05 fraud rules | Demo story works with FR02 + FR04 |
| LLM translation path (two-stage render) | Static templates sufficient; LLM path is post-hackathon hardening |
| Full seasonality normalization (Tết lunar alignment) | No real cohort data; peer medians are hard-coded |
| Language toggle (VI/EN switch) | All demo text is Vietnamese; EN templates are authored but toggle UI is post-hackathon polish |

---

## 11. PRD Traceability

| PRD Goal | Hackathon Coverage | Gap |
|----------|--------------------|-----|
| Normalize multi-source data into 14-field canonical ledger | ✅ Full schema, 3 source types | Production: 9 source types |
| WoE logistic scorecard (no black-box models) | ✅ Formula preserved exactly; bins mock-calibrated | Production: statistically calibrated bins |
| Fixed reason code catalog | ✅ 10 of 27 codes active | Production: all 27 required |
| Adverse action format | ✅ Threshold + actual + guidance rendered | Production: exact legal language review |
| Bilingual explanation rendering | ✅ VI + EN static templates authored | Production: LLM translation with safety boundary |
| Score bands 300–850 | ✅ 5 demo bands map to PRD bands | Demo label names simplified for pitch clarity |
| Thin-file fallback path | ✅ M004 exercises thin-file path | Production: full thin-file feature set (TF01–TF06) |
| Fraud rules (rule-based) | ✅ FR02 + FR04 implemented | Production: all 5 rule families |
| Progressive limit schedule | ✅ Limit pre-fills LoanApplicationModal from band table | Production: step-up triggers not implemented |
| Entity resolution tiers | ✅ Tier hardcoded per merchant; TIER_4 cap enforced | Production: runtime entity resolver |
| Merchant-facing UI | ✅ Integrated into existing SoftPOS Dashboard React app | Production: authenticated merchant portal |
