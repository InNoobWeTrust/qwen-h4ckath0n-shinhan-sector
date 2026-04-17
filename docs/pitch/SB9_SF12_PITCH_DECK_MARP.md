---
marp: true
paginate: true
size: 16:9
theme: default
style: |
  section {
    background: white;
    color: #1a1a1a;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
  h1 {
    font-size: 48px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 24px;
  }
  h2 {
    font-size: 36px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 16px;
  }
  h3 {
    font-size: 24px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 12px;
  }
  p {
    font-size: 20px;
    line-height: 1.6;
    color: #333;
    margin-bottom: 16px;
  }
  ul {
    font-size: 20px;
    line-height: 1.6;
    color: #333;
  }
  strong {
    color: #000;
  }
  .highlight {
    color: #e11d48;
    font-weight: 600;
  }
  .big-number {
    font-size: 56px;
    font-weight: 700;
    color: #e11d48;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .card {
    background: #f8f8f8;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #e11d48;
  }
  table {
    font-size: 14px;
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  th {
    background: #f8f8f8;
    font-weight: 600;
  }
  .flow {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .flow-step {
    padding: 16px 24px;
    background: #f8f8f8;
    border-radius: 8px;
    border: 1px solid #ddd;
    text-align: center;
  }
  .arrow {
    font-size: 24px;
    color: #e11d48;
  }
  .code {
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 16px;
    background: #f4f4f4;
    padding: 12px;
    border-radius: 4px;
  }
  .demo-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin: 20px 0;
  }
  .demo-grid div {
    background: #f8f8f8;
    padding: 12px;
    border-radius: 6px;
    font-size: 14px;
    text-align: center;
  }
  .pilot-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 20px 0;
  }
  .pilot-grid div {
    background: #f8f8f8;
    padding: 16px;
    border-radius: 8px;
    font-size: 14px;
  }
  .fraud-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 20px 0;
  }
  .fraud-box {
    background: #f8f8f8;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  .fraud-icon {
    font-size: 32px;
    margin-bottom: 8px;
  }
  .fraud-title {
    font-weight: 600;
    margin-bottom: 8px;
  }
  .fraud-desc {
    font-size: 14px;
    color: #666;
  }
  .roadmap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin: 30px 0;
  }
  .roadmap-phase {
    background: #f8f8f8;
    padding: 20px;
    border-radius: 8px;
    width: 200px;
  }
  .roadmap-arrow {
    font-size: 24px;
    color: #e11d48;
  }
  .phase-num {
    font-size: 12px;
    color: #666;
    margin-bottom: 4px;
  }
  .phase-title {
    font-weight: 600;
    margin-bottom: 12px;
  }
  .roadmap-phase ul {
    font-size: 14px;
    margin: 0;
    padding-left: 16px;
  }
  .demo-roadmap {
    gap: 10px;
    align-items: stretch;
    flex-wrap: nowrap;
  }
  .demo-roadmap .roadmap-phase {
    width: 138px;
    padding: 16px 14px;
  }
  .demo-roadmap .phase-title {
    font-size: 15px;
    line-height: 1.2;
    margin-bottom: 8px;
  }
  .demo-roadmap p {
    font-size: 12px;
    line-height: 1.35;
    margin: 0;
    color: #555;
  }
  section.flywheel-slide .flywheel {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 44px minmax(0, 1fr) 44px minmax(0, 1fr) 44px minmax(0, 1fr) 44px minmax(0, 1fr);
    grid-template-rows: auto 58px auto 40px;
    gap: 14px 8px;
    align-items: stretch;
    max-width: 1180px;
    margin: 8px auto 0;
    padding: 8px 10px 0;
  }
  section.flywheel-slide .flywheel-step {
    background: linear-gradient(180deg, #ffffff 0%, #fbf4f6 100%);
    border: 1px solid rgba(225, 29, 72, 0.12);
    border-radius: 20px;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
    min-height: 114px;
    padding: 18px 16px 16px;
  }
  section.flywheel-slide .flywheel-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    height: 32px;
    padding: 0 12px;
    border-radius: 999px;
    background: #e11d48;
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.08em;
    margin-bottom: 12px;
  }
  section.flywheel-slide .flywheel-title {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
    color: #111827;
  }
  section.flywheel-slide .flywheel-copy {
    font-size: 15px;
    line-height: 1.2;
    color: #4b5563;
  }
  section.flywheel-slide .flywheel-arrow {
    justify-self: center;
    align-self: center;
    color: #e11d48;
    font-size: 42px;
    font-weight: 700;
    line-height: 1;
  }
  section.flywheel-slide .flywheel-arrow-vertical {
    font-size: 48px;
  }
  section.flywheel-slide .flywheel-step-01 { grid-column: 1; grid-row: 1; }
  section.flywheel-slide .flywheel-step-02 { grid-column: 3; grid-row: 1; }
  section.flywheel-slide .flywheel-step-03 { grid-column: 5; grid-row: 1; }
  section.flywheel-slide .flywheel-step-04 { grid-column: 7; grid-row: 1; }
  section.flywheel-slide .flywheel-step-05 { grid-column: 9; grid-row: 1; }
  section.flywheel-slide .flywheel-step-06 { grid-column: 9; grid-row: 3; }
  section.flywheel-slide .flywheel-step-07 { grid-column: 7; grid-row: 3; }
  section.flywheel-slide .flywheel-step-08 { grid-column: 5; grid-row: 3; }
  section.flywheel-slide .flywheel-step-09 { grid-column: 3; grid-row: 3; }
  section.flywheel-slide .flywheel-arrow-12 { grid-column: 2; grid-row: 1; }
  section.flywheel-slide .flywheel-arrow-23 { grid-column: 4; grid-row: 1; }
  section.flywheel-slide .flywheel-arrow-34 { grid-column: 6; grid-row: 1; }
  section.flywheel-slide .flywheel-arrow-45 { grid-column: 8; grid-row: 1; }
  section.flywheel-slide .flywheel-arrow-56 { grid-column: 9; grid-row: 2; }
  section.flywheel-slide .flywheel-arrow-67 { grid-column: 8; grid-row: 3; }
  section.flywheel-slide .flywheel-arrow-78 { grid-column: 6; grid-row: 3; }
  section.flywheel-slide .flywheel-arrow-89 { grid-column: 4; grid-row: 3; }
  section.flywheel-slide .flywheel-loop {
    grid-column: 1 / -1;
    grid-row: 4;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    color: #64748b;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  section.flywheel-slide .flywheel-loop-line {
    flex: 1;
    height: 2px;
    max-width: 320px;
    background: linear-gradient(90deg, rgba(225, 29, 72, 0.12), rgba(225, 29, 72, 0.6));
    position: relative;
  }
  section.flywheel-slide .flywheel-loop-line-left::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 10px;
    height: 10px;
    border-left: 2px solid #e11d48;
    border-bottom: 2px solid #e11d48;
    transform: translate(-1px, -50%) rotate(45deg);
  }
  section.flywheel-slide .flywheel-loop-line-right {
    background: linear-gradient(90deg, rgba(225, 29, 72, 0.6), rgba(225, 29, 72, 0.12));
  }
