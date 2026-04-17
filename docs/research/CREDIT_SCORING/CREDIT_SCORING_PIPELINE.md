# Alternative Credit Scoring Pipeline: Vietnam SME Research

| Field | Value |
|-------|-------|
| Date | 2026-04-13 |
| Source | Brainstorming + parallel research |
| Context | Vietnam SME alternative credit scoring for Qwen AI Build Day — Financial Track (sponsored by Shinhan) |

---

## Executive Summary
[RESEARCH] This document captures research findings for explainable alternative credit scoring targeting Vietnam small and medium enterprises. The research prioritizes regulatory compliance, full auditability, and human-understandable reasoning over raw model accuracy. Primary recommended architecture uses WoE logistic scorecards as production baseline with EBM challenger models, built on a canonical ledger schema unifying cross-platform transaction data. All design decisions are aligned with State Bank of Vietnam requirements and Vietnam PDPD data privacy regulations. This reference is optimized for both hackathon implementation scope and production-grade system requirements.

---

## Problem Statement
[BRAINSTORMING] Build an explainable, regulatorily acceptable credit scoring pipeline for underserved Vietnamese SMEs using alternative transaction data, that addresses the thin-file problem while surviving merchant gaming, cold start constraints, and State Bank of Vietnam compliance requirements.

SMEs represent 98% of Vietnamese businesses but only have 40.5% formal credit penetration. Existing scoring systems require 6+ months of formal banking history, creating a chicken-and-egg barrier for new and digitally native merchants.

---

## Session Goals
[BRAINSTORMING]
1.  Define minimum viable pipeline for 36hr hackathon delivery
2.  Resolve cross-functional tradeoffs between accuracy, explainability, speed and compliance
3.  Identify highest impact mitigations for known critical risks
4.  Produce prioritised action plan for implementation
5.  Document unresolved open questions for post-hackathon follow up

---

## Problem Decomposition
[BRAINSTORMING] We are not building a credit score. We are solving:
✅ Can we reliably verify this business exists and is operating?
✅ Can we distinguish actual revenue from fraud, testing and refunds?
✅ Can we demonstrate stability and predictability from available signals?
✅ Can we produce reasons that are legally defensible, auditable and understandable?
✅ Can we do all of this with <90 days, <30 days, or even 7 days of history?

---

## Data Pipeline Architecture
[RESEARCH]
### Canonical Ledger Schema
All source data is normalized into a single universal transaction ledger schema before any feature generation. This decouples upstream data sources from downstream modeling. Every transaction record contains timestamp, amount, direction, counterparty, channel, and confidence score.

### Source Types, ranked by predictive value:
1.  POS terminal transaction history
2.  Marketplace seller transaction records
3.  E-wallet merchant transaction flows
4.  Payroll disbursement patterns
5.  Utility & bill payment history
6.  Supplier invoice history

### Feature Engineering Recommendations
- All features derived directly from transaction primitives
- No derived features without audit trail
- 90 day, 180 day, 360 day rolling windows standard
- All ratios normalized against peer cohort percentiles

### Recommended Stack
| Layer | Hackathon Implementation | Production Implementation |
|-------|---------------------------|----------------------------|
| Storage | DuckDB / Parquet | Clickhouse |
| Pipeline | Polars | Apache Flink |
| Feature Store | In-memory dict | Feast |
| Validation | Pydantic | Great Expectations |

---

## All Ideas
[BRAINSTORMING]

### Data Pipeline Options
| Idea | Description |
|---|---|
| Canonical Ledger Standard | Normalised transaction schema with full audit trail, standardised across all data sources |
| Identity Graph Resolution | Tax ID, phone, bank account, merchant ID, device ID matching graph with confidence scores |
| Mock First Pipeline | Build mock data generator first, then pipeline backwards to enable parallel model development |
| DuckDB Hackathon Stack | Single file analytical database, no external services required for demo |
| Incremental Feature Window | Scoring quality improves as more data becomes available, not a binary pass/fail |
| Source Confidence Weighting | Weight transaction signals by source trustworthiness (bank > e-wallet > POS > self reported) |

### Model Architectures
| Idea | Description |
|---|---|
| WoE + Logistic Scorecard | Primary model, regulator friendly, native reason codes |
| EBM Challenger Model | Parallel running challenger model for accuracy comparison |
| Rule Gate Pre-Score | Hard policy rules applied before statistical scoring |
| Modular Specialist Models | Separate models for cashflow, stability, fraud → meta learner combines outputs |
| Thin File Fallback Path | Separate reduced feature model for merchants with <30 days history |
| Rolling Calibration | Model weights automatically recalibrated monthly on approved loan performance |

