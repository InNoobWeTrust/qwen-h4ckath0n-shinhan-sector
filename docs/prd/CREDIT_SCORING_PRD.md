# PRD: Cross-Platform Alternative Credit Scoring for Vietnamese SMEs

> **Status**: draft
> **Owner**: Product
> **Audience**: Hackathon judges, partner banks, potential investors
> **Created**: 2026-04-17

---

## 1. Product Vision & Problem Statement

### The Gap No One Has Closed

Vietnam has **~5.1 million SMEs and household merchants** — 98% of all businesses. Yet only **40.5% have access to formal credit**. The other 59.5% are pushed to informal lenders at predatory rates.

**Why do banks say no?** Not because these merchants aren't viable — many run thriving street stalls, Shopee stores, or grab-and-go restaurants. Banks say no because they have no data they trust.

Traditional scoring requires 6+ months of bank statement history. Most SMEs are **thin-file**: they transact across Shopee, MoMo, POS terminals, and cash — none of it in a single place a bank can read.

### The Data Exists. It's Just Scattered.

| Data that exists | Who has it | What banks see today |
|---|---|---|
| Daily POS sales | MISA, KiotViet | Nothing |
| Marketplace orders | Shopee, Lazada, TikTok Shop | Nothing |
| E-wallet payouts | MoMo, ZaloPay, VNPay | Nothing |
| Accounting ledgers | MISA SME, Fast, 1C | Nothing |

**The problem is not the merchant. The problem is fragmentation.**

### Our Solution

A **cross-platform alternative credit scoring engine** that:
1. Ingests transaction data from multiple sources
2. Normalizes everything into one canonical ledger
3. Produces an explainable, auditable credit score
4. Delivers the score — and the *reasons* — in plain Vietnamese

Banks get a decision they can defend to regulators. Merchants get a fair shot and a roadmap to improve.

---

## 2. Hackathon Demo Goal

**Show this in under 3 minutes:**

> *Three merchants. Three different risk profiles. One engine. Results any bank officer and any regulator can understand.*

### The Demo Flow

```
Mock Data Generator
        ↓
  Multi-Source Ledger (POS + MoMo + Shopee + Accounting)
        ↓
  Canonical Normalization Engine
        ↓
  WoE Scorecard → Credit Score (300–850)
        ↓
  Explanation Renderer → 3 positive + 3 negative factors
        ↓
  Dashboard: Score · Band · Limit Offer · Vietnamese Explanation
```

### Three Merchant Profiles

| Profile | Score | Band | Story |
|---|---|---|---|
| **Linh** — Phở restaurant, 90 days POS + MoMo | 712 | STANDARD | Stable revenue, diverse customers, minor refund flag |
| **Hùng** — Shopee reseller, thin-file, 20 days | 601 | STARTER | Early-stage, low history, micro-credit offer |
| **Mai** — Street vendor, self-reported only | 481 | DECLINE | No verified sources, adverse action with improvement path |

Each profile shows:
- **What helped** the score (top 3 positive factors)
- **What hurt** the score (top 3 negative factors)
- **What to do next** (improvement guidance in Vietnamese and English)
- For declined cases: **Adverse Action notice** — exactly what regulators require

---

## 3. Target Users

### Primary: Vietnamese SME & Household Merchants
- Street vendors, restaurant owners, online sellers, micro-retailers
- Currently unscored or rejected by banks
- Need: credit access with a fair, explainable process

### Secondary: Partner Banks
- **Techcombank, MB, BIDV** — active in SME digital lending
- **MISA ecosystem partners** — already have the merchant data
- Need: defensible underwriting decisions, regulatory-compliant explainability, low operational overhead

### Tertiary: Regulators (State Bank of Vietnam)
- Need: auditability, deterministic decision paths, PDPD-compliant data handling
- Our architecture uses only **WoE logistic scorecards** (no black-box AI) — a deliberate choice for regulatory acceptance

---

## 4. Competitive Positioning

| Competitor | Approach | Gap |
|---|---|---|
| **MISA Lending** | Scores merchants inside MISA's own software | Only works if merchant uses MISA. One ecosystem = partial picture. |
| **Shopee SEasy** | Buy-now-pay-later for Shopee sellers | Only works on Shopee. Offline sales invisible. |
| **Validus** | Supply-chain financing for larger SMEs | B2B invoice focus. Excludes consumer-facing micro-merchants. |
| **CIC / Traditional banks** | Bank statement history required | Requires 6+ months banking relationship. Excludes thin-file entirely. |

### Our Edge: Cross-Platform Normalization

We are the **only player** combining:
- POS data (offline sales) +
- Marketplace data (online sales) +
- E-wallet payouts (cash-equivalent settlements) +
- Accounting data (business-level view)

...into **one normalized ledger**, scored with a single auditable model.