---

<!-- _class: lead -->

# Shinhan Soft POS

## The Merchant Operating System with Embedded Credit

**Qwen AI Build Day — Financial Track (sponsored by Shinhan)**

---

# The Problem

## Vietnamese SME Merchants Struggle Every Day

<div class="grid">

<div class="card">

**Daily Pain Points:**
- Managing POS, Shopee, TikTok, MoMo separately
- Counting inventory manually every evening
- Tracking staff hours and shift schedules
- Reconciling payments from 5+ platforms
- Cash flow gaps between sales and settlements

</div>

<div class="card">

**Current Reality:**
- 3 different apps for sales channels
- Excel spreadsheets for inventory
- Paper timesheets for staff
- 2+ hours nightly reconciliation
- No visibility when cash will run out

</div>

</div>

---

# The Credit Gap

| What Banks Want | What SMEs Have |
|-----------------|----------------|
| 6 months statements | Cash registers (POS) |
| Tax returns | Shopee/Lazada/TikTok sales |
| Collateral | MoMo wallet transactions |
| Formal business registration | Daily sales receipts |

<div class="card">

**40.5%** of Vietnam's firms have bank loans — World Bank Enterprise Survey

</div>

---

# The Solution

## Shinhan Soft POS

### The Alternative Credit Layer for Vietnam's SMEs

