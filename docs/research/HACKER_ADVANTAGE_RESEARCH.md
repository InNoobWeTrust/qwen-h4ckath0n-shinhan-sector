# Hacker Advantage Research

## Strategic Brief

### Bottom Line

The strongest hackathon opportunities are not the ones where the team merely wraps a frontier model in a chatbot UI. The strongest opportunities are the ones where hackers can outperform large vendors through messy integration work, bespoke underwriting logic, and local-market workflow design.

That shifts the ranking materially:

1. **SB9 - AI-Driven SME Credit Scoring via POS Data** is the best pure hacker-advantage play.
2. **SF12 - MicroBiz Loan for Digital Economy** is the best data-fusion moat play.
3. **SB3 - AI-Powered Loyalty & Personalized Offers** is the best real-time integration play with visible demo value.

If the question is, "Where can hackers show cleverness that Qwen/OpenAI/Google cannot easily commoditize?" the answer is: **use cases built on proprietary data plumbing, local heuristics, and awkward last-mile integrations.**

### Decision Rule

Prefer use cases with all or most of these traits:

- Value comes from combining 2-4 disconnected data sources.
- A smart rules engine can already create value before any advanced AI layer exists.
- Local Vietnam workflow knowledge matters.
- Integration complexity is the moat.
- The model is a helper, not the product.

Avoid use cases where the main story is "the model talks well" or "the model summarizes things nicely." Those are easiest for vendors to copy.

---

## Top 3 Recommendations

### 1) SB9 - AI-Driven SME Credit Scoring via POS Data

**Why this wins**

- Best combination of data engineering, underwriting heuristics, and SME niche insight.
- A non-AI hacker could still build a compelling MVP with deterministic risk rules and merchant dashboards.
- The moat is not the model. The moat is the transaction pipeline and the credit logic built on top of it.

**Where the clever human work is**

- Combine POS sales velocity, refund patterns, merchant category, payment timing, seasonality, and existing bank behavior.
- Design heuristic signals for merchant health before training any model.
- Build a real-time "sales to limit" feedback loop that lenders can understand.

**The winning hack**

- Turn merchant cash-register exhaust into an alternative credit bureau for thin-file SMEs.

### 2) SF12 - MicroBiz Loan for Digital Economy

**Why this wins**

- Strongest "Vietnam digital seller" angle: sellers on marketplaces, social commerce, delivery apps, and e-wallet rails do not fit normal underwriting.
- Big vendors will not ship this niche workflow out of the box because it depends on fragmented local commerce signals.
- A non-AI system using marketplace heuristics, return-rate rules, and payout-flow analysis can already outperform generic scoring.

**Where the clever human work is**

- Fuse e-commerce orders, wallet cash flow, fulfillment cadence, cancellation rates, and merchant responsiveness.
- Translate seller behavior into working-capital risk signals.
- Tailor logic for informal digital merchants who have no formal statements.

**The winning hack**

- Use commerce-operating data, not paperwork, to underwrite Vietnam's digital long tail.

### 3) SB3 - AI-Powered Loyalty & Personalized Offers

**Why this wins**

- Strongest visible consumer demo among the hacker-advantage set.
- The model can write the offer copy, but the real win is QR + merchant + customer-context orchestration.
- It fits Vietnam's QR-heavy payment behavior and merchant-funded promotion mechanics.

**Where the clever human work is**

- Join merchant inventory or campaign rules, geolocation, payment context, loyalty state, and bank customer segments.
- Encode timing and context heuristics that simple recommendation models often miss.
- Build scan-time offer selection instead of static campaign blasts.

**The winning hack**

- Turn a QR payment event into a real-time decision point for promotion, cross-sell, and merchant activation.

### Near-Miss Candidates

- **SF11 - Earned Wage Access & Salary-Linked Lending:** strong payroll-integration hack, but narrower than SB9/SF12.
- **SB7 - SoftPOS for SOHO:** excellent integration story, but AI can feel secondary unless paired with merchant underwriting or insights.
- **SS4 - End-to-End Accounting Automation:** strong SME data moat, but harder to demo crisply in a short pitch.

---

## Full 32-Use-Case Filter

