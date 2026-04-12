---

# Hackathon Strategy Analysis: Shinhan Finance Track

## 1. USE CASE SUMMARIES

### Shinhan Bank (10 Use Cases)

| ID | Title | One-Line Summary |
|----|-------|------------------|
| SB1 | AI Personal Financial Coach | AI assistant in SOL app for spending analysis, savings recommendations, and product cross-sell |
| SB2 | AI-Powered Customer Engagement Automation | Real-time behavior-triggered personalized comms across push/SMS/email |
| SB3 | AI-Powered Loyalty & Personalized Offers | Smart loyalty system with dynamic QR and location-based merchant offers |
| SB4 | AI Call Bot for Collections & Sales | Voice bot for debt reminders and outbound sales calls |
| SB5 | AI for Internal Reporting & BI Automation | Conversational AI querying of business data instead of manual MIS reports |
| SB6 | Embedded Installment & BNPL | Lending integrated into e-commerce checkout with instant AI approval |
| SB7 | SoftPOS for SOHO & Micro Businesses | Turn smartphones into POS terminals via NFC |
| SB8 | AI Voice Biometrics for Fraud Prevention | Real-time voice verification during loan underwriting and hotline calls |
| SB9 | AI-Driven SME Credit Scoring via POS Data | Credit scoring using real-time merchant POS transaction data |
| SB10 | AI-Powered Branch Traffic Prediction | AI prediction of branch wait times and staffing optimization |

### Shinhan Finance (12 Use Cases)

Focus areas: Document processing automation (IDP), fraud detection, eKYC enhancement, AI-based CRM, Open Banking credit scoring, BNPL partnerships, cybersecurity, customer behavior prediction, voice-to-text, earned wage access, micro-loans for digital economy sellers.

### Shinhan Securities (6 Use Cases)

Focus areas: AI POC/vibe coding, gamified investment experience, content generation, accounting automation, RegTech/AML, digital assets/tokenized securities.

### Shinhan Life (4 Use Cases)

Focus areas: BI platform, voice AI verification for UL product compliance, claims fraud detection, digital health ecosystem.

---

## 2. PAIN POINT SYNTHESIS

### Core Pain Points (Root Causes)

| Pain Point | Manifestation | Frequency |
|------------|---------------|-----------|
| **Manual, slow processes** | Report generation takes days; MIS dependency; manual document processing | 8+ use cases |
| **Limited customer data utilization** | Can't personalize; poor cross-sell; reactive not proactive | 6+ use cases |
| **High operational costs** | Call centers, collection teams, manual underwriting | 5+ use cases |
| **Fraud/identity risk** | Impersonation, forged docs, deepfakes | 4+ use cases |
| **SME exclusion** | Can't serve thin-file customers; manual credit assessment | 3+ use cases |
| **Digital channel underutilization** | Low DAU/MAU; low activation; branch dependency | 3+ use cases |
| **Compliance burden** | Manual AML/KYC; script verification; regulatory monitoring | 3+ use cases |

### Pain Points Grouped by Theme

**1. Customer Engagement & Retention**
- Low app engagement (DAU/MAU)
- High customer churn
- Poor cross-sell conversion
- No personalized offers/recommendations

**2. Operational Efficiency**
- Manual MIS reports taking days
- Call center costs high
- Document processing bottleneck
- Staff allocation suboptimal

**3. Risk & Fraud**
- Identity impersonation
- Forged/altered documents
- Deepfake in video calls
- Claims fraud

**4. Financial Inclusion**
- SME can't get credit (no financials)
- Thin-file customers excluded
- Micro-businesses unbankable

**5. Data & AI Capability Gap**
- Siloed data
- Limited BI access
- No real-time analytics
- Power BI only for ICT team

---

## 3. FIRST-PRINCIPLES ANALYSIS: Why Does Shinhan Need Hackathon Solutions?

### Why Hackathon Instead of Traditional Vendor/Development?