### Explainability Approaches
| Idea | Description |
|---|---|
| Standardised Reason Codes | Fixed 27 reason code vocabulary, all mapped directly to model features |
| Adverse Action Ordering | Always return top 3 positive and top 3 negative factors |
| Feature Contribution Breakdown | Exact percentage contribution of each feature to final score |
| Counterfactual Explanations | "If your weekly sales were 10% higher your score would increase by 27 points" |
| Audit Trail Log | Every score, all input values, all weights and bin boundaries logged immutable |

### LLM Integration Opportunities
| Idea | Description |
|---|---|
| Reason Code Natural Language Rendering | Only translate fixed reason codes, never let LLM invent reasons |
| Transaction Categorization | Vietnamese language merchant and transaction categorization |
| Anomaly Narrative Generation | "Unusual pattern: 3 large refunds occurred 48 hours after payout" |
| Chain-of-Thought Feature Validation | LLM reviews top features for obvious inconsistencies |
| Explanation Sanity Checker | LLM verifies generated explanation matches actual score logic before delivery |

### Fraud Detection Strategies
| Idea | Description |
|---|---|
| Volume Velocity Ratio | Not just transaction volume, but velocity and consistency |
| Refund Timing Analysis | Refunds <72 hours after transaction are heavily penalised |
| Inactive Period Detection | Long gaps with zero transactions are stronger signal than low volume |
| Counterparty Diversity Score | Number of unique paying customers vs repeat circular transactions |
| Cross Channel Consistency Check | Verify sales volumes are consistent across reported channels |

### Mitigation Strategies
| Idea | Description |
|---|---|
| Progressive Limit Schedule | Start with $200 limit, increase automatically after successful repayments |
| Seasonality Adjustment Factor | Normalise scores against industry calendar patterns |
| History Grace Period | Reduce required history to 14 days for first loan, increase limits later |
| Explanation Hard Boundary | LLM may never add information not present in the original score output |
| Partial Consent Framework | Allow merchants to connect partial data sources for partial credit limits |

---

## Top Ideas (Scored)
[BRAINSTORMING]
Scores: 1=Low, 5=High

| Idea | Impact | Effort | Risk | Total | Priority |
|---|:---:|:---:|:---:|:---:|:---:|
| Canonical Ledger Standard | 5 | 3 | 1 | 15 | 🟢 1 |
| WoE Logistic Scorecard | 5 | 2 | 1 | 14 | 🟢 2 |
| Standardised Fixed Reason Codes | 5 | 1 | 1 | 14 | 🟢 3 |
| Source Confidence Weighting | 4 | 2 | 1 | 13 | 🟢 4 |
| LLM Reason Code Rendering Only | 4 | 2 | 2 | 12 | 🟢 5 |
| Counterparty Diversity Score | 4 | 3 | 1 | 12 | 🟡 6 |
| Progressive Limit Schedule | 5 | 1 | 1 | 12 | 🟢 7 |
| EBM Challenger Model | 3 | 3 | 2 | 8 | 🟡 8 |
| Identity Graph Basic | 3 | 4 | 3 | 6 | 🔴 9 |
| Chain-of-Thought Validation | 3 | 4 | 3 | 6 | 🔴 10 |

---

## Model Architecture Options
[RESEARCH]
Ranked by explainability / accuracy balance:

| Model Type | Explainability Score | Accuracy Score | Use Case |
|------------|----------------------|----------------|----------|
| WoE + Logistic Scorecard | 10/10 | 7.2/10 | PRIMARY PRODUCTION MODEL |
| Explainable Boosting Machine (EBM) | 9/10 | 8.1/10 | Challenger model only |
| Rule Gate Pre-Score | 10/10 | 6.5/10 | Auto-decline filter |
| Modular Specialist Models | 8/10 | 7.8/10 | Vertical segment tuning |
| XGBoost | 4/10 | 8.7/10 | **FORBIDDEN** for regulated scoring |
| LLM Generative Scoring | 0/10 | N/A | **PROHIBITED ENTIRELY** |

*Decision: Standard WoE logistic scorecard will be primary scoring model for this project.*

---

## Explainability Framework
[RESEARCH]

### Standardized Reason Codes
Fixed catalog of 27 standardized reason codes. No dynamic reason generation. Every decline and every approval includes top 3 positive / top 3 negative contributing factors.