<div class="grid">

<div class="card">

✅ **POS + marketplace + e-wallet data fusion**
✅ **ML-based normalization turns fragmented activity into one merchant timeline**
✅ **Alternative credit profile built from explainable transaction patterns**
✅ **Signals banks can actually underwrite against**

</div>

<div class="card">

✅ **Embedded working capital at the point of need**
✅ **72-hour approval target with policy-based pre-screening**
✅ **No traditional bureau file required**
✅ **Human-reviewed underwriting inside daily utility**

</div>

</div>

---

# Daily Utility

## This is what merchants do EVERY DAY

<div class="demo-grid">

<div>
<strong>🌅 Morning</strong><br>
Check overnight orders<br>
Review inventory levels<br>
Assign staff shifts
</div>

<div>
<strong>☀️ Midday</strong><br>
Process in-store sales<br>
Fulfill marketplace orders<br>
Print customer receipts
</div>

<div>
<strong>🌆 Evening</strong><br>
Auto-reconcile all payments<br>
See low-stock alerts<br>
Close shift reports
</div>

<div>
<strong>📈 Any Time</strong><br>
Check sales performance<br>
Manage staff<br>
Restock supplies
</div>

</div>

---

# Engagement Thesis

## Why merchants come back every single day

<div class="grid">

<div class="card">

### ❌ This is NOT a loan app

Merchants don't install loan apps. They install tools that run their business.

</div>

<div class="card">

### ✅ This is their operating system

- Their business lives inside this app
- Trust is built through daily usage
- Transaction data accumulates naturally
- Financing appears only when they need it

</div>

</div>

---

# Embedded Capital

## Financing when it matters, not as an ad

<div class="grid">

<div class="card">

**Contextual Triggers:**
- 📦 Low stock alert → **Restock financing**
- ⏳ Settlement delayed → **Cash flow advance**
- 📈 Sales growing fast → **Growth capital**

</div>

<div class="card">

**How it works:**
- Based on real business performance
- No separate application
- No credit check required
- Fast, transparent, fair terms

</div>

</div>

---

# The Loan Product

## Clean loan terms for eligible merchants

| Loan Range | $200 - $5,000 |
|------------|---------------|
| Interest Rate | 15-18% APR |
| Term Length | 3, 6, or 12 months |
| Approval Time | 72 hours |
| Min. History | 90 days |

---

# Demo Flow

## How merchant activity turns into financing

<div class="roadmap demo-roadmap">

<div class="roadmap-phase">
<div class="phase-num">Step 1</div>
<div class="phase-title">Install SOL POS</div>
<p>Merchant starts using the operating tool every day.</p>
</div>

<div class="roadmap-arrow">→</div>

<div class="roadmap-phase">
<div class="phase-num">Step 2</div>
<div class="phase-title">Data Normalization</div>
<p>Transactions and consented mobile or telco signals are cleaned and standardized.</p>
</div>

<div class="roadmap-arrow">→</div>

<div class="roadmap-phase">
<div class="phase-num">Step 3</div>
<div class="phase-title">Feature Profile Forms</div>
<p>Audit-ready transaction features populate the scorecard profile.</p>
</div>

<div class="roadmap-arrow">→</div>

<div class="roadmap-phase">
<div class="phase-num">Step 4</div>
<div class="phase-title">90 Days of History</div>
<p>Seasonality, stability, and risk features become reliable.</p>
</div>

<div class="roadmap-arrow">→</div>

<div class="roadmap-phase">
<div class="phase-num">Step 5</div>
<div class="phase-title">Policy Eligibility</div>
<p>Policy rules + score threshold determine eligibility for underwriter review.</p>
</div>

<div class="roadmap-arrow">→</div>

<div class="roadmap-phase">
<div class="phase-num">Step 6</div>
<div class="phase-title">Loan Offer Shown</div>
<p>Illustrative amount and terms appear inside the workflow.</p>
</div>