| Hypothesis | Evidence | Implication |
|------------|----------|--------------|
| **Speed > Perfection** | "No available solution" appears 8 times | They need working prototypes NOW, not enterprise procurement cycles |
| **Innovation theater** | Many use cases are "Strategy Division" sourced | They want to demonstrate digital transformation momentum internally/externally |
| **Talent acquisition** | Korean bank in Vietnam | May be struggling to hire AI/ML talent locally |
| **Cultural signaling** | Hackathon with Qwen/Alibaba Cloud | Strategic partnership signaling; want solutions that can leverage their tech stack |
| **Risk experimentation** | Some are PoC stage, some "scouting" | Want to test ideas cheaply before committing budget |

### What Are They REALLY Looking for in Hackers?

| Need | Evidence | What It Means |
|------|----------|---------------|
| **Working demos, not POCs** | "Show a working demo, not just a concept" | Build something that actually works end-to-end |
| **Clear problem-solution fit** | "solve one specific problem clearly" | Don't over-engineer; pick ONE use case and nail it |
| **Vietnam market understanding** | Local context (Tasco, Elfie for other tracks) | Should understand Vietnamese consumer behavior |
| **Qwen/Alibaba Cloud proficiency** | Encouraged to build with Qwen | Should integrate or leverage their AI models |
| **Scalability potential** | Risk, compliance, fraud detection needs | Think beyond hackathon - judges want investable ideas |
| **Data-ready thinking** | Many mention "no data infrastructure" | Show you understand data pipeline challenges |

---

## 4. STRATEGIC RECOMMENDATION: Winning Direction

### Sweet Spot Analysis

```
                    IMPACT
                      ↑
                      │
    ┌─────────────────┼─────────────────┐
    │   QUADRANT 2    │   QUADRANT 1    │
    │   (High Impact, │  (High Impact,  │
    │    Low Effort)  │   High Effort)  │
    │                 │                 │
    │  * BNPL/        │  * AI Personal  │
    │    Embedded     │    Financial    │
    │    Lending      │    Coach        │
    │  * Loyalty/QR   │  * SME Credit   │
    │  * SoftPOS      │    Scoring      │
    │                 │  * Voice        │
    │                 │    Biometrics   │
    │                 │                 │
+LOW ├─────────────────┼─────────────────┤ HIGH
    │   QUADRANT 3    │   QUADRANT 4    │
    │   (Low Impact,  │  (Low Impact,   │
    │    Low Effort)  │   High Effort)  │
    │                 │                 │
    │  * Branch Queue │  * Internal     │
    │    Prediction   │    Reporting    │
    │  * Content Gen  │    BI           │
    │                 │  * eKYC Deepfake│
    │                 │    Detection    │
    └─────────────────┴─────────────────┘
                      │
                     EFFORT
```

### TOP 3 RECOMMENDATIONS TO WIN

#### 🥇 **#1: SB6 - Embedded Installment & BNPL for E-commerce**
**Why:**
- Clear business model (fee-based revenue, interest income)
- No existing solution
- High impact (loan origination volume, merchant acquisition, checkout conversion)
- Vietnamese e-commerce is HUGE (Shopee, Lazada, TikTok Shop dominate)
- Can leverage Qwen for instant credit decisioning
- Real demo potential: integrate with a mock checkout flow

**Win Strategy:**
- Build a working BNPL checkout demo with Qwen-powered instant approval
- Show how it works from merchant side + customer side
- Highlight: reduce approval time from days to seconds

#### 🥈 **#2: SB9 - AI-Driven SME Credit Scoring via POS Data**
**Why:**
- Massive underserved market (SME credit gap in Vietnam is huge)
- Real-time data > static financial statements
- Aligns with Shinhan's expansion goals
- Technical showcase of AI + data integration

**Win Strategy:**
- Mock POS transaction data → credit score demo
- Show alternative credit scoring algorithm
- Highlight: pre-approved limits without traditional financials

