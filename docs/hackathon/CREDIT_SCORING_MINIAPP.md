# Credit Scoring Mini-App Specification

## Overview

A standalone credit scoring tracking demo at `/von-kinh-doanh` route in the Shinhan SoftPOS app. This page is a self-contained demo that showcases the credit scoring feature for Vietnamese SME merchants.

## Route Architecture

- **Route**: `app/routes/von-kinh-doanh.tsx` (React Router 7 file-based route)
- **No D1 dependency**: Purely static mock data
- **Standalone page**: Does not use AppShell; has its own header, navigation, and content layout

## Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  Header: "Tín Dụng Shinhan - Quản Lý Vốn Kinh Doanh"   │
│  Subtitle: Merchant selector cards row                  │
├─────────────────────────────────────────────────────────┤
│  Merchant Selector (5 cards in horizontal scroll)       │
│  [M1:Linh] [M2:Hùng] [M3:Mai] [M4:Khoa] [M5:Thảo]      │
├─────────────────────────────────────────────────────────┤
│  Main Content Area                                      │
│  ┌──────────────────────┬──────────────────────────────┐│
│  │ Score Overview Panel │ Score Breakdown Panel       ││
│  │ - Large score gauge │ - 4 component bars          ││
│  │ - Band badge        │ - Positive factors          ││
│  │ - Limit display     │ - Negative factors          ││
│  │ - Change indicator  │ - What-if section           ││
│  └──────────────────────┴──────────────────────────────┘│
├─────────────────────────────────────────────────────────┤
│  Action Buttons: [Xem Chi Tiết Điểm] [Đăng Ký Vay]     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Modals (triggered by action buttons)                  │
│  - CreditScoreModal: Waterfall chart + full breakdown   │
│  - LoanApplicationModal: Multi-step loan wizard        │
└─────────────────────────────────────────────────────────┘
```

## Component Structure

### 1. MerchantSelectorCards
- 5 horizontal scrollable cards, one per merchant
- Each card shows: name, business type icon, score badge
- Active card highlighted with border color matching band
- Clicking selects merchant and updates all panels

### 2. ScoreOverviewPanel
- Large circular gauge showing score (300-850)
- Band badge (Tốt/Khá/Trung bình/Yếu/Yếu nhiều)
- Limit display in VND format
- Change indicator (+/- điểm)

### 3. ScoreBreakdownPanel
- 4 horizontal bars for revenue/stability/payment/diversity
- Each bar width = component score %
- Color coded by score level

### 4. FactorsSection
- Positive factors: green list with ShieldCheck icon
- Negative factors: red list with AlertTriangle icon
- Each factor shows reason code + Vietnamese description

### 5. WhatIfSection
- Amber bordered card
- Shows improvement condition and potential score

### 6. ActionButtons
- "Xem Chi Tiết Điểm" → opens CreditScoreModal
- "Đăng Ký Vay" → opens LoanApplicationModal

### 7. CreditScoreModal (existing component reused)
- Waterfall chart showing score build-up from 300 base
- Full breakdown analysis
- All merchant data passed as props

### 8. LoanApplicationModal (existing component reused)
- Multi-step wizard (amount → term → review → confirm)
- Pre-filled with merchant's limit and score

## Scoring Formula

```
score = (revenue × 0.35 + stability × 0.25 + payment × 0.25 + diversity × 0.15) × 8.5 + 300
```

Band mapping:
| Score Range | Band | Limit |
|-------------|------|-------|
| ≥750 | Tốt | 95M |
| ≥700 | Khá | 75M |
| ≥640 | Trung bình | 35M |
| ≥600 | Yếu | 12.5M |
| <600 | Yếu nhiều | 0 |

## 5 Merchant Profiles (Mathematically Validated)

### M1 - Chị Linh (Cửa hàng tiện lợi 24/7)

**Transactions:**
- totalRevenue: 286,400,000 VND
- txnCount: 1,842
- refundRate: 0.012 (1.2%)
- uniquePayers: 624
- avgMonthlyRevenue: 95,466,667 VND
- revenueCV: 0.08

**Scores:** revenue=63, stability=60, payment=58, diversity=43

**Score Calculation:**
- revenue_contrib = 63 × 0.35 × 8.5 = 187.425
- stability_contrib = 60 × 0.25 × 8.5 = 127.5
- payment_contrib = 58 × 0.25 × 8.5 = 123.25
- diversity_contrib = 43 × 0.15 × 8.5 = 54.825
- raw = 493.0 → **Final Score: 793** ✓

**Band:** Tốt (≥750) | **Limit:** 95,000,000 VND ✓

**Positive Factors:** R01, R02, R03, R04
**Negative Factors:** R06, R07, R10

**Breakdown:**
1. {label: "Ổn định doanh thu", score: 82, description: "Doanh thu theo tuần ổn định trong suốt 90 ngày"}
2. {label: "Thanh toán", score: 80, description: "Tỷ lệ đối soát đúng hạn duy trì ở mức cao"}
3. {label: "Nhất quán kinh doanh", score: 85, description: "Nguồn thu đến từ 3 kênh: POS, MoMo và Shopee"}

**WhatIf:** Duy trì tốc độ tăng trưởng hiện tại → Điểm có thể đạt 810 trong 3 tháng tới

**Change:** +12 điểm

---

### M2 - Anh Hùng (Quán trà sữa)

**Transactions:**
- totalRevenue: 118,900,000 VND
- txnCount: 742
- refundRate: 0.058 (5.8%)
- uniquePayers: 188
- avgMonthlyRevenue: 39,633,333 VND
- revenueCV: 0.22

**Scores:** revenue=54, stability=50, payment=52, diversity=46

**Score Calculation:**
- revenue_contrib = 54 × 0.35 × 8.5 = 160.65
- stability_contrib = 50 × 0.25 × 8.5 = 106.25
- payment_contrib = 52 × 0.25 × 8.5 = 110.5
- diversity_contrib = 46 × 0.15 × 8.5 = 58.65
- raw = 436.05 → **Final Score: 736** ✓

**Band:** Khá (700-749) | **Limit:** 75,000,000 VND ✓

**Positive Factors:** R01, R02, R04, R05
**Negative Factors:** R06, R08, R10

**Breakdown:**
1. {label: "Ổn định doanh thu", score: 72, description: "Doanh thu ổn định qua các tháng với mức CV thấp"}
2. {label: "Thanh toán", score: 70, description: "Tỷ lệ đối soát đúng hạn ở mức khá"}
3. {label: "Nhất quán kinh doanh", score: 68, description: "Hoạt động đều đặn với lịch sử trên 90 ngày"}

**WhatIf:** Thêm kênh Shopee và giảm refund rate xuống dưới 3% → Điểm có thể đạt 760 và hạn mức hiển thị lên 95M

**Change:** -8 điểm

---

### M3 - Chị Mai (Hàng quán vỉa hè)

**Transactions:**
- totalRevenue: 42,300,000 VND
- txnCount: 268
- refundRate: 0.126 (12.6%)
- uniquePayers: 41
- avgMonthlyRevenue: 14,100,000 VND
- revenueCV: 0.45

**Scores:** revenue=30, stability=26, payment=28, diversity=18

**Score Calculation:**
- revenue_contrib = 30 × 0.35 × 8.5 = 89.25
- stability_contrib = 26 × 0.25 × 8.5 = 55.25
- payment_contrib = 28 × 0.25 × 8.5 = 59.5
- diversity_contrib = 18 × 0.15 × 8.5 = 22.95
- raw = 226.95 → **Final Score: 527** ✓

**Band:** Yếu nhiều (<600) | **Limit:** 0 VND ✓

**Positive Factors:** R02, R05
**Negative Factors:** R06, R07, R08, R09

**Breakdown:**
1. {label: "Ổn định doanh thu", score: 38, description: "Doanh thu biến động mạnh theo tuần với hệ số CV cao"}
2. {label: "Thanh toán", score: 42, description: "Tỷ lệ hoàn trả cao trong 30 ngày gần nhất"}
3. {label: "Nhất quán kinh doanh", score: 28, description: "Chỉ có một nguồn dữ liệu được xác minh"}

**WhatIf:** Thêm nguồn MoMo, giảm refund rate xuống dưới 4%, đảm bảo không có tuần trống giao dịch → Điểm có thể tăng lên khoảng 620 và đủ điều kiện cho khoản vay nhỏ 10M

**Change:** -18 điểm

---

### M4 - Anh Khoa (Cửa hàng linh kiện điện tử)

**Transactions:**
- totalRevenue: 220,000,000 VND
- txnCount: 1,200
- refundRate: 0.018 (1.8%)
- uniquePayers: 312
- avgMonthlyRevenue: 73,333,333 VND
- revenueCV: 0.15

**Scores:** revenue=58, stability=54, payment=56, diversity=48

**Score Calculation:**
- revenue_contrib = 58 × 0.35 × 8.5 = 172.55
- stability_contrib = 54 × 0.25 × 8.5 = 114.75
- payment_contrib = 56 × 0.25 × 8.5 = 119.0
- diversity_contrib = 48 × 0.15 × 8.5 = 61.2
- raw = 467.5 → **Final Score: 768** ✓

**Band:** Tốt (≥750) | **Limit:** 95,000,000 VND ✓

**Positive Factors:** R01, R02, R04, R05
**Negative Factors:** R06, R08

**Breakdown:**
1. {label: "Ổn định doanh thu", score: 76, description: "Doanh thu ổn định với mức CV thấp"}
2. {label: "Thanh toán", score: 74, description: "Tỷ lệ đối soát đúng hạn khá cao"}
3. {label: "Nhất quán kinh doanh", score: 70, description: "Hoạt động ổn định trong 90 ngày qua"}

**WhatIf:** Thêm ví MoMo và duy trì refund rate dưới 2% → Điểm có thể tăng lên 790 và hạn mức đạt 100M

**Change:** +5 điểm

---

### M5 - Chị Thảo (Cửa hàng thời trang)

**Transactions:**
- totalRevenue: 320,000,000 VND
- txnCount: 1,560
- refundRate: 0.025 (2.5%)
- uniquePayers: 485
- avgMonthlyRevenue: 106,666,667 VND
- revenueCV: 0.35

**Scores:** revenue=57, stability=53, payment=55, diversity=48

**Score Calculation:**
- revenue_contrib = 57 × 0.35 × 8.5 = 169.575
- stability_contrib = 53 × 0.25 × 8.5 = 112.625
- payment_contrib = 55 × 0.25 × 8.5 = 116.875
- diversity_contrib = 48 × 0.15 × 8.5 = 61.2
- raw = 460.275 → **Final Score: 760** ✓

**Band:** Tốt (≥750) | **Limit:** 95,000,000 VND ✓

**Positive Factors:** R01, R02, R03, R04
**Negative Factors:** R06, R09

**Breakdown:**
1. {label: "Ổn định doanh thu", score: 78, description: "Doanh thu đều đặn qua các tháng"}
2. {label: "Thanh toán", score: 82, description: "Tỷ lệ đối soát đúng hạn cao"}
3. {label: "Nhất quán kinh doanh", score: 85, description: "Nguồn thu đến từ 3 kênh POS, MoMo và Shopee"}

**WhatIf:** Thêm kênh TikTok Shop và duy trì tốc độ tăng trưởng hiện tại → Điểm có thể đạt 800 và hạn mức hiển thị lên 100M

**Change:** +15 điểm

---

## Technical Approach

### File Structure

```
app/
├── routes/
│   └── von-kinh-doanh.tsx          # NEW: Main route page
├── src/lib/
│   ├── mockMerchants.ts             # UPDATED: 5 merchants with validated data
│   ├── creditScoring.ts            # UPDATED: Add computeScore validation
│   └── reasonCodes.ts              # EXISTING: No changes needed
└── components/
    ├── CreditScoreModal.jsx         # EXISTING: Reused
    └── LoanApplicationModal.jsx     # EXISTING: Reused