<div class="roadmap-arrow">→</div>

<div class="roadmap-phase">
<div class="phase-num">Step 7</div>
<div class="phase-title">Funds in 72 Hours</div>
<p>Approved merchants receive funds after underwriting and policy checks.</p>
</div>

</div>

---

# AI Governance Framework

## Explainable scoring with human review by default

<div class="grid">

<div class="card" style="padding: 14px;">

**Human-in-the-Loop as Default**

<ul style="margin: 8px 0; padding-left: 16px; font-size: 12px; line-height: 1.6;">
<li>Every score/recommendation → human review</li>
<li>Fixed reason codes accompany each output</li>
<li>LLM translates only approved reason codes</li>
<li>Inputs, weights, bins logged for audit</li>
</ul>

</div>

<div class="card" style="padding: 14px;">

**What AI Actually Does** <span style="font-size: 12px;">(scoring path)</span>

<ul style="margin: 8px 0; padding-left: 16px; font-size: 12px; line-height: 1.6;">
<li>Transaction cleaning & categorization</li>
<li>Merchant behavior feature engineering</li>
<li>WoE logistic scorecard → primary model</li>
<li>EBM challenger → validation only</li>
</ul>

</div>

</div>

<div class="card" style="padding: 14px; margin-top: 16px;">

**What AI Does Not Do**

<ul style="margin: 8px 0; padding-left: 16px; font-size: 12px; line-height: 1.6;">
<li>Final credit decisions (bankers decide)</li>
<li>Custom explanations (approved codes only)</li>
<li>Black-box inference in scoring path</li>
</ul>

</div>

---

# Explainable Credit Intelligence Layer

## Where Shinhan's underwriting logic stays transparent

<div class="grid">

<div class="card" style="padding: 12px;">

**ML-Based Data Normalization**

<p style="font-size: 13px; margin: 6px 0; line-height: 1.5;">POS, marketplace, e-wallet &amp; telco metadata fused into one audit-ready merchant timeline.</p>

</div>

<div class="card" style="padding: 12px;">

**WoE Scorecard Core**

<p style="font-size: 13px; margin: 6px 0; line-height: 1.5;">Fixed bins, weights &amp; reason codes. EBM challenger runs in parallel for accuracy check.</p>

</div>

<div class="card" style="padding: 12px;">

**Statistical Pattern Features**

<p style="font-size: 13px; margin: 6px 0; line-height: 1.5;">Tết, monsoon &amp; household-business effects → peer-normalized features inside scorecard.</p>

</div>

<div class="card" style="padding: 12px;">

**AI-Assisted Underwriting**

<p style="font-size: 13px; margin: 6px 0; line-height: 1.5;">Policy rules + score thresholds → recommendation pack. Human review standard. LLM translates approved codes only.</p>

</div>

</div>

<div class="highlight" style="margin-top: 16px; font-size: 22px;">

Every score is reproducible from logged inputs, weights, bin boundaries, and reason codes.

</div>

---

<!-- _class: flywheel-slide -->

# The Data Flywheel

<div class="flywheel">

<div class="flywheel-step flywheel-step-01">
<div class="flywheel-num">01</div>
<div class="flywheel-title">More merchants</div>
<div class="flywheel-copy">start using the system</div>
</div>

<div class="flywheel-arrow flywheel-arrow-12">&rarr;</div>

<div class="flywheel-step flywheel-step-02">
<div class="flywheel-num">02</div>
<div class="flywheel-title">More data fused</div>
<div class="flywheel-copy">through consented data normalization</div>
</div>

<div class="flywheel-arrow flywheel-arrow-23">&rarr;</div>

<div class="flywheel-step flywheel-step-03">
<div class="flywheel-num">03</div>
<div class="flywheel-title">Scorecards improve</div>
<div class="flywheel-copy">through calibration and challenger validation</div>
</div>

<div class="flywheel-arrow flywheel-arrow-34">&rarr;</div>

<div class="flywheel-step flywheel-step-04">
<div class="flywheel-num">04</div>
<div class="flywheel-title">Faster underwriting</div>
<div class="flywheel-copy">for strong merchants</div>
</div>

