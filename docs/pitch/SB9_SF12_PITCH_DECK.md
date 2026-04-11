# The Problem

## The Credit Gap

<div class="grid">

<div class="card">

**What Banks Want:**
- 6 months statements
- Tax returns
- Collateral
- Formal business registration

</div>

<div class="card">

**What SMEs Have:**
- Cash registers (POS)
- Shopee/Lazada orders
- TikTok Shop sales
- MoMo wallet transactions
- Daily sales receipts

</div>

</div>

---

# The Reality

## Creditworthy Businesses Getting Rejected

<div class="big-number">40.5%</div>

of Vietnam's firms have bank loans

**World Bank Enterprise Survey: Many SMEs underserved by traditional credit**

**The Data Reality:**
- Street food vendor: **50+ transactions/day**
- TikTok seller: **200 orders/week**
- POS merchant: **Monthly sales in digital systems**
- **Existing solutions use ONE data source. We combine MULTIPLE.**

---

# The Insight

## Why do banks reject SMEs?

**They look at the wrong data.**

## What data do SMEs actually generate?

<div class="grid">

- Sales receipts
- Order volumes
- Settlement patterns
- Customer returns

</div>

## What if we used that data?

<div class="highlight">We'd see businesses banks can't see.</div>

---

# The Solution

## Shinhan Credit Connect

We combine data sources banks ignore into a credit score that reflects actual business health:

<div class="grid">

- **POS transaction data** (SB9)
- **Marketplace sales** (SF12)
- **E-wallet cash flow** (SF12)
- **Settlement timing patterns**
- **Seasonal variations**
- **Return/refund behavior**

</div>

---

# The Demo

## From Transaction to Loan Offer

<div class="demo-grid">

<div><strong>Step 1:</strong> Merchant installs SOL POS / connects marketplace</div>

<div><strong>Step 2:</strong> Transaction data flows in over time</div>

<div><strong>Step 3:</strong> Credit score starts forming</div>

<div><strong>Step 4:</strong> After 90 days: pattern emerges</div>

<div><strong>Step 6:</strong> Illustrative loan offer generated</div>

<div><strong>Step 7:</strong> Funds: Decision in 72 hours</div>

</div>

*This is a mock scenario for demonstration. We show the CONCEPT of data → score → recommendation.*

---

# How It Works

## Layer 1: POS Data (SB9)

<div class="card">

- Daily sales volume
- Transaction count
- Average ticket size
- Refund rate
- Settlement timing (daily/weekly)
- Peak hours patterns

</div>

---

# How It Works

## Layer 2: Marketplace Data (SF12)

<div class="card">

- GMV from Shopee/Lazada/TikTok
- Order completion rate
- Return rate
- Cancellation rate
- Response time
- Review scores

</div>

---

# How It Works

## Layer 3: E-Wallet Data (SF12)

<div class="card">

- Cash flow patterns
- Inflow/outflow ratio
- Recurring payments
- Balance trends

</div>

---

# How It Works

## The Scoring Model

<div class="grid">

<div class="card">

**Signals We Analyze:**
- Sales Consistency
- Growth Trend
- Cash Flow Health
- Return Rate
- Settlement History
- Seasonal Patterns

</div>

<div class="card">

**Weights:**
- Weights are illustrative - to be validated with pilot data
- Model will be backtested against historical outcomes

</div>

</div>

<div style="margin-top: 20px; color: #666;">
<em>This is a proof of concept. Specific weights and thresholds determined during pilot.</em>
</div>

---

# Fraud Prevention

## How We Detect Manipulation

**3 Fraud Patterns We Watch:**

<div class="fraud-grid">

<div class="fraud-box">
<div class="fraud-icon">🔄</div>
<div class="fraud-title">Circular Wallet Flows</div>
<div class="fraud-desc">Same money moving between accounts to inflate transaction volume</div>
</div>

<div class="fraud-box">
<div class="fraud-icon">🛒</div>
<div class="fraud-title">Synthetic Orders</div>
<div class="fraud-desc">Fake marketplace orders with no actual delivery</div>
</div>

