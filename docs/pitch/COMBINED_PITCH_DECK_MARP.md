---
marp: true
paginate: true
theme: default
style: strong { color: #d93025; }
footer: Shinhan Future's Lab Hackathon
---

<!-- _class: lead -->
# Loyalty + Credit
## One Scan, Full Ecosystem

Shinhan Future's Lab Hackathon

---

# The Problem
## Two Sides, One Broken System

### For Customers
- Loyalty programs are boring: points, stamps, generic discounts
- "Personalized" offers are just segmentation, not real personalization
- I get the same offer whether I'm buying groceries or electronics

### For Merchants
- SME credit is broken: banks want 6 months of statements
- Digital sellers have no formal credit history
- They're invisible to banks even though their sales data tells a story

---

# The Insight
## First Principles Question

**Question:** What does a customer's scan generate?

**Answer:** Data about what they buy, where, when, how often

**Question:** What could we do with that data?

**Answer:** Personalize offers. But also...

**Question:** Who else benefits from that transaction?

**Answer:** The merchant. And their sales history is credit signal.

---

# The Solution
## Shinhan Connect

### For Customers
- **Scan QR → Get real-time personalized offer**
- Offer based on: purchase history, location, merchant, time of day
- Rewards that actually make sense for you

### For Merchants
- **Join via SOL → Get sales dashboard**
- Qualify for MicroBiz loans based on actual sales data
- Grow your business with data-driven credit

---

<!-- _class: lead -->
# The Demo
## The Hook Flow

1. Customer opens SOL app
2. Scans QR at partner merchant
3. System generates personalized offer (Qwen writes the copy)
4. Customer Redeems offer
5. Merchant sees sale + customer insights
6. Merchant's sales score updates
7. Merchant becomes eligible for MicroBiz loan offer

---

# How It Works
## Technical Flow

### Customer Side
1. Customer scans QR at merchant location
2. System checks: customer profile, merchant category, time, location, recent purchases
3. Qwen generates personalized offer copy in Vietnamese
4. Offer appears instantly on customer's SOL app
5. Customer redeems at merchant

### Merchant Side
6. Sale recorded in Shinhan system
7. Merchant dashboard updates with:
   - Daily/weekly/monthly sales
   - Customer demographics
   - Growth trends
   - Credit score based on sales data

### Credit Flow
8. Sales data feeds into MicroBiz credit model
9. Merchant qualifies for loan based on verified sales
10. Loan enables merchant to stock more inventory
11. More inventory → more sales → more data → better credit

---

<!-- _class: lead -->
# The Flywheel

```
Customer Scan → Personalized Offer → Purchase
                    ↓
            Merchant Sale Recorded
                    ↓
            Sales Dashboard Updated
                    ↓
            Credit Score Generated
                    ↓
            MicroBiz Loan Offered
                    ↓
            Merchant Grows Inventory
                    ↓
            More Products → More Sales
                    ↓
            Back to top (cycle repeats)
```

---

# The Hacker Advantage
## Why Us, Why Now

### What we built
- Not just an offer engine. A data flywheel.
- Not just a loan product. A merchant growth platform.

### What makes us different
- We connect the SCAN to the CREDIT (nobody else is doing this)
- Qwen generates the offer copy dynamically (not static templates)
- Local merchant heuristics (Vietnam-specific: Tết patterns, market hours, regional preferences)

### Why now
- QR payments are ubiquitous in Vietnam
- Digital sellers are growing fast (Shopee, Lazada, TikTok)
- Banks want SME deposits and loan volume

---

<!-- _class: lead -->
# Qwen's Role

### Where Qwen adds value
- Generate personalized offer copy in Vietnamese
- Understand merchant category and product context
- Predict customer response probability
- All in under 100ms at scan time

### Where human cleverness adds more value
- Merchant health heuristics (refund rate, cancellation rate, response time)
- Seasonal patterns (Tết, back-to-school, Ramadan)
- Regional preferences (HCMC vs Hanoi vs Central)

---

# Business Model
## Revenue Streams

### For Shinhan

**Customer Side:**
- Increased SOL engagement (DAU/MAU)
- Cross-sell opportunities (cards, insurance)
- Transaction fee income

**Merchant Side:**
- Merchant acquisition (deposits, current accounts)
- Loan origination fee
- Interest income on MicroBiz loans

### Unit Economics (illustrative)
- Customer acquisition: Near-zero (organic scan)
- Merchant acquisition: Low cost (in-app activation)
- Loan default: Lower (sales-verified cash flow)

---

# Competitive Position

| | Traditional Loyalty | E-wallets | Shinhan Connect |
|--|-------------------|-----------|----------------|
| Personalization | Generic segmentation | Transaction only | Full context |
| Merchant view | None | Limited | Sales dashboard |
| Credit access | None | None | Sales-based loans |
| Customer engagement | Passive | Transactional | Transaction + rewards |
| Data asset | None | Siloed | Connected |

---

# Pilot Plan

## Phase 1 (Month 1-2)
- Deploy loyalty engine with 10 partner merchants
- Measure: scan rate, offer redemption rate, customer feedback

## Phase 2 (Month 3-4)
- Add merchant dashboard
- Activate MicroBiz loan for top-performing merchants
- Measure: merchant engagement, loan applications, default rates

## Phase 3 (Month 5-6)
- Expand to 100 merchants
- Full credit model based on real data
- Measure: GMV through platform, loan book growth

---

<!-- _class: lead -->
# The Ask

### What we need
- Access to SOL app QR infrastructure
- 10 pilot merchant partners
- Data access (anonymized transaction data)

### What you get
- Working loyalty engine with personalized offers
- Merchant data platform
- Path to MicroBiz loan product
- Full customer-merchant data flywheel

---

<!-- _class: lead -->
# Close

Every scan is a data point.
Every data point is a credit signal.
Every credit signal is a growing merchant.
Every growing merchant is more business for Shinhan.

### One scan. Full ecosystem.

Shinhan Future's Lab Hackathon