#### 🥉 **#3: SB4 - AI Call Bot for Collections & Sales**
**Why:**
- Clear ROI (reduce operational cost, improve recovery rate)
- Conversational AI is perfect for hackathon demo
- Vietnamese language support = differentiator

**Win Strategy:**
- Build a voice bot demo with Vietnamese language support
- Show conversation flow for debt reminder
- Highlight: cost reduction + compliance

---

## 5. COMPANY CONTEXT & INSIGHTS

### About Shinhan Bank Vietnam
- **Founded**: 1994 (first Korean bank in Vietnam)
- **Status**: 100% foreign-owned (merged with Shinhan Vina in 2011)
- **Credit Rating**: BBB stable (S&P, 2020)
- **Key strength**: Part of Shinhan Financial Group (major Korean financial group)
- **Digital focus**: SOL app for retail customers
- **Market position**: Acquisition of ANZ Vietnam retail (2017) gave them customer base boost

### Strategic Priorities (From Use Cases)
1. **Digital-first**: Everything centers on SOL app engagement
2. **SME expansion**: Multiple use cases target SOHO/micro-business segment
3. **Ecosystem play**: Loyalty, merchant network, BNPL = ecosystem lock-in
4. **Operational efficiency**: Automate manual processes, reduce cost
5. **Risk modernization**: AI for fraud, compliance, credit assessment

### Watch Out For
- **Korean corporate culture**: May prefer formal presentations, structured deliverables
- **Regulatory sensitivity**: Vietnam banking regulations are strict (BNPL, credit scoring have compliance needs)
- **Data privacy**: Customer data handling must be emphasized
- **Vietnamese language**: native Vietnamese speakers preferred; Korean relationship adds complexity

---

## 6. EXECUTION CHECKLIST