<div class="fraud-box">
<div class="fraud-icon">⚡</div>
<div class="fraud-title">Velocity Anomalies</div>
<div class="fraud-desc">Unusual spike in transactions at odd hours</div>
</div>

</div>

**How We Respond:**
- Flag for human review
- Require additional verification
- Score penalty applied

---

# Compliance Roadmap

## Path to Production

<div class="roadmap">

<div class="roadmap-phase">
<div class="phase-num">Phase 1</div>
<div class="phase-title">Sandbox (Month 1-2)</div>
<ul>
<li>Anonymized data only</li>
<li>Internal testing</li>
<li>Manual review for all decisions</li>
<li>SBV regulatory consultation</li>
</ul>
</div>

<div class="roadmap-arrow">→</div>

<div class="roadmap-phase">
<div class="phase-num">Phase 2</div>
<div class="phase-title">Pilot (Month 3-4)</div>
<ul>
<li>Live data with full consent</li>
<li>Automated decisions (80%)</li>
<li>Human review for exceptions</li>
<li>Compliance audit trail</li>
</ul>
</div>

<div class="roadmap-arrow">→</div>

<div class="roadmap-phase">
<div class="phase-num">Phase 3</div>
<div class="phase-title">Production (Month 5-6)</div>
<ul>
<li>Full automated processing</li>
<li>Real-time fraud detection</li>
<li>Complete audit compliance</li>
<li>Scale to 100+ merchants</li>
</ul>
</div>

</div>

---

# The Hacker Advantage

## Why This Works

**1. Data Fusion Engine**
Combined 3 data streams not designed to talk. Normalized across formats, timing, currencies.

**2. Vietnam-Specific Heuristics**
Tết spikes, school cycles, monsoon disruption, market day rhythms.

**3. Explainable Rules**
Not a black box. Merchants see WHY their score changed.

---

# Qwen's Role

## Where AI adds value
- Parse and categorize transaction descriptions in Vietnamese
- Detect anomalies in spending patterns
- Generate explainable score summaries
- Predict cash flow for loan sizing

## Where human cleverness matters more
- Design credit signals that predict default
- Build seasonal adjustments for Vietnam
- Create thresholds for informal businesses
- Balance approval rate vs. default rate

---

# The Business Model

## For Shinhan

### Revenue
- Loan origination fees
- Interest income: Market-competitive rate
- Deposit growth: SME accounts
- Cross-sell: Insurance, payment processing

### Unit Economics
- Unit economics TBD based on early product launch
- Focus: prove the model works first
- Target: prove model performance at acceptable loss rate

---

# The Loan Product

## What We Offer

<div class="loan-grid">

<div class="loan-box">
<div class="loan-label">Loan Range</div>
<div class="loan-value">$200 - $5,000</div>
</div>

<div class="loan-box">
<div class="loan-label">Interest Rate</div>
<div class="loan-value">15-18% APR</div>
</div>

<div class="loan-box">
<div class="loan-label">Term Length</div>
<div class="loan-value">3, 6, or 12 months</div>
</div>

<div class="loan-box">
<div class="loan-label">Approval Time</div>
<div class="loan-value">72 hours</div>
</div>

</div>

<div class="loan-grid">

<div class="loan-box">
<div class="loan-label">Origination Fee</div>
<div class="loan-value">1%</div>
</div>

<div class="loan-box">
<div class="loan-label">Late Payment</div>
<div class="loan-value">1.5%/mo</div>
</div>

<div class="loan-box">
<div class="loan-label">Prepayment</div>
<div class="loan-value">No penalty</div>
</div>

<div class="loan-box">
<div class="loan-label">Min. History</div>
<div class="loan-value">90 days</div>
</div>

</div>

*Illustrative terms for demonstration. Final terms determined during pilot.*

---

# The Flywheel

**More merchants** → More data captured
↓  
**Better scoring** → Higher approval rates  
↓  
**Better underwriting** → Lower defaults  
↓  
**Better portfolio** → Lower cost of capital  
↓  
**Lower rates** → More demand

*This data asset compounds over time.*

---

# Competitive Position