Legend:

- **Lens:** data engineering / rules / integration / niche
- **Non-AI hacker?:** yes = good hacker-advantage signal
- **Verdict:** strong / medium / weak for hacker advantage

| ID | Use Case | Where is the clever human work? | Could a non-AI hacker solve this? | What's the winning hack? | Verdict |
|----|----------|---------------------------------|-----------------------------------|--------------------------|---------|
| SB1 | AI Personal Financial Coach | Rules + niche; personal finance heuristics for Vietnamese spending patterns | Yes | Turn raw transaction streams into actionable budget rules and product triggers | Medium |
| SB2 | Customer Engagement Automation | Integration + rules; event triggers across channels | Yes | Build behavior-triggered comms from banking events instead of generic campaigns | Medium |
| SB3 | Loyalty & Personalized Offers | Integration + data engineering + niche | Yes | Fuse QR, merchant, location, and customer context at scan time | Strong |
| SB4 | AI Call Bot for Collections & Sales | Rules + workflow design more than model novelty | Partly | Constrain voice AI inside policy envelopes and escalation logic | Medium |
| SB5 | Internal Reporting & BI Automation | Mostly UX on top of data warehouse | Yes | Natural-language access to internal BI | Weak |
| SB6 | Embedded Installment & BNPL | Integration + underwriting rules | Yes | Connect checkout, risk rules, and bank approval in one flow | Medium |
| SB7 | SoftPOS for SOHO | Integration + niche | Yes | Turn a merchant phone into payment acceptance and a merchant-data entry point | Strong |
| SB8 | Voice Biometrics for Fraud Prevention | Mostly model/system performance | No, not really | Add voiceprint and anti-spoofing to existing flows | Weak |
| SB9 | SME Credit Scoring via POS Data | Data engineering + rules + niche | Yes | Build alternative credit from merchant sales exhaust | Strong |
| SB10 | Branch Traffic Prediction | Mostly forecasting | Yes | Combine calendar, queue, and staffing patterns | Weak |
| SF1 | Intelligent Document Processing | Workflow integration + document schema mapping | Yes | Convert messy lending docs into structured operations data | Medium |
| SF2 | Falsified Document Detection | Rules + forensic heuristics | Partly | Flag tampering via visual, metadata, and consistency checks | Medium |
| SF3 | Video Call Enhancement with eKYC | Integration + risk workflow; model still central | Partly | Add live agent-assist, challenge prompts, and escalation logic on top of video review | Medium |
| SF4 | AI-based CRM | Data engineering + integration | Yes | Unify customer interactions into next-best-action logic | Medium |
| SF5 | Open Banking API for AI Credit Scoring | Data engineering + integration + rules | Yes | Use multi-bank cash-flow signals to score thin-file borrowers | Strong |
| SF6 | BNPL/Personal Loan Partnership | Mostly business integration | Yes | Build referral and decision handoff across partners quickly | Medium |
| SF7 | AI for ICT Cyber Security | Heavy detection/modeling and infra | Partly | Correlate logs and alerts into analyst workflows | Medium |
| SF8 | Customer Behavior Prediction | Data fusion is the story | Yes | Blend telco, wallet, and behavioral signals for prospect ranking | Strong |
| SF9 | AI for Management BI Reports | Mostly chat-on-top-of-BI | Yes | Better management query interface | Weak |
| SF10 | Voice-to-Text Solution | Commodity speech layer | Yes, but limited moat | Vietnamese transcription in internal workflows | Weak |
| SF11 | Earned Wage Access & Salary-Linked Lending | Integration + niche + underwriting rules | Yes | Use payroll continuity and employer patterns to unlock lower-risk lending | Strong |
| SF12 | MicroBiz Loan for Digital Economy | Data engineering + niche + rules + integration | Yes | Underwrite online sellers from marketplace and wallet behavior, not formal statements | Strong |
| SS1 | AI-Native Rapid POC / Vibe Coding | Mostly model usage | Yes | Faster prototyping with AI | Weak |
| SS2 | AI-Enhanced Investment Experience | Product heuristics + content orchestration | Yes | Combine investor profile, market context, and gamified nudges | Medium |
| SS3 | AI-Powered Financial Content Generation | Mostly commodity model capability | Yes | Personalize market summaries from feeds | Weak |
| SS4 | End-to-End Accounting Automation | Integration + rules + SME niche | Yes | Reconcile invoices, journals, and bank flows into finance-ready ledgers | Strong |
| SS5 | RegTech / Compliance Tech | Rules + integration + analyst workflow | Yes | Layer bespoke compliance logic over trading and KYC streams | Strong |
| SS6 | Digital Assets & Tokenized Securities | Infra and regulatory design more than AI | Yes | Connect issuance, custody, and investor workflows | Medium |
| SL1 | Data Analytics & BI Platform | Data engineering platform work | Yes | Centralize life-insurance data for downstream decisions | Medium |
| SL2 | Voice AI Rating System | Rules + audio compliance workflow | Partly | Detect script deviations and suspicious voice patterns in insurance sales | Medium |
| SL3 | Insurance Claims Fraud Detection | Rules + data fusion + niche | Yes | Combine claims timing, policy context, provider behavior, and anomaly rules | Strong |
| SL4 | Digital Health Ecosystem | Integration + niche ecosystem design | Yes | Connect health engagement data to insurance activation and retention | Medium |