### Before You Build
- [ ] Choose 1-2 use cases MAX (don't spread thin)
- [ ] Decide: BNPL or SME Credit or Voice Bot (or combine SB6+SB9)
- [ ] Get Qwen API access ready
- [ ] Prepare mock data for demo

### Demo Requirements
- [ ] Working end-to-end prototype (not slides)
- [ ] Clear problem-solution story
- [ ] Vietnamese language support where relevant
- [ ] Show real-time interaction
- [ ] Explain business impact with numbers

### Winning Pitch Structure
1. **Problem** (30 sec): One painful customer/business problem
2. **Solution** (1 min): What you built + how it works
3. **Demo** (2-3 min): Live working demo
4. **Business Case** (1 min): Impact, ROI, scalability
5. **Ask** (30 sec): What you need to take it further

---

## APPENDIX A: SB6 vs SB9 Deep Dive

### Scoring Framework

| Metric | Weight | Description |
|--------|--------|-------------|
| **Revenue Potential** | 25% | Annual income generation capability |
| **Speed to Revenue** | 15% | Time from development to first dollar |
| **Competitive Moat** | 20% | Defensibility against competitors |
| **Scalability Ceiling** | 15% | Max market size potential |
| **Implementation Cost** | 15% | CapEx + OpEx required |
| **Risk Profile** | 10% | Default rates, regulatory, market |

---

## SB6: Embedded Installment & BNPL for E-commerce

### Revenue Model Breakdown

```
REVENUE STREAMS:
├── Merchant Fee: 1.5-3% per transaction
├── Interest Income: 10-18% APR on installments
├── Late Payment Fees: Fixed penalties
├── Cross-sell Upsell: Card, insurance, loans
└── Data Monetization: Consumer spending insights

COST STRUCTURE:
├── Technology: Checkout SDK, instant decisioning API
├── Risk: Fraud detection, credit loss reserves
├── Partnerships: E-commerce platform integration
├── Compliance: Central bank BNPL regulations
└── Operations: Customer support, dispute resolution
```

### Vietnam E-commerce Market Sizing

| Metric | Value |
|--------|-------|
| Vietnam e-commerce GMV (2025) | ~$25-30B USD |
| BNPL market penetration | <5% currently |
| Annual growth rate | 20-25% |

### Financial Projection

```
SCENARIO: Conservative 3-year ramp

Year 1:
├── GMV Through BNPL: $50M (0.2% capture)
├── Merchant Fees (2%): $1M
├── Interest Income: $0.5M
└── TOTAL REVENUE: $1.5M

Year 2:
├── GMV Through BNPL: $200M (0.8% capture)
├── Merchant Fees (2%): $4M
├── Interest Income: $3M
└── TOTAL REVENUE: $7M

Year 3:
├── GMV Through BNPL: $500M (2% capture)
├── Merchant Fees (2%): $10M
├── Interest Income: $12M
└── TOTAL REVENUE: $22M

5-YEAR NPV (10% discount): ~$45-60M
```

---

## SB9: AI-Driven SME Credit Scoring via POS Data

### Revenue Model Breakdown

```
REVENUE STREAMS:
├── Interest Income: 10-15% on SME loans
├── Origination Fees: 1-2% of loan amount
├── Cross-sell: Business accounts, payroll, insurance
├── Data Services: Market insights (secondary)
└── Ecosystem Lock-in: POS + Loans + Banking

COST STRUCTURE:
├── POS Integration: Partner with existing POS providers
├── AI/ML Development: Credit scoring model
├── Data Infrastructure: Real-time transaction pipeline
├── Risk: Higher default rates on thin-file borrowers
└── Sales Force: SME relationship management
```

### Vietnam SME Credit Gap Sizing

| Metric | Value |
|--------|-------|
| SME GDP contribution | ~40% |
| SME employment | ~50% of workforce |
| Estimated credit gap | $10-15B USD |
| Formal credit access | <30% of SMEs |

### Financial Projection

```
SCENARIO: Conservative 3-year ramp

Year 1:
├── New SME Loans Disbursed: $20M
├── Average Interest Rate: 12%
├── Interest Income: $2.4M
├── Origination Fees: $0.3M
└── TOTAL REVENUE: $2.7M

Year 2:
├── New SME Loans Disbursed: $80M
├── Interest Income: $9.6M
├── Origination Fees: $1.2M
└── TOTAL REVENUE: $10.8M

Year 3:
├── New SME Loans Disbursed: $200M
├── Interest Income: $24M
├── Origination Fees: $3M
└── TOTAL REVENUE: $27M

5-YEAR NPV (10% discount): ~$80-120M
```

---

## HEAD-TO-HEAD SCORING

| Criterion | Weight | SB6 Score | SB9 Score |
|-----------|--------|-----------|-----------|
| **Revenue Potential** | 25% | 7/10 | **9/10** |
| **Speed to Revenue** | 15% | **8/10** | 5/10 |
| **Competitive Moat** | 20% | 5/10 | **8/10** |
| **Scalability Ceiling** | 15% | **8/10** | 7/10 |
| **Implementation Cost** | 15% | **7/10** | 5/10 |
| **Risk Profile** | 10% | **7/10** | 4/10 |
| **WEIGHTED TOTAL** | 100% | **6.7/10** | **6.8/10** |

---

## DECISION MATRIX

| Factor | SB6 (BNPL) | SB9 (SME Credit) |
|--------|------------|------------------|
| **Time to Demo** | 2-3 days | 4-5 days |
| **Demo Impact** | High (visible checkout) | Medium (backend scoring) |
| **Tech Complexity** | Medium | High |
| **Data Requirements** | Low (can mock) | Medium (need POS data) |
| **Regulatory Risk** | Medium | Medium |
| **Competition Risk** | High | Low |
| **5-Year Revenue Ceiling** | $60M NPV | $120M NPV |
| **Strategic Defensibility** | Low | High |
| **Partnership Required** | E-commerce platforms | POS providers |

---

## APPENDIX B: COMPREHENSIVE 32-USE CASE ANALYSIS

*Full analysis available in: `USE_CASE_ANALYSIS.md`*

### Quick Reference: TOP 10 Rankings

| Rank | ID | Use Case | Score | Category |
|------|----|----------|-------|----------|
| 1 | SB6 | Embedded Installment & BNPL | 7.4 | Bank |
| 2 | SF12 | MicroBiz Loan for Digital Economy | 7.3 | Finance |
| 3 | SF11 | Earned Wage Access & Salary-Linked | 7.0 | Finance |
| 4 | SB9 | AI-Driven SME Credit Scoring | 7.1 | Bank |
| 5 | SB4 | AI Call Bot | 6.9 | Bank |
| 6 | SF3 | Video Call eKYC | 6.9 | Finance |
| 7 | SL3 | Claims Fraud Detection | 6.9 | Life |
| 8 | SF4 | AI-based CRM | 6.8 | Finance |
| 9 | SF5 | Open Banking Credit Scoring | 6.8 | Finance |
| 10 | SB3 | Loyalty & Personalized Offers | 6.6 | Bank |

### Category Winners

| Entity | Winner | Score | Runner-up |
|--------|--------|-------|-----------|
| **Shinhan Bank** | SB6 (BNPL) | 7.4 | SB9 (SME Credit) - 7.1 |
| **Shinhan Finance** | SF12 (MicroBiz) | 7.3 | SF11 (Salary-Linked) - 7.0 |
| **Shinhan Securities** | SS4 (Accounting) | 6.7 | SS5 (RegTech) - 6.7 |
| **Shinhan Life** | SL3 (Fraud Detection) | 6.9 | SL4 (Health) - 6.4 |

### Priority Use Cases by Objective

**FOR PRIZE (Demo Impressiveness):**
1. SB4 - AI Call Bot (9/10 demo score)
2. SB6 - BNPL (9/10 demo score)
3. SB7 - SoftPOS (8/10 demo score)

**FOR JOB CONTRACT (Business Value):**
1. SB9 - SME Credit (9/10 revenue potential)
2. SB6 - BNPL (9/10 revenue potential)
3. SF12 - MicroBiz Loan (8/10 revenue potential)

**TIER 1 RECOMMENDATIONS:**
- 🥇 SB6 (BNPL) - Best overall balance
- 🥈 SB4 (Call Bot) - Best demo impact
- 🥉 SF12 (MicroBiz) - Best business value

---

## APPENDIX B: First-Principles Strategy Synthesis

### The Core Tension

| Objective | What Wins It |
|-----------|--------------|
| **PRIZE** | Impressive demo in 3-5 min, memorable, visual, working |
| **JOB** | Practical business value, strategic thinking, implementation skill |

### What Wins the PRIZE?

1. MEMORABILITY (30%) - Voice > Text > Slides, Live demo, 3-5 min window
2. CLARITY (25%) - One problem, one solution, one impact
3. WORKING PROTOTYPE (25%) - Not "what we would build" but "what we built"
4. QWEN INTEGRATION (20%) - Using their tech, showing capability depth

### What Wins the JOB?

1. STRATEGIC THINKING (30%) - Understanding THEIR business, bigger picture
2. IMPLEMENTATION PRAGMATISM (25%) - Realistic approach, constraint awareness
3. DATA FOOTPRINT (20%) - Data pipeline thinking, integration complexity
4. CULTURAL FIT (25%) - Korean professionalism, Vietnamese market, finance risk-awareness

### THE SWEET SPOT: SB6 with SF12 Narrative

**PRIMARY: SB6 (BNPL)** - Full demo energy
**NARRATIVE: Frame as "SME Ecosystem Entry Point"**

Why:
- SB6 Demo → Wins prize (impressive checkout flow)
- SB6 + SF12 Connection → Wins job (strategic vision)
- The Pitch: "BNPL for merchants who are SMEs. Merchant BNPL → merchant POS → merchant credit (SB9) → full banking"

### REVISED RECOMMENDATION: Priority Matrix

**TIER 1: MUST BUILD**
| ID | Use Case | For | Why |
|----|----------|-----|-----|
| SB6 | Embedded Installment & BNPL | PRIZE + JOB | Best demo + strong business narrative |

**TIER 2: STRATEGIC NARRATIVE**
| ID | Use Case | For | Why |
|----|----------|-----|-----|
| SF12 | MicroBiz Loan | JOB | Massive market, strategic depth |
| SB9 | SME Credit via POS | JOB | $10-15B gap, data moat |

**TIER 3: TECH INSIGHTS**
| ID | Use Case | For | Why |
|----|----------|-----|-----|
| SB4 | AI Call Bot | PRIZE backup | Highest demo score, Vietnamese differentiator |
| SF3 | eKYC Deepfake | JOB | Security awareness |

### EXECUTION PLAN

| Phase | Hours | Focus | Output |
|-------|-------|-------|--------|
| 1. Foundation | 8h | Mock e-commerce checkout + Qwen credit decision | Working BNPL demo |
| 2. Demo Polish | 8h | UI/UX, error handling, demo flow | Memorable 3-min demo |
| 3. Narrative Prep | 4h | SME ecosystem story, data support | Pitch deck |
| 4. Backup Plan | 4h | SB4 voice bot basics | Fallback demo |

### Demo Flow (3 minutes)

```
0:00 - Hook: "Try to buy this laptop. You can't afford it all at once."
0:30 - Show BNPL option at checkout
1:00 - Instant approval (Qwen credit decision)
1:30 - Breakdown of monthly payments
2:00 - Transition: "But this is just the beginning..."
2:30 - The ecosystem story: BNPL → POS → Credit → Banking
3:00 - Close: "We can start with BNPL. We should finish with SME banking."
```

### FINAL VERDICT

| Decision | Choice |
|----------|--------|
| PRIMARY Build | SB6 - Embedded Installment & BNPL |
| STRATEGIC Narrative | SB9/SF12 - SME ecosystem |
| BACKUP Demo | SB4 - Voice Bot |
| TRACK | Shinhan Bank (most aligned) |

**The One-Liner Pitch:**
"We built BNPL because it's the easiest way to get an SME's foot in Shinhan's door. Once they're shopping, we get their POS data. With their POS data, we give them credit. With their credit, we become their bank."

### Full Scoring Matrix Summary

| Rank | ID | Score | Prize Fit | Job Fit | Combined | Recommendation |
|------|----|-------|-----------|---------|----------|----------------|
| 1 | SB6 | 7.4 | 9 | 7 | 16 | 🏆 PRIMARY BUILD |
| 2 | SB4 | 6.9 | 9 | 6 | 15 | ⚡ BACKUP |
| 3 | SF12 | 7.3 | 7 | 9 | 16 | 📊 NARRATIVE |
| 4 | SB9 | 7.1 | 6 | 9 | 15 | 📊 NARRATIVE |
| 5 | SF11 | 7.0 | 7 | 8 | 15 | 📊 NARRATIVE |
| 6 | SF3 | 6.9 | 8 | 7 | 15 | 💡 INSIGHT |
| 7 | SL3 | 6.9 | 7 | 8 | 15 | ❌ Diff Track |
| 8 | SF4 | 6.8 | 6 | 8 | 14 | 📊 CONSIDER |
| 9 | SF5 | 6.8 | 6 | 8 | 14 | 📊 CONSIDER |
| 10 | SB7 | 6.7 | 8 | 7 | 15 | 📊 SB6 CONNECTION |

**AVOID:** SB5 (4.8), SB10 (3.9), SF9 (4.7), SF10 (5.3), SS1 (5.1)