| | Traditional Bank | Existing Alternative Lenders | **Shinhan Credit Connect** |
|--|-----------------|---------------------------|------------------------|
| **Data used** | Tax statements | One channel (e.g., Shopee, or MISA) | **POS + Marketplace + Wallet COMBINED** |
| **Approval time** | 5-7 days | 5 minutes to 48 hours | **Target: fastest practical** |
| **Min. history** | 6 months | 3 months | **90 days minimum history** |
| **Data breadth** | Narrow | Medium | **We combine POS + marketplace + e-wallet data** |
| **SME coverage** | Limited | Growing | **Focus: underserved segment** |

*Sources: MISA Lending (misa.vn), Shopee SEasy (TPBank partnership), Validus Vietnam, Techcombank ShopCash*

---

# Early Product Launch Plan

<div class="pilot-grid">

<div><strong>Phase 1 (M1-2):</strong><br>20 POS merchants<br>→ data quality, score distribution</div>

<div><strong>Phase 2 (M3-4):</strong><br>50 digital sellers<br>→ marketplace data, hybrid scoring</div>

<div><strong>Phase 3 (M5-6):</strong><br>Full credit product<br>→ disbursement, defaults, repeat</div>

</div>

**Success Metric:** prove data quality + model signal

---

## What This Is

We haven't launched a production credit product yet.
We don't have live API integrations yet.
We don't have a backtested model yet.

What we HAVE built:
- Working early system showing data → score concept
- Data fusion pipeline architecture
- Clear path to 6-month early product launch

This is an early product proposal with a defined roadmap.

---

# The Ask

## What we need
- Access to SOL merchant infrastructure
- Partnership with 1-2 POS providers
- API access to anonymized transaction data
- **6 months** to prove the model

## What you get
- Working **alternative credit scoring prototype**
- Path to serving underserved SMEs
- Data asset that compounds over time
- Team that understands both **data engineering** and **credit risk**

---

# The Close

<div class="grid">

Every transaction is a **data point**.

Every data point is a **credit signal**.

Every credit signal is a **business that can grow**.

</div>

<br>

<div class="highlight" style="text-align: center; font-size: 28px; margin-top: 40px;">

We built the credit bureau Vietnam's SMEs deserve.

</div>

---

# Appendix: Research Sources

## Market Context

| Source | What It Verifies |
|--------|------------------|
| [Vietnam News - Digital Loans Open New Doors for SMEs](https://vietnamnews.vn/economy/1725998/digital-loans-open-new-doors-for-smes.html) | SMEs struggle to access bank credit; digital lending growing |
| [Techcombank - MISA Lending](https://techcombank.com/ho-kinh-doanh-va-doanh-nghiep-nho/doanh-nghiep-nho/vay/vay-tin-chap-doanh-nghiep) | Existing bank alternative-data lending product |
| [MISA Lending - MB Partnership](https://lending.misa.vn/797/misa-va-mb-ky-ket-hop-tac-trien-khai-giai-phap-tai-chinh-so-cho-smes/) | Digital SME lending via accounting software |

## Existing Competitor Products

| Source | What It Verifies |
|--------|------------------|
| [Shopee Seller Education - SEasy](https://banhang.shopee.vn/edu/article/19078) | Shopee seller financing product exists |
| [Validus Vietnam](https://validus.vn/en/) | Active SME lender in Vietnam |
| [Techcombank MerchantOne](https://techcombank.com/ho-kinh-doanh-va-doanh-nghiep-nho/doanh-nghiep-nho/goi-giai-phap-doanh-nghiep/merchant-one) | Bank merchant acceptance product |
| [Techcombank SoftPOS](https://techcombank.com/ho-kinh-doanh-va-doanh-nghiep-nho/doanh-nghiep-nho/quan-ly-doanh-thu/softpos) | Bank SoftPOS product |
| [Techcombank ShopCash](https://techcombank.com/ho-kinh-doanh-va-doanh-nghiep-nho/ho-kinh-doanh/vay/vay-tin-chap-kinh-doanh-shopcash) | Bank merchant lending product |

## Key Insight

**Existing solutions use ONE data channel:**
- Shopee uses Shopee data
- MISA uses accounting data
- Techcombank uses their own merchant data

**Our approach: Combine POS + Marketplace + E-wallet data - not yet disclosed as a combined approach in Vietnam.**