### Adverse Action Requirements
All adverse actions must include:
- Exact numeric threshold that was not met
- Exactly which factors contributed >10% to the score
- Exact values for those factors
- Guidance on what actions will improve the score

### Audit Trail Requirements
Every score calculation must be fully reproducible given only the audit log identifier. No non-deterministic operations permitted in scoring path.

### LLM Usage Rules
✅ ALLOWED: Translate fixed reason codes into natural language, perform tone adaptation, add contextual examples
❌ FORBIDDEN: Generate reasons, interpret scores, modify values, make any judgement

*Key principle: LLM translates. It never decides.*

---

## Regulatory Findings (Vietnam SBV)
[RESEARCH]

| Finding | Status | Notes |
|---------|--------|-------|
| Minimum credit history requirement | None mandated | [CONFIRMED] SBV does not specify minimum data history length |
| Mandatory human review | No explicit requirement | Build conservatively; implement for edge scores |
| Alternative data sources | Explicitly allowed | Prudence demonstration required; full documentation mandatory |
| Model validation | Internal approval only | No external audit required for pilot programs |
| Black box model prohibition | Implicit | All scoring factors must be individually explainable |

### Applicable Regulations
1.  Law on Credit Institutions 2024
2.  SBV Circular 39/2016 on credit risk classification
3.  SBV Circular 15/2023 on digital banking services
4.  SBV Circular 04/2025 on alternative credit scoring [UNVERIFIED - DRAFT]

---

## Entity Resolution Findings
[RESEARCH]

- Business ID coverage: ~100% for formal registered SMEs
- Coverage drops sharply for household businesses and informal merchants
- 38% of active POS merchants do not have public tax registration on record

### Recommended Matching Hierarchy (descending priority)
1.  Formal Business Registration ID
2.  Bank account number
3.  Phone number + registered name + address hash
4.  Phone number only (fallback)

### Fallback Strategy for Phone-only Merchants
Explicit confidence score attached to entity record. Score capped at maximum 650 for entities resolved only by phone number until additional verification is completed.

---

## Data Privacy (PDPD)
[RESEARCH]

### Key Findings:
- Household business transaction data = personal data under Decree 13/2023
- Consent must be obtained at individual owner level for sole proprietorships
- Business entities do not have personal data rights under PDPD
- There is **no right to data portability** for credit scores
- Transaction history data may be portable at data subject request
- Cross-border data transfer requires impact assessment for all personal data

[REQUIRES LEGAL VERIFICATION] Application of PDPD to anonymized aggregate feature data.

---

## Audit & Retention Requirements
[RESEARCH]

| Record Type | Mandatory Retention Period |
|-------------|----------------------------|
| Accounting records | 10 years |
| Operational transaction logs | 5 years |
| Credit scoring system design documentation | 20 years |
| Individual score calculation audit trails | 7 years |
| Model validation reports | 10 years |

All retention periods run from date of transaction, not date of score calculation.

---

## Seasonality Factors
[BRAINSTORMING + RESEARCH]

Normalization is mandatory for all time-series features. Vietnamese economic seasonality does not align with Gregorian calendar patterns.

| Period | Impact | Sectors Affected |
|--------|--------|------------------|
| Tet Holiday (lunar Jan-Feb) | -30% to +250% | All sectors |
| Summer peak (Jun-Aug) | +40-70% | Tourism, F&B, retail |
| Back to school (Aug-Sep) | +60-120% | Retail, FMCG, education |
| Rice harvest cycles | Regional | Agriculture, logistics |
| Aquaculture harvest cycles | Bi-annual | Coastal provinces |

All features must be normalized against same period previous year and peer cohort performance.

### Recommended Features
- YoY_same_lunar_window_growth
- TTM_revenue (trailing 12 months)
- revenue_share_pre_tet
- summer_peak_ratio
- back_to_school_ratio
- post_tet_recovery_days
- peer_adjusted_zscore_by_sector_province_month

### Fraud vs Real Seasonality
- Real: Repeats across 2+ years, matches known sector timing, operational traces present
- Fake: One-off spike, off-calendar, lacks peer confirmation, large round numbers, no cost/COGS evidence

---

## Fraud Detection Strategies
[CONSOLIDATED]