<div class="flywheel-arrow flywheel-arrow-45">&rarr;</div>

<div class="flywheel-step flywheel-step-05">
<div class="flywheel-num">05</div>
<div class="flywheel-title">Better risk features</div>
<div class="flywheel-copy">add seasonality, stability, and anomaly context</div>
</div>

<div class="flywheel-arrow flywheel-arrow-56 flywheel-arrow-vertical">&darr;</div>

<div class="flywheel-step flywheel-step-06">
<div class="flywheel-num">06</div>
<div class="flywheel-title">Lower defaults</div>
<div class="flywheel-copy">through stronger risk selection</div>
</div>

<div class="flywheel-arrow flywheel-arrow-67">&larr;</div>

<div class="flywheel-step flywheel-step-07">
<div class="flywheel-num">07</div>
<div class="flywheel-title">Better portfolio</div>
<div class="flywheel-copy">performance for lenders</div>
</div>

<div class="flywheel-arrow flywheel-arrow-78">&larr;</div>

<div class="flywheel-step flywheel-step-08">
<div class="flywheel-num">08</div>
<div class="flywheel-title">Lower cost of capital</div>
<div class="flywheel-copy">from stronger confidence</div>
</div>

<div class="flywheel-arrow flywheel-arrow-89">&larr;</div>

<div class="flywheel-step flywheel-step-09">
<div class="flywheel-num">09</div>
<div class="flywheel-title">Lower rates</div>
<div class="flywheel-copy">create more demand</div>
</div>

<div class="flywheel-loop">
<span class="flywheel-loop-line flywheel-loop-line-left"></span>
<span>Performance data improves the next validation cycle</span>
<span class="flywheel-loop-line flywheel-loop-line-right"></span>
</div>

</div>

---

# Competitive Advantage

| | Traditional POS | Marketplace Apps | Bank Loans | **Shinhan Soft POS** |
|---|-----------------|------------------|------------|-------------------|
| Multi-channel orders | ❌ | ✅ Only own channel | ❌ | ✅ **All channels unified** |
| Inventory management | ⚠️ Basic | ❌ | ❌ | ✅ **Smart alerts** |
| Staff management | ❌ | ❌ | ❌ | ✅ |
| Automatic reconciliation | ❌ | ❌ | ❌ | ✅ |
| Contextual financing | ❌ | ❌ | ❌ | ✅ **Embedded** |
| Daily usage frequency | Daily | Weekly | Monthly | **Multiple times per day** |

*Sources: MISA Lending (misa.vn), Shopee SEasy (TPBank partnership), Validus Vietnam, Techcombank ShopCash*

<div class="card" style="margin-top: 16px; padding: 14px; font-size: 13px;">

**Why This Matters:**

- Existing solutions use ONE data channel only
- Our approach combines POS + Marketplace + E-wallet data — not yet disclosed as a combined approach in Vietnam

</div>

---

# Payment Safety

## How we protect merchants and Shinhan

**3 statistical safety patterns we monitor:**

<div class="fraud-grid">

<div class="fraud-box">
<div class="fraud-icon">🔄</div>
<div class="fraud-title">Circular Wallet Flows</div>
<div class="fraud-desc">Rule-based flow checks flag repeated wallet loops that appear to inflate transaction volume.</div>
</div>

<div class="fraud-box">
<div class="fraud-icon">🛒</div>
<div class="fraud-title">Synthetic Orders</div>
<div class="fraud-desc">Cross-checks compare payment, address, and fulfillment trails to surface synthetic orders.</div>
</div>

<div class="fraud-box">
<div class="fraud-icon">⚡</div>
<div class="fraud-title">Velocity Anomalies</div>
<div class="fraud-desc">Threshold and peer-baseline checks surface unusual spikes at odd hours or from new devices.</div>
</div>

</div>

---

# Vietnam-Specific Risk Signals

Peer-normalized statistical signals tuned to how local merchants actually operate:

<div class="fraud-grid">

<div class="fraud-box">
<div class="fraud-icon">🎊</div>
<div class="fraud-title">Tết Season Patterns</div>
<div class="fraud-desc">Lunar-calendar seasonality factors help prevent holiday spikes from being mistaken for permanent growth.</div>
</div>