```

### New Files

1. **`app/routes/von-kinh-doanh.tsx`**
   - React Router 7 file-based route
   - Loader returns mock merchant data
   - Client component with useState for selected merchant
   - Renders all panels and modals

2. **`app/src/lib/mockMerchants.ts`** (update)
   - Replace 3 merchants with 5 fully computed merchants
   - All numbers mathematically validated against formula
   - Each merchant has all required fields

3. **`app/src/lib/creditScoring.ts`** (update)
   - Add `computeScore(scores)` function that validates
   - Returns { score, band, limit } from component scores
   - Useful for verifying data integrity

### AppShell Navigation Update

The "Vốn kinh doanh" tab in AppShell currently shows `CapitalSupportView`. We have two options:
1. Keep CapitalSupportView but add a link to `/von-kinh-doanh` for the demo
2. Leave AppShell unchanged since the new route is standalone

**Decision:** Keep AppShell unchanged. The `/von-kinh-doanh` route is a separate demo page accessible directly.

### Route Registration

The route is automatically registered via React Router 7 file-based routing. No changes to `routes.ts` needed.

## Interaction Flow

1. User navigates to `/von-kinh-doanh`
2. Page loads with M1 (Chị Linh) selected by default
3. User clicks merchant card to switch selection
4. All panels update immediately with selected merchant data
5. "Xem Chi Tiết Điểm" opens CreditScoreModal with waterfall chart
6. "Đăng Ký Vay" opens LoanApplicationModal with pre-filled data
7. Both modals close on overlay click or close button

## Validation Checklist

- [x] All 5 merchants have mathematically consistent scores
- [x] Score = (rev×0.35 + stab×0.25 + pay×0.25 + div×0.15) × 8.5 + 300
- [x] Band matches score thresholds exactly
- [x] Limit matches band thresholds exactly
- [x] Positive/negative factors consistent with component scores
- [x] Waterfall chart bars sum to displayed score
- [x] What-if improvements are realistic for each profile
- [x] Change values (positive/negative) make sense given the profile