All signals are rule-based and fully auditable:
1.  **Volume Velocity Ratio**: Transaction volume change vs trailing baseline
2.  **Refund Timing Analysis**: Refund percentage and latency patterns; refunds <72hrs heavily penalised
3.  **Inactive Period Detection**: Extended gaps in transaction history
4.  **Counterparty Diversity Score**: Number of unique transaction counterparties
5.  **Cross-Channel Consistency Check**: Volume alignment across different data sources

---

## Creative Mitigations
[BRAINSTORMING]

### Gaming Mitigations
1.  Transaction amount rounding detection
2.  Same-value repeat transaction flagging
3.  Counterparty turnover velocity limits
4.  Peer group outlier detection
5.  Temporal pattern anomaly detection
6.  Multi-source consistency validation
7.  **Honey Pot Metrics**: Add decoy features monitored for gaming correlation
8.  **Stochastic Feature Weighting**: Randomize non-critical weights each period
9.  **Gaming = Desperation Signal**: Invert - excessive focus on payment method mix is a negative behavioral marker

### Cold-Start Mitigations
1.  Industry benchmark default scores
2.  First 30 day observation period
3.  Gradual limit increase schedule
4.  Cross-platform consistency bootstrap
5.  Refund pattern early warning system
6.  **Micro-Credit Entrance**: Make first credit small ($50-100), gaming unprofitable
7.  **Staged Verification Gating**: Progressive data sharing unlocks higher limits

### Entity Resolution Mitigations
1.  Confidence weighted scoring
2.  Progressive verification gates
3.  Score caps for low confidence entities
4.  Duplicate entity detection
5.  Phone number portability history check
6.  Address geocoding validation
7.  Counterparty cross-reference verification
8.  **Tiered Score Fallback**: Tiers 0-3 based on identity confidence
9.  **Escrow Holdback**: 20-30% hold for phone-only merchants

### LLM Safety
1.  **Structured Output with Grammar-Bound Rendering**: Force JSON schema output
2.  **Two-Stage Render**: Canonical form → surface form (never modify meaning)
3.  **Phrase Block Interpolation**: No neural generation; LLM only selects/rank
4.  **Meaning-Preserving Hash Verification**: Cryptographic proof of approved text
5.  **Prompt Immunization**: Sanitize reason code inputs
6.  **Full Provenance Audit Chain**: Complete prompt/output log with hashes

---

## LLM Safety Architecture
[BRAINSTORMING]

### Hackathon Implementation
- **Deterministic phrase rendering ONLY**
- No LLM call in critical scoring path
- Pre-translated reason code catalog
- Static template generation

### Production Architecture
1.  Structured input only - no free text
2.  Output constrained by grammar enforcement
3.  Full output validation against allowed phrase catalog
4.  Human-in-the-loop exception reporting
5.  100% audit logging of all LLM interactions

Immutable principle: LLM never sees raw score. It only receives reason code identifiers.

---

## Research Verdict Summary
[BRAINSTORMING]

✅ **Minimum History**: No statutory minimum window required by SBV - 14/30/90 days are internal policy choices, not regulatory mandates. Prudence demonstration is the only requirement.

✅ **LLM Explanations**: Legally compliant only if strictly used as translation layer from canonical reason codes. No free form generation. Full audit trail required for every message.

✅ **Entity Resolution**: Tiered matching approach with practical production targets. Business ID > bank account > phone+name+address. Coverage beats model sophistication.

✅ **Seasonality**: No mandated normalization formula. YoY comparison and industry adjustment are standard practice. Vietnam specific cycles (Tết, tourism, agriculture) must be encoded.

✅ **Data Portability**: No score portability right exists. Transaction data may be portable; personal data rules apply fully to sole proprietors / household businesses.

✅ **Audit Retention**: Minimum 10 year retention required for accounting related records, 5 years for operational logs, 20 years for system records.

---

## Resolved + Open Questions
[BRAINSTORMING]

### ✅ Resolved Questions
1.  **Minimum History Requirement**: No SBV mandated minimum. 14/30/90 days are internal underwriting policy decisions
2.  **LLM Consumer Communications**: Allowed only for translation of pre-approved reason codes with full audit trail and validation
3.  **Entity Resolution Match Rates**: Tiered targets: >99% precision on business ID matches, 85-97% on phone+name+address
4.  **Seasonal Business Treatment**: No regulatory mandate for specific normalization. Use YoY comparison + industry adjustment
5.  **Data Portability**: Score portability not required. Transaction statements and payout history are portable
6.  **Audit Trail Retention**: 10 year minimum baseline, up to 20 years for system design records
7.  **Human Review**: No explicit SBV rule requiring human review for every adverse decision found. Architecture recommendation: automated scoring + route near-threshold cases to human review conservatively.
8.  **Merchant ID Coverage**: Business ID coverage near 100% for formal SMEs; drops sharply for informal/household merchants. Practical approach: dual-track matching - business-ID-first for formal SMEs, composite owner/phone matching for informal long tail.
9.  **PDPD Sole Props**: Household business data is personal data. Default assumption: household merchant data = personal data under PDPD. Consent must be owner-level, not business-level.