---

## What This Means Strategically

### Best Hacker-Advantage Cluster: Alternative Underwriting

The best cluster is **SB9 + SF12 + SF11 + SF5**.

- These use cases reward messy data integration.
- They benefit from handcrafted risk heuristics before any sophisticated AI.
- They fit underserved Vietnam segments that are invisible to generic global products.
- They create a durable data asset once deployed.

### Second-Best Cluster: Merchant and Payment Orchestration

The second-best cluster is **SB3 + SB7**.

- These are strong because Vietnam's payment behavior is local and operationally fragmented.
- The cleverness is in transaction-moment orchestration, not in model quality.
- They demo well because the integration becomes visible on screen.

### Third-Best Cluster: Compliance / Fraud Workflows

The third-best cluster is **SS5 + SL3 + SF2**.

- These benefit from bespoke rules and analyst-assist flows.
- They are credible because explainability matters more than model magic.
- They are less flashy than lending or payments, but still defensible.

---

## Use Cases To De-Prioritize If The Goal Is Hacker Advantage

These are less attractive because the main value is too close to commodity AI or generic enterprise software:

- **SB5, SF9, SS3:** chat/summarization on top of existing data.
- **SF10:** speech-to-text alone is not enough of a moat.
- **SS1:** vibe coding shows tool use, not business ingenuity.
- **SB10:** forecasting branch traffic is technically valid but not strategically distinctive.
- **SB8:** voice biometrics depends too much on model performance and specialized security infra.

---

## Recommended Positioning For Judges

Do not say: **"We built an AI app for banking."**

Say instead:

1. **We built a new data asset** from operational exhaust that Shinhan does not currently use well.
2. **We encoded local risk/merchant/workflow logic** that generic vendors will not customize.
3. **We used AI as the last 20%, not the first 80%.** The real moat is integration + heuristics + local distribution.

That framing makes the team look like builders of bank capability, not just consumers of an API.

---

## Known (model knowledge, unverified)

- Large AI vendors usually commoditize model access faster than they commoditize local data pipelines, regulatory workflows, and country-specific integrations.
- In financial services, durable advantage often comes from proprietary distribution, underwriting logic, and embedded workflow placement rather than from base-model quality alone.
- Vietnam is widely associated with strong QR/payment adoption, a large SME base, and meaningful informal or thin-file segments, which makes alternative-data and workflow-led solutions strategically plausible.

## Uncertain / needs verification

- Which exact Shinhan internal systems, data feeds, and external partnerships are realistically accessible during or after the hackathon.
- Whether POS, payroll, marketplace, e-wallet, or open-banking data can be accessed through actual APIs versus mocked integrations.
- The exact regulatory boundaries in Vietnam for production deployment of BNPL, alternative credit scoring, salary-linked lending, and eKYC-related automation.
- The repo's business estimates for market size, approval uplift, fraud reduction, or pilot KPIs should be treated as internal working assumptions unless independently verified.