<div class="fraud-box">
<div class="fraud-icon">🌧️</div>
<div class="fraud-title">Monsoon Disruption</div>
<div class="fraud-desc">Regional baseline adjustments separate weather-driven demand drops from true merchant deterioration.</div>
</div>

<div class="fraud-box">
<div class="fraud-icon">👨‍👩‍👧</div>
<div class="fraud-title">Family Business Structures</div>
<div class="fraud-desc">Linked-counterparty features capture shared household cashflow patterns while keeping the score fully auditable.</div>
</div>

</div>

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
<li>Score + reason codes prepared for analyst review</li>
<li>SBV regulatory consultation</li>
</ul>
</div>

<div class="roadmap-arrow">→</div>

<div class="roadmap-phase">
<div class="phase-num">Phase 2</div>
<div class="phase-title">Pilot (Month 3-4)</div>
<ul>
<li>Live data with full consent</li>
<li>POS operations first</li>
<li>Automated score calculation and policy checks</li>
<li>Human review remains standard</li>
<li>Compliance audit trail</li>
</ul>
</div>

<div class="roadmap-arrow">→</div>

<div class="roadmap-phase">
<div class="phase-num">Phase 3</div>
<div class="phase-title">Production (Month 5-6)</div>
<ul>
<li>Full POS rollout</li>
<li>Contextual capital offers</li>
<li>Explainable scorecard + audit trail</li>
<li>Human-reviewed origination at 100+ merchants</li>
</ul>
</div>

</div>

---

# The Ask

## What we need

- Access to merchant/payment infrastructure
- Partnership with existing POS providers
- Pilot merchant cohort for validation
- **6 months** to prove daily engagement

## What you get

- The daily merchant operating system for Vietnam
- High frequency merchant relationship
- Embedded financing monetization layer
- Data asset that compounds with every transaction

---

# What This Is

**We haven't launched a production credit product yet.**

We don't have live API integrations yet.

We don't have a backtested model yet.

**What we HAVE built:**

- Working early system showing normalized data → explainable score concept
- ML-based data fusion and scorecard pipeline architecture
- Clear path to 6-month early product launch

*This is an early product proposal with a defined roadmap.*

---

# The Close

Every sale is captured.

Every inventory alert is acted on.

Every merchant grows with Shinhan.

<br>

<div class="highlight" style="text-align: center; font-size: 28px; margin-top: 40px;">

Position Shinhan as the bank merchants use every day.

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

---

# Appendix: Model Explainability

## WoE Scorecard & EBM Challenger

<div class="grid" style="gap: 8px;">

<div class="card" style="padding: 8px;">

<strong style="font-size: 12px; line-height: 1.2;">WoE Logistic Scorecard</strong>

<p style="font-size: 10px; line-height: 1.2; margin: 0; padding: 0;">Converts transaction history into a single score (300–850 scale) with fixed reason codes. Every input, weight, and bin boundary is logged and reproducible. Regulators prefer it because every decision is fully auditable.</p>

</div>

<div class="card" style="padding: 8px;">

<strong style="font-size: 12px; line-height: 1.2;">EBM Challenger Model</strong>

<p style="font-size: 10px; line-height: 1.2; margin: 0; padding: 0;">A glass-box ML model that runs alongside the scorecard for accuracy validation. Each feature's contribution to the final score is visible. Used for validation only — not final decisions.</p>

</div>

</div>

---

## Why Not Deep Learning or LLM for Scoring?

<div class="card" style="padding: 8px; grid-column: 1 / -1;">

<p style="font-size: 10px; line-height: 1.2; margin: 0; padding: 0;">Black-box models are prohibited by most banking regulators — no one can explain why a merchant was declined. Our LLM is limited to translating pre-approved reason codes into natural language. It never makes or modifies credit decisions.</p>

</div>

<p style="margin-top: 12px; font-size: 11px; color: #e11d48; font-weight: 600; text-align: center;">Every score is reproducible from logged inputs, weights, bin boundaries, and reason codes.</p>