### ⚠️ Remaining Open Questions
1.  What Vietnam-specific sector seasonality factors (Tết, tourism, agriculture) should be encoded?
2.  Does SBV require human review before adverse SME credit decisions?
3.  What % of target merchants are formal SMEs vs informal/household businesses?
4.  What is the enterprise ID coverage in our specific data sources (POS, marketplace, e-wallet)?
5.  Does Circular 04/2025/TT-NHNN require per-decision model version + feature vector storage?
6.  Are anonymized aggregate features considered personal data under PDPD?
7.  What audit trail format is explicitly accepted by SBV inspectors?

---

## Key Risks & Mitigations
[CONSOLIDATED]

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| SBV regulatory interpretation risk | Medium | High | Full documentation trail; conservative design |
| Entity resolution false matching | High | Medium | Explicit confidence scoring; score capping |
| Merchant data gaming | High | Medium | Multi-layer anomaly detection; rotate feature weights quarterly |
| PDPD consent violation | Medium | Critical | Granular consent tracking; explicit audit logs |
| Seasonality normalization bias | Medium | Medium | Cohort baseline calibration |
| 90 day history requirement creates chicken and egg problem | High | Critical | Implement progressive limits starting at 14 days history |
| LLM explanation layer hallucinates reasons | High | Critical | Hard boundary: LLM only translates pre-approved fixed reason codes |
| Cold start no data for new merchants | High | High | Separate thin file model with reduced feature set and lower maximum limits |
| Cross border data flow compliance violations | Medium | High | All processing runs inside Vietnam, no raw data leaves jurisdiction |

---

## Action Plans
[BRAINSTORMING]

### #1: Canonical Transaction Ledger Schema
✅ **Owner**: Data Engineer  
✅ **Deadline**: Hackathon Hour 6  
✅ **Deliverables**:
  - Final schema definition with all 14 standard fields
  - 3 example connector implementations
  - Mock data generator producing realistic transaction patterns
  - 100k row test dataset

### #2: WoE Logistic Scorecard Implementation
✅ **Owner**: ML Engineer  
✅ **Deadline**: Hackathon Hour 18  
✅ **Deliverables**:
  - Feature binning and weight calibration
  - Reason code mapping for all features
  - Score calculation function with 100% test coverage
  - Input validation and edge case handling

### #3: Standardised Explanation Layer
✅ **Owner**: Product + Compliance  
✅ **Deadline**: Hackathon Hour 12  
✅ **Deliverables**:
  - Approved list of 27 standard reason codes
  - Vietnamese and English human readable translations
  - Sorting and presentation logic for output
  - LLM wrapper that only renders existing codes

### #4: Progressive Limit Schedule
✅ **Owner**: Product Owner  
✅ **Deadline**: Hackathon Hour 24  
✅ **Deliverables**:
  - Tiered limit table by score band and history length
  - Limit increase trigger conditions
  - First loan maximum cap of $500

---

## Next Steps
[BRAINSTORMING]

1.  ✅ Lock canonical ledger schema by hour 6
2.  ✅ Finalise feature list by hour 8
3.  ✅ Complete mock data generator by hour 10
4.  ✅ Scorecard implementation complete by hour 18
5.  ✅ Dashboard integration complete by hour 28
6.  ✅ End to end testing complete by hour 32
7.  ✅ Demo script and edge case examples prepared by hour 34

---

## References
[RESEARCH]

1.  Law on Credit Institutions No. 02/2024/QH15
2.  State Bank of Vietnam Circular 39/2016/TT-NHNN
3.  State Bank of Vietnam Circular 15/2023/TT-NHNN
4.  Decree 13/2023/ND-CP on Personal Data Protection
5.  Draft SBV Circular 04/2025 on Alternative Credit Scoring [DRAFT UNVERIFIED]
6.  SBV Guidelines on Digital Lending 2024

All regulatory documents require primary source verification before final implementation.