This is not a feature — it is the product. Every competitor owns one channel. We connect them all.

---

## 5. Product Roadmap

### Phase 1 — Hackathon Demo *(Now)*
- Mock data generator: 3 realistic merchant profiles
- Canonical ledger normalization (schema shown visually)
- Simplified WoE scorecard with 9 full-file features
- Fixed 27 reason codes, static Vietnamese copy
- One-page dashboard: profile → score → factors → improvement tips
- Adverse action output for declined profiles

### Phase 2 — Post-Hackathon MVP *(3–6 months)*
- Live connectors: MoMo API, Shopee Partner API, MISA open data
- Production WoE scorecard with validated bin boundaries
- Entity resolution service (Business ID → Bank account → Phone+Name)
- Progressive credit limit schedule (entrance → step-up → mature)
- Consent registry (PDPD-compliant)
- Partner bank pilot: 1 bank, 100 merchants, shadow scoring

### Phase 3 — Production *(6–18 months)*
- Multi-bank deployment API
- Real-time transaction streaming pipeline
- EBM challenger model (research path only, not production decision)
- Full SBV compliance documentation pack
- Automated regulatory reporting

---

## 6. Hackathon Scope

### ✅ In Scope

| Component | What it does |
|---|---|
| **Mock Data Generator** | Produces realistic transaction histories for 3 merchant personas across 2–3 simulated data sources |
| **Canonical Ledger** | Normalizes all inputs into a single 14-field schema with confidence-weighted source scoring |
| **Scoring Engine** | WoE logistic scorecard — simplified but architecturally correct; produces scores on the 300–850 scale |
| **Reason Code Engine** | Selects from fixed 27-code catalog; outputs top 3 positive + top 3 negative factors per score |
| **Explanation Renderer** | Translates reason codes into Vietnamese and English using static approved copy |
| **Demo Dashboard** | Shows: merchant profile → score band → top factors → credit limit offer → improvement guidance |

### ❌ Out of Scope

- Real bank / e-wallet API integrations
- Production entity resolution with duplicate detection
- Real-time streaming data pipeline
- EBM challenger model
- Full SBV compliance documentation pack
- PDPD consent management system
- Cross-border data transfer design

---

## 7. Key Risks & Mitigations

### Risk 1: "This is just a mock"
**Mitigation:** The architecture is real. The canonical ledger schema, WoE scorecard formula, 27 reason codes, and adverse action format are all production-spec. A developer can build connectors on top of this foundation without redesigning anything. The demo is a working prototype of a real architecture — not a slide deck.

### Risk 2: "Banks already do alternative scoring"
**Mitigation:** They don't do cross-platform. MISA scores inside MISA. Shopee scores inside Shopee. No one normalizes POS + marketplace + e-wallet + accounting into one model. That is the specific gap we fill — and the gap that matters for the 59.5% of SMEs currently locked out.

### Risk 3: "Regulators won't accept it"
**Mitigation:** We made a deliberate architectural choice: **WoE logistic scorecard only** in the production decision path. No black-box AI, no neural nets, no LLM-generated decisions. Every score is fully reproducible from its audit log. Fixed reason codes mean every explanation is pre-approved copy — not generated text. This is the same explainability standard traditional banks use.

### Risk 4: "What about fraud / gaming the score?"
**Mitigation:** Fraud detection is **rule-based and separate** from the scorecard — 5 rule families covering volume velocity, refund timing, inactivity gaps, counterparty circularity, and cross-channel inconsistency. Each rule has fixed thresholds and deterministic penalties. Penalties cap at -150 points. All measurements are logged and auditable.

---

## 8. Success Metrics (Hackathon Demo)

| Metric | Target |
|---|---|
| End-to-end demo runtime | < 3 minutes |
| Merchant profiles shown | 3 (approved / borderline / declined) |
| Explanation language | Vietnamese + English, side-by-side |
| Score explainability depth | Top 3 positive + top 3 negative factors visible, with point contributions |
| Adverse action shown | Yes — for declined profile, with exact improvement steps |
| Competitive differentiation visible | Yes — cross-platform data sources shown in the ledger view |
| Regulatory design visible | Yes — WoE scorecard, fixed reason codes, audit trail concept shown |

---

## 9. Why This Wins

Vietnam's SME credit gap is not a data problem. The data exists. It is a **normalization problem** — and a **trust problem** between scattered data and cautious banks.

We solve both:
- **Normalization**: one canonical ledger, one score, regardless of which platforms the merchant uses
- **Trust**: WoE scorecard, fixed reason codes, deterministic audit trail — the kind of paper trail regulators and bank credit committees can sign off on

The market is large, the gap is documented, the architecture is defensible, and the demo is real.

**The question for judges is not whether this problem exists — it's whether this team has the right architecture to solve it. We believe we do.**
