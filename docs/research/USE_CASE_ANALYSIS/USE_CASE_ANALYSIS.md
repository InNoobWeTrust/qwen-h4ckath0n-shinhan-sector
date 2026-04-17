# Use Case Analysis: Qwen AI Build Day — Financial Track (sponsored by Shinhan)

**Document Version:** 2.0  
**Date:** April 11-13, 2026  
**Scope:** Shinhan Bank, Shinhan Finance, Shinhan Securities, Shinhan Life Vietnam  
**Context:** Hackathon Prize + Job Contract Optimization  
**Artifacts:** Consolidated from brainstorming and research sessions

---

## Executive Summary

This analysis evaluates 32 official use cases for the Qwen AI Build Day — Financial Track (sponsored by Shinhan) across dual objectives: winning the top prize and securing long-term job contracts.

### Key Decision: Highest Odds Use Cases

> **If the goal is to win with actual hacker advantage rather than model theater:**
> 1.  🥇 **SB9 - AI-Driven SME Credit Scoring via POS Data** - Best pure hacker advantage play
> 2.  🥈 **SF12 - MicroBiz Loan for Digital Economy** - Best data-fusion moat play
> 3.  🥉 **SF11 - Earned Wage Access & Salary-Linked Lending** - Best lower-risk alternative

> **If balancing both hackathon demo impact and strategic business value:**
> - **Primary Build:** SB6 (Embedded Installment & BNPL) - Best overall balance
> - **Strategic Narrative:** SF12 (MicroBiz Loan) - Shows long-term vision
> - **Backup Demo:** SB4 (AI Call Bot) - Highest demo impressiveness

The strongest opportunities are not wrapped model UIs - they are use cases where value comes from data plumbing, local heuristics, and last-mile integration work that large vendors cannot copy quickly.

[SOURCE: HACKER_ADVANTAGE_RESEARCH.md, TRUE_HACKER_ADVANTAGE.md]

---

## All 32 Use Cases Overview

### Shinhan Bank (SB1-SB10)
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

### Shinhan Finance (SF1-SF12)
Focus areas: Document processing automation (IDP), fraud detection, eKYC enhancement, AI-based CRM, Open Banking credit scoring, BNPL partnerships, cybersecurity, customer behavior prediction, voice-to-text, earned wage access, micro-loans for digital economy sellers.

### Shinhan Securities (SS1-SS6)
Focus areas: AI POC/vibe coding, gamified investment experience, content generation, accounting automation, RegTech/AML, digital assets/tokenized securities.

### Shinhan Life (SL1-SL4)
Focus areas: BI platform, voice AI verification for UL product compliance, claims fraud detection, digital health ecosystem.

[SOURCE: HACKATHON_RESEARCH.md]

---

## Use Case Scoring Methodology

Scores are calculated on a 1-10 scale with weighted criteria optimized for both hackathon success and long-term business value:

| Category | Weight | Rationale |
|----------|--------|-----------|
| **Business Value** | 45% | Primary job contract driver |
| **Implementation** | 28% | Feasibility for production deployment |
| **Hackathon Performance** | 27% | Primary prize driver |

### Business Value Criteria
| ID | Criterion | Weight |
|----|-----------|--------|
| BV1 | Revenue Potential | 15% |
| BV2 | Speed to Revenue | 10% |
| BV3 | Competitive Moat | 10% |
| BV4 | Scalability Ceiling | 10% |

### Implementation Criteria
| ID | Criterion | Weight |
|----|-----------|--------|
| IM1 | Implementation Cost | 10% |
| IM2 | Risk Profile | 10% |
| IM3 | Data Dependency | 8% |

### Hackathon Performance Criteria
| ID | Criterion | Weight |
|----|-----------|--------|
| HP1 | Demo Impact | 12% |
| HP2 | Tech Complexity | 7% |
| HP3 | Qwen Alignment | 8% |

### Strategic Fit Criteria
| ID | Criterion | Weight |
|----|-----------|--------|
| SF1 | Strategic Defensibility | 5% |
| SF2 | Cross-sell Potential | 5% |

**Total Weight:** 100%  
[SOURCE: USE_CASE_ANALYSIS.md]

---

## Detailed Use Case Analysis

This section contains complete scored analysis for all 32 use cases. Scores are calculated using the methodology above.

### 2.1 SHINHAN BANK USE CASES

#### SB1: AI Personal Financial Coach
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 7 | Cross-sell engine can drive significant NPS; but hard to monetize directly |
| Speed to Revenue | 4 | Requires app integration, behavior change, data pipeline; 6-9 months |
| Competitive Moat | 6 | AI model + spending data creates personalization moat over time |
| Scalability Ceiling | 8 | Vietnam 100M population, high smartphone penetration |
| Implementation Cost | 5 | Needs transaction categorization ML, recommendation engine, app changes |
| Risk Profile | 3 | Low regulatory risk; moderate data privacy risk |
| Data Dependency | 6 | Requires transaction data, categorized spending patterns |
| Demo Impact | 6 | Good demo potential - show AI analyzing spending, giving advice |
| Tech Complexity | 6 | Moderate - needs NLU, recommendation system, personalization |
| Qwen Alignment | 8 | Qwen excels at conversation, analysis, recommendations |
| Strategic Defensibility | 7 | High - creates app stickiness, data advantage |
| Cross-sell Potential | 9 | Excellent - recommendations naturally lead to product offers |

**Weighted Total: 6.3/10**

---

#### SB2: AI-Powered Customer Engagement Automation
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 6 | Efficiency gains + conversion improvement; hard to isolate revenue |
| Speed to Revenue | 7 | Can deploy quickly via existing channels; 3-4 months |
| Competitive Moat | 5 | Generic technology; competitors can replicate |
| Scalability Ceiling | 7 | Scales to all customer communications |
| Implementation Cost | 7 | Leverages existing push/email infrastructure |
| Risk Profile | 4 | Low risk - internal automation |
| Data Dependency | 5 | Needs customer behavior data, event triggers |
| Demo Impact | 7 | Very demoable - show real-time triggered communications |
| Tech Complexity | 5 | Moderate - event-driven architecture, templating |
| Qwen Alignment | 7 | Qwen can generate personalized content |
| Strategic Defensibility | 5 | Table stakes digital banking capability |
| Cross-sell Potential | 6 | Good for cross-sell campaigns |

**Weighted Total: 5.9/10**

---

#### SB3: AI-Powered Loyalty & Personalized Offers
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 7 | Merchant partnerships, increased transaction volume, data |
| Speed to Revenue | 6 | 4-6 months to build merchant network |
| Competitive Moat | 7 | Network effects - more merchants = more value |
| Scalability Ceiling | 8 | Vietnam retail market is massive |
| Implementation Cost | 4 | Complex - needs merchant onboarding, QR infrastructure |
| Risk Profile | 5 | Moderate - merchant relationships, partner risk |
| Data Dependency | 6 | Needs location data, transaction data, merchant data |
| Demo Impact | 8 | Excellent demo - scan QR, get personalized offer instantly |
| Tech Complexity | 6 | Moderate - QR, geolocation, recommendation engine |
| Qwen Alignment | 7 | Qwen can personalize offers with context |
| Strategic Defensibility | 8 | Ecosystem lock-in - merchants + customers |
| Cross-sell Potential | 8 | Natural vehicle for cross-selling |

**Weighted Total: 6.6/10**

---

#### SB4: AI Call Bot for Collections & Sales
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 8 | Direct cost reduction + improved recovery rates |
| Speed to Revenue | 8 | 2-3 months for basic version; immediate ROI |
| Competitive Moat | 6 | Vietnamese language + finance domain = barriers |
| Scalability Ceiling | 7 | All collection calls, all products |
| Implementation Cost | 8 | Leverage existing call infrastructure |
| Risk Profile | 5 | Moderate - customer experience risk, voice synthesis quality |
| Data Dependency | 5 | Needs call scripts, customer history, product info |
| Demo Impact | 9 | Highly impressive - live voice conversation demo |
| Tech Complexity | 5 | Moderate - voice synthesis, NLU, dialog management |
| Qwen Alignment | 9 | Qwen has strong voice/ASR/TTS capabilities |
| Strategic Defensibility | 7 | Operational efficiency gain is strategic |
| Cross-sell Potential | 5 | Sales calls can cross-sell but less natural |

**Weighted Total: 6.9/10**

---

#### SB5: AI for Internal Reporting & BI Automation
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 3 | Cost reduction, not revenue generation |
| Speed to Revenue | 6 | 3-4 months; internal efficiency |
| Competitive Moat | 4 | Generic BI automation; easy to replicate |
| Scalability Ceiling | 5 | Limited to internal users |
| Implementation Cost | 6 | Needs data warehouse integration, query layer |
| Risk Profile | 3 | Very low risk - internal tool |
| Data Dependency | 7 | Heavy - needs all data sources connected |
| Demo Impact | 4 | Not exciting - "ask BI question, get answer" |
| Tech Complexity | 6 | Moderate - natural language to SQL/generation |
| Qwen Alignment | 8 | Qwen excellent at query generation |
| Strategic Defensibility | 4 | Nice to have, not strategic differentiator |
| Cross-sell Potential | 2 | No cross-sell value |

**Weighted Total: 4.8/10** ⚠️ LOW PRIORITY

---

#### SB6: Embedded Installment & BNPL
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 9 | Merchant fees + interest income + late fees |
| Speed to Revenue | 7 | 4-6 months to integration; faster if mock |
| Competitive Moat | 5 | Competitive space - GrabPay, MoMo, etc. |
| Scalability Ceiling | 9 | Vietnam e-commerce GMV $25-30B |
| Implementation Cost | 5 | Complex - checkout integration, credit decisioning |
| Risk Profile | 6 | Moderate - credit risk, regulatory BNPL rules |
| Data Dependency | 6 | Needs credit bureau, transaction history |
| Demo Impact | 9 | Excellent - show instant approval at checkout |
| Tech Complexity | 6 | Moderate - instant decisioning, integration |
| Qwen Alignment | 8 | Qwen for credit decisioning, fraud detection |
| Strategic Defensibility | 7 | Ecosystem play - checkout + banking |
| Cross-sell Potential | 9 | Checkout moment = highest intent |

**Weighted Total: 7.4/10** 🥇 TOP TIER

---

#### SB7: SoftPOS for SOHO & Micro Businesses
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 7 | Transaction fees + account relationships + lending |
| Speed to Revenue | 6 | 4-6 months for NFC payment processing |
| Competitive Moat | 6 | First-mover advantage in Shinhan ecosystem |
| Scalability Ceiling | 7 | Millions of SOHO businesses in Vietnam |
| Implementation Cost | 6 | Moderate - NFC SDK, merchant onboarding |
| Risk Profile | 5 | Moderate - fraud risk, merchant defaults |
| Data Dependency | 6 | Needs transaction data, merchant performance |
| Demo Impact | 8 | Very impressive - tap phone, payment accepted |
| Tech Complexity | 7 | Moderate-high - NFC, payment processing, security |
| Qwen Alignment | 6 | Less directly applicable; more infrastructure |
| Strategic Defensibility | 8 | Captures SME ecosystem, prevents competitor capture |
| Cross-sell Potential | 9 | Payment flow → lending, insurance, payroll |

**Weighted Total: 6.7/10**

---

#### SB8: AI Voice Biometrics for Fraud Prevention
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 6 | Fraud loss prevention; hard to quantify as revenue |
| Speed to Revenue | 5 | 5-6 months; needs enrollment infrastructure |
| Competitive Moat | 8 | Strong moat - voiceprint is hard to replicate |
| Scalability Ceiling | 7 | All voice interactions, all customers |
| Implementation Cost | 4 | Expensive - voice enrollment, verification infrastructure |
| Risk Profile | 7 | High value but risky - false positives hurt UX |
| Data Dependency | 7 | Needs voice enrollment database |
| Demo Impact | 7 | Good - show voice match vs spoof |
| Tech Complexity | 8 | High - voiceprint matching, anti-spoofing |
| Qwen Alignment | 7 | Qwen has voice capabilities |
| Strategic Defensibility | 9 | Major fraud prevention differentiator |
| Cross-sell Potential | 3 | Fraud prevention doesn't enable cross-sell |

**Weighted Total: 6.4/10**

---

#### SB9: AI-Driven SME Credit Scoring via POS Data
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 9 | Massive underserved market; high loan volumes |
| Speed to Revenue | 4 | 6-9 months; needs POS partnerships + model training |
| Competitive Moat | 8 | Proprietary POS data + model = strong moat |
| Scalability Ceiling | 9 | Vietnam SME credit gap $10-15B |
| Implementation Cost | 4 | High - POS integration, model development |
| Risk Profile | 6 | Moderate - credit risk on thin-file borrowers |
| Data Dependency | 8 | Heavy - needs real-time POS transaction data |
| Demo Impact | 6 | Moderate - show score updating with transactions |
| Tech Complexity | 7 | High - ML model, real-time data pipeline |
| Qwen Alignment | 7 | Qwen can power credit decisioning |
| Strategic Defensibility | 9 | Captures SME segment others can't serve |
| Cross-sell Potential | 9 | POS → payments → loans → full banking |

**Weighted Total: 7.1/10** 🥇 TOP TIER

---

#### SB10: AI-Powered Branch Traffic Prediction
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 3 | Cost reduction only; no revenue |
| Speed to Revenue | 5 | 4-5 months; internal tool |
| Competitive Moat | 3 | Generic ML forecasting; table stakes |
| Scalability Ceiling | 4 | Limited to branch network |
| Implementation Cost | 6 | Moderate - needs historical data, branch systems |
| Risk Profile | 2 | Very low risk |
| Data Dependency | 7 | Needs historical traffic, calendar, events |
| Demo Impact | 4 | Not exciting - "predicts wait times" |
| Tech Complexity | 5 | Moderate - time series forecasting |
| Qwen Alignment | 5 | Not a strong Qwen use case |
| Strategic Defensibility | 3 | Operational efficiency only |
| Cross-sell Potential | 1 | No cross-sell value |

**Weighted Total: 3.9/10** ⚠️ LOWEST PRIORITY

---

### 2.2 SHINHAN FINANCE USE CASES

#### SF1: Intelligent Document Processing (IDP)
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 5 | Cost reduction + faster processing; indirect revenue |
| Speed to Revenue | 8 | 2-3 months; immediate efficiency |
| Competitive Moat | 5 | OCR/IDP is commoditizing; domain tuning is moat |
| Scalability Ceiling | 6 | All loan applications, all document types |
| Implementation Cost | 7 | Low-moderate; cloud OCR services available |
| Risk Profile | 3 | Low risk - internal automation |
| Data Dependency | 5 | Needs document samples, labeled data |
| Demo Impact | 7 | Good - upload loan doc, instantly extract data |
| Tech Complexity | 6 | Moderate - OCR, NLP, entity extraction |
| Qwen Alignment | 8 | Qwen has strong document understanding |
| Strategic Defensibility | 5 | Table stakes for lending operations |
| Cross-sell Potential | 3 | Doesn't enable cross-sell |

**Weighted Total: 5.7/10**

---

#### SF2: Falsified Document Detection
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 5 | Fraud prevention; cost avoidance |
| Speed to Revenue | 7 | 3-4 months; can layer on existing IDP |
| Competitive Moat | 7 | Specialized AI for forged docs = strong moat |
| Scalability Ceiling | 6 | All loan applications |
| Implementation Cost | 5 | Moderate - needs forensic image analysis |
| Risk Profile | 6 | Moderate - missing fraud = credit loss |
| Data Dependency | 6 | Needs forged doc样本 for training |
| Demo Impact | 7 | Good - show real vs forged detection |
| Tech Complexity | 8 | High - image forensics, anomaly detection |
| Qwen Alignment | 7 | Qwen has vision capabilities |
| Strategic Defensibility | 7 | Fraud prevention is strategic |
| Cross-sell Potential | 2 | No cross-sell value |

**Weighted Total: 6.1/10**

---

#### SF3: Video Call Enhancement with eKYC
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 7 | Enables digital onboarding; reduces branch costs |
| Speed to Revenue | 7 | 4-5 months; critical capability |
| Competitive Moat | 7 | Deepfake detection + liveness = strong moat |
| Scalability Ceiling | 8 | All digital onboarding, all products |
| Implementation Cost | 5 | Moderate - video processing infrastructure |
| Risk Profile | 8 | High risk but high value - identity fraud |
| Data Dependency | 6 | Needs face database, fraud pattern data |
| Demo Impact | 8 | Excellent - live deepfake detection demo |
| Tech Complexity | 9 | Very high - liveness, face match, deepfake |
| Qwen Alignment | 8 | Qwen has vision + face analysis |
| Strategic Defensibility | 8 | Critical digital onboarding capability |
| Cross-sell Potential | 4 | Enables products but doesn't cross-sell |

**Weighted Total: 6.9/10**

---

#### SF4: AI-based CRM
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 8 | Predictive analytics → up-sell/cross-sell/retention |
| Speed to Revenue | 6 | 4-6 months; needs data pipeline |
| Competitive Moat | 6 | Model + data = moat over time |
| Scalability Ceiling | 8 | All customers, all products |
| Implementation Cost | 5 | Moderate - CRM integration, model training |
| Risk Profile | 4 | Low - internal tool |
| Data Dependency | 7 | Heavy - needs all customer interaction data |
| Demo Impact | 6 | Moderate - show prediction dashboard |
| Tech Complexity | 6 | Moderate - prediction models, CRM integration |
| Qwen Alignment | 7 | Qwen can generate insights, recommendations |
| Strategic Defensibility | 7 | CRM intelligence is strategic |
| Cross-sell Potential | 10 | CRM directly enables cross-sell |

**Weighted Total: 6.8/10**

---

#### SF5: Open Banking API for AI Credit Scoring
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 8 | Alternative credit scoring → more approvals |
| Speed to Revenue | 5 | 5-6 months; depends on API ecosystem |
| Competitive Moat | 7 | Data partnerships + model = moat |
| Scalability Ceiling | 8 | All thin-file customers |
| Implementation Cost | 5 | Moderate - API integration, model training |
| Risk Profile | 6 | Moderate - data quality, regulatory |
| Data Dependency | 8 | Heavy - needs bank API access |
| Demo Impact | 6 | Moderate - show alternative score vs traditional |
| Tech Complexity | 7 | High - API integration, ensemble model |
| Qwen Alignment | 7 | Qwen can power scoring logic |
| Strategic Defensibility | 8 | Captures underserved segment |
| Cross-sell Potential | 7 | Alternative data → full banking relationship |

**Weighted Total: 6.8/10**

---

#### SF6: BNPL/Personal Loan Partnership
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 7 | Partnership fees + referral income |
| Speed to Revenue | 9 | 1-2 months - partnership model |
| Competitive Moat | 3 | Low - just a partnership |
| Scalability Ceiling | 7 | Leverage partner's tech + customers |
| Implementation Cost | 9 | Very low - referral/API integration only |
| Risk Profile | 5 | Moderate - partner risk, credit risk |
| Data Dependency | 4 | Low - depends on partner data |
| Demo Impact | 6 | Moderate - show partnership integration |
| Tech Complexity | 4 | Low - mostly API integration |
| Qwen Alignment | 6 | Qwen can enhance credit decisioning |
| Strategic Defensibility | 4 | Dependent on partner |
| Cross-sell Potential | 6 | Some referral cross-sell |

**Weighted Total: 5.8/10**

---

#### SF7: AI for ICT Cyber Security
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 4 | Cost reduction, risk avoidance |
| Speed to Revenue | 5 | 4-5 months; internal tool |
| Competitive Moat | 8 | Security IP + expertise = moat |
| Scalability Ceiling | 6 | Internal + potentially packaged |
| Implementation Cost | 4 | High - SIEM, threat intelligence infrastructure |
| Risk Profile | 8 | Very high - security breach = existential |
| Data Dependency | 8 | Heavy - logs, network traffic, threat intel |
| Demo Impact | 5 | Moderate - show threat detection |
| Tech Complexity | 9 | Very high - security domain expertise |
| Qwen Alignment | 7 | Qwen can analyze logs, detect anomalies |
| Strategic Defensibility | 9 | Critical infrastructure |
| Cross-sell Potential | 1 | No cross-sell value |

**Weighted Total: 6.2/10**

---

#### SF8: AI Customer Behavior Prediction
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 7 | Predict interests → targeted acquisition |
| Speed to Revenue | 5 | 5-6 months; needs multi-source data |
| Competitive Moat | 6 | Telco + social + wallet data = model moat |
| Scalability Ceiling | 8 | All potential customers |
| Implementation Cost | 4 | High - needs data partnerships |
| Risk Profile | 5 | Moderate - data privacy |
| Data Dependency | 9 | Very heavy - telco, social, e-wallet data |
| Demo Impact | 6 | Moderate - show prediction accuracy |
| Tech Complexity | 7 | High - multi-source data fusion |
| Qwen Alignment | 7 | Qwen can power prediction models |
| Strategic Defensibility | 7 | Customer acquisition intelligence |
| Cross-sell Potential | 8 | Predict interests → match products |

**Weighted Total: 6.5/10**

---

#### SF9: AI for Management BI Reports
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 3 | Cost reduction; no direct revenue |
| Speed to Revenue | 6 | 3-4 months; internal efficiency |
| Competitive Moat | 4 | Generic - Chat BI is common |
| Scalability Ceiling | 5 | Limited to management users |
| Implementation Cost | 6 | Moderate - data warehouse, query layer |
| Risk Profile | 3 | Very low - internal tool |
| Data Dependency | 7 | Heavy - needs all data sources |
| Demo Impact | 4 | Not exciting - "ask question, get chart" |
| Tech Complexity | 5 | Moderate - NL to SQL/chart |
| Qwen Alignment | 8 | Qwen excels at query generation |
| Strategic Defensibility | 4 | Operational efficiency only |
| Cross-sell Potential | 2 | No cross-sell value |

**Weighted Total: 4.7/10** ⚠️ LOW PRIORITY

---

#### SF10: Voice-to-Text Solution
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 4 | Internal efficiency; enabling tech |
| Speed to Revenue | 8 | 1-2 months; can deploy quickly |
| Competitive Moat | 4 | Vietnamese ASR is competitive |
| Scalability Ceiling | 6 | All voice interactions |
| Implementation Cost | 8 | Low - use existing ASR service |
| Risk Profile | 2 | Very low - internal tool |
| Data Dependency | 4 | Low - just needs audio |
| Demo Impact | 6 | Moderate - show transcription |
| Tech Complexity | 5 | Moderate - Vietnamese ASR tuning |
| Qwen Alignment | 9 | Qwen has strong Vietnamese ASR |
| Strategic Defensibility | 4 | Enabling tech, not standalone strategic |
| Cross-sell Potential | 3 | Enables other features |

**Weighted Total: 5.3/10**

---

#### SF11: Earned Wage Access & Salary-Linked Lending
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 8 | Payroll-linked loans = lower risk = volume |
| Speed to Revenue | 6 | 4-6 months; needs payroll partnerships |
| Competitive Moat | 7 | Payroll data = strong underwriting moat |
| Scalability Ceiling | 8 | All employed customers |
| Implementation Cost | 5 | Moderate - payroll API, underwriting |
| Risk Profile | 7 | Lower risk due to salary attachment |
| Data Dependency | 7 | Needs payroll verification data |
| Demo Impact | 7 | Good - show salary verification → instant loan |
| Tech Complexity | 6 | Moderate - verification, underwriting |
| Qwen Alignment | 7 | Qwen can power verification + decisioning |
| Strategic Defensibility | 8 | Captures employed segment |
| Cross-sell Potential | 8 | Payroll → full salary account → more |

**Weighted Total: 7.0/10** 🥇 TOP TIER

---

#### SF12: MicroBiz Loan for Digital Economy
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 8 | Huge underserved market |
| Speed to Revenue | 4 | 6-8 months; needs e-commerce data partnerships |
| Competitive Moat | 8 | E-commerce data + model = strong moat |
| Scalability Ceiling | 9 | Millions of online sellers in Vietnam |
| Implementation Cost | 4 | High - data partnerships, model training |
| Risk Profile | 6 | Moderate - higher risk thin-file |
| Data Dependency | 9 | Very heavy - e-commerce, e-wallet data |
| Demo Impact | 7 | Good - show seller receiving loan offer |
| Tech Complexity | 8 | High - multi-source data, credit model |
| Qwen Alignment | 7 | Qwen can power credit decisioning |
| Strategic Defensibility | 9 | Captures digital economy segment |
| Cross-sell Potential | 9 | Online seller → payments → full banking |

**Weighted Total: 7.3/10** 🥇 TOP TIER

---

### 2.3 SHINHAN SECURITIES USE CASES

#### SS1: AI-Native Rapid POC / Vibe Coding
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 4 | Development efficiency; internal tool |
| Speed to Revenue | 9 | 1-2 months; immediate productivity |
| Competitive Moat | 3 | Generic - all can use AI coding |
| Scalability Ceiling | 5 | Internal dev team only |
| Implementation Cost | 9 | Very low - just AI tools |
| Risk Profile | 3 | Low - internal efficiency |
| Data Dependency | 3 | Low - code repositories |
| Demo Impact | 7 | Good - show AI generating code |
| Tech Complexity | 5 | Low - just prompt engineering |
| Qwen Alignment | 9 | Qwen excels at code generation |
| Strategic Defensibility | 3 | Development efficiency not strategic |
| Cross-sell Potential | 1 | No cross-sell value |

**Weighted Total: 5.1/10**

---

#### SS2: AI-Enhanced Investment Experience
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 6 | Gamification → engagement → more trades |
| Speed to Revenue | 6 | 4-5 months; app feature |
| Competitive Moat | 5 | Gamification easily replicated |
| Scalability Ceiling | 7 | All retail investors |
| Implementation Cost | 6 | Moderate - gamification features |
| Risk Profile | 4 | Low - engagement feature |
| Data Dependency | 5 | Needs user behavior data |
| Demo Impact | 8 | Excellent - gamified quizzes, horoscopes |
| Tech Complexity | 5 | Moderate - game mechanics |
| Qwen Alignment | 8 | Qwen can generate personalized content |
| Strategic Defensibility | 5 | Engagement features are table stakes |
| Cross-sell Potential | 6 | Engagement → more trading |

**Weighted Total: 5.9/10**

---

#### SS3: AI-Powered Financial Content Generation
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 5 | User engagement → indirectly more trades |
| Speed to Revenue | 8 | 2-3 months; content pipeline |
| Competitive Moat | 4 | Content generation is commoditizing |
| Scalability Ceiling | 6 | All customers want financial news |
| Implementation Cost | 7 | Low - AI content pipeline |
| Risk Profile | 6 | Moderate - inaccurate content = regulatory risk |
| Data Dependency | 5 | Needs news data, market data |
| Demo Impact | 7 | Good - show personalized news summary |
| Tech Complexity | 5 | Moderate - summarization, personalization |
| Qwen Alignment | 9 | Qwen excels at content generation |
| Strategic Defensibility | 4 | Content is table stakes |
| Cross-sell Potential | 5 | News → investment ideas → trades |

**Weighted Total: 5.8/10**

---

#### SS4: AI-Based End-to-End Accounting Automation
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 7 | Capture SME accounting market |
| Speed to Revenue | 5 | 5-6 months; complex integration |
| Competitive Moat | 7 | Accounting data = sticky SME moat |
| Scalability Ceiling | 8 | All SMEs need accounting |
| Implementation Cost | 4 | High - ERP integration, invoice processing |
| Risk Profile | 6 | Moderate - accounting errors are serious |
| Data Dependency | 7 | Heavy - invoices, journals, reconciliation |
| Demo Impact | 6 | Moderate - show auto-entry, reconciliation |
| Tech Complexity | 8 | High - document processing, accounting logic |
| Qwen Alignment | 7 | Qwen can process invoices, generate entries |
| Strategic Defensibility | 8 | Sticky SME relationship |
| Cross-sell Potential | 9 | Accounting → banking → lending |

**Weighted Total: 6.7/10**

---

#### SS5: RegTech / Compliance Tech
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 6 | Cost reduction + compliance risk avoidance |
| Speed to Revenue | 6 | 4-5 months; AML/KYC automation |
| Competitive Moat | 8 | Compliance expertise + data = strong moat |
| Scalability Ceiling | 7 | All trading, all customers |
| Implementation Cost | 4 | High - compliance infrastructure |
| Risk Profile | 9 | Very high - compliance failure = regulatory action |
| Data Dependency | 7 | Heavy - transaction monitoring, KYC data |
| Demo Impact | 6 | Moderate - show AML flagging |
| Tech Complexity | 8 | High - complex rules + ML |
| Qwen Alignment | 7 | Qwen can analyze patterns, generate reports |
| Strategic Defensibility | 9 | Critical regulatory requirement |
| Cross-sell Potential | 2 | No cross-sell value |

**Weighted Total: 6.7/10**

---

#### SS6: Digital Assets & Tokenized Securities
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 9 | New asset class = new revenue streams |
| Speed to Revenue | 2 | 12+ months; regulatory uncertainty |
| Competitive Moat | 9 | Early mover = significant advantage |
| Scalability Ceiling | 10 | Entire digital asset market |
| Implementation Cost | 2 | Very high - blockchain, custody, compliance |
| Risk Profile | 10 | Extreme - regulatory, volatility, security |
| Data Dependency | 6 | Needs market data, custody systems |
| Demo Impact | 8 | Excellent - show tokenized securities |
| Tech Complexity | 10 | Extreme - blockchain, smart contracts, custody |
| Qwen Alignment | 5 | Less applicable - not core Qwen strength |
| Strategic Defensibility | 10 | First-mover in digital assets |
| Cross-sell Potential | 6 | Digital assets → new customer segments |

**Weighted Total: 6.3/10**

---

### 2.4 SHINHAN LIFE USE CASES

#### SL1: Data Analytics & BI Platform
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 6 | Internal efficiency + customer insights |
| Speed to Revenue | 6 | 4-5 months; data platform foundation |
| Competitive Moat | 6 | Data platform = internal moat over time |
| Scalability Ceiling | 7 | All customers, all products |
| Implementation Cost | 5 | Moderate - data warehouse, BI tools |
| Risk Profile | 3 | Low - internal platform |
| Data Dependency | 8 | Heavy - all data sources |
| Demo Impact | 5 | Moderate - dashboards, segmentation |
| Tech Complexity | 6 | Moderate - data engineering |
| Qwen Alignment | 7 | Qwen can enhance analytics |
| Strategic Defensibility | 7 | Foundation for AI initiatives |
| Cross-sell Potential | 7 | Customer insights → better offers |

**Weighted Total: 6.1/10**

---

#### SL2: Voice AI Rating System
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 5 | Compliance + quality assurance |
| Speed to Revenue | 7 | 3-4 months; can detect AI vs human |
| Competitive Moat | 7 | Detection model = specialized moat |
| Scalability Ceiling | 6 | All consultations, all agents |
| Implementation Cost | 6 | Moderate - audio analysis infrastructure |
| Risk Profile | 5 | Moderate - misclassification risk |
| Data Dependency | 7 | Needs consultation recordings + labels |
| Demo Impact | 8 | Excellent - show AI-generated vs real detection |
| Tech Complexity | 8 | High - audio fingerprinting, ML |
| Qwen Alignment | 7 | Qwen has audio analysis capabilities |
| Strategic Defensibility | 7 | UL compliance is critical |
| Cross-sell Potential | 2 | No cross-sell value |

**Weighted Total: 6.3/10**

---

#### SL3: AI-Powered Insurance Claims Fraud Detection
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 8 | Fraud prevention = direct savings |
| Speed to Revenue | 7 | 3-4 months; can layer on claims system |
| Competitive Moat | 7 | Claims data + fraud patterns = moat |
| Scalability Ceiling | 8 | All insurance claims |
| Implementation Cost | 5 | Moderate - claims data, detection model |
| Risk Profile | 7 | High - false negatives = payout losses |
| Data Dependency | 7 | Heavy - historical claims, fraud patterns |
| Demo Impact | 7 | Good - show suspicious claim flagging |
| Tech Complexity | 7 | High - anomaly detection, pattern recognition |
| Qwen Alignment | 7 | Qwen can analyze claims data |
| Strategic Defensibility | 8 | Fraud prevention is strategic |
| Cross-sell Potential | 3 | Doesn't enable cross-sell |

**Weighted Total: 6.9/10**

---

#### SL4: AI-Powered Digital Health Ecosystem
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Revenue Potential | 7 | Health premiums + wellness engagement |
| Speed to Revenue | 3 | 8-12 months; ecosystem play |
| Competitive Moat | 6 | Health data + insurance = network effect |
| Scalability Ceiling | 9 | Health-conscious population |
| Implementation Cost | 3 | Very high - app, wearables, telemedicine |
| Risk Profile | 6 | Moderate - health data privacy |
| Data Dependency | 8 | Heavy - health data, wearable integration |
| Demo Impact | 7 | Good - health dashboard, recommendations |
| Tech Complexity | 8 | Very high - health data integration |
| Qwen Alignment | 7 | Qwen can generate health recommendations |
| Strategic Defensibility | 7 | Health ecosystem is strategic |
| Cross-sell Potential | 8 | Health → life insurance → banking |

**Weighted Total: 6.4/10**

---

## Hacker Advantage Analysis

### Strategic Brief

The strongest hackathon opportunities are not wrapped frontier model UIs. The strongest opportunities are the ones where hackers can outperform large vendors through messy integration work, bespoke underwriting logic, and local-market workflow design.

**Decision Rule:** Prefer use cases with these traits:
- Value comes from combining 2-4 disconnected data sources
- A smart rules engine creates value before any advanced AI layer exists
- Local Vietnam workflow knowledge matters
- Integration complexity is the moat
- The model is a helper, not the product

Avoid use cases where the main story is "the model talks well" or "the model summarizes things nicely." Those are easiest for vendors to copy.

[SOURCE: HACKER_ADVANTAGE_RESEARCH.md]

---

### Hacker Advantage Scoring Methodology

This ranking uses one test: where does the team create value through data fusion, local heuristics, and ugly last-mile integration work that a vendor cannot copy quickly by adding one more AI API?

| Category | Definition |
|----------|------------|
| **TRUE MOAT** | Cannot be copied by vendors with just an API. Requires local knowledge, integration work, or bespoke logic. |
| **PARTIAL MOAT** | Some defensibility but vendors could replicate with moderate effort. |
| **WEAK MOAT** | Almost pure model capability. Easy to replicate. |

---

### Per-Use-Case Hacker Advantage Scores

| Rank | ID | Use Case | Score | Verdict |
|------|----|----------|-------|---------|
| 1 | SB9 | AI-Driven SME Credit Scoring via POS Data | 9.5 | TRUE MOAT |
| 2 | SF12 | MicroBiz Loan for Digital Economy | 9.3 | TRUE MOAT |
| 3 | SF11 | Earned Wage Access & Salary-Linked Lending | 8.8 | TRUE MOAT |
| 4 | SB3 | AI-Powered Loyalty & Personalized Offers | 8.7 | TRUE MOAT |
| 5 | SF5 | Open Banking API for AI Credit Scoring | 8.4 | TRUE MOAT |
| 6 | SB7 | SoftPOS for SOHO & Micro Businesses | 8.1 | TRUE MOAT |
| 7 | SS4 | AI-Based End-to-End Accounting Automation | 8.0 | TRUE MOAT |
| 8 | SS5 | RegTech / Compliance Tech | 7.9 | TRUE MOAT |
| 9 | SL3 | AI-Powered Insurance Claims Fraud Detection | 7.8 | TRUE MOAT |
| 10 | SF8 | AI Customer Behavior Prediction | 7.6 | TRUE MOAT |
| 11 | SB6 | Embedded Installment & BNPL | 7.2 | PARTIAL MOAT |
| 12 | SF4 | AI-based CRM | 6.8 | PARTIAL MOAT |
| 13 | SB1 | AI Personal Financial Coach | 6.6 | PARTIAL MOAT |
| 14 | SF1 | Intelligent Document Processing | 6.4 | PARTIAL MOAT |
| 15 | SL4 | AI-Powered Digital Health Ecosystem | 6.3 | PARTIAL MOAT |
| 16 | SB2 | AI-Powered Customer Engagement Automation | 6.1 | PARTIAL MOAT |
| 17 | SF3 | Video Call Enhancement with eKYC | 6.1 | PARTIAL MOAT |
| 18 | SF2 | Falsified Document Detection | 6.0 | PARTIAL MOAT |
| 19 | SS6 | Digital Assets & Tokenized Securities | 6.0 | PARTIAL MOAT |
| 20 | SL1 | Data Analytics & BI Platform | 6.0 | PARTIAL MOAT |
| 21 | SF7 | AI for ICT Cyber Security | 5.9 | PARTIAL MOAT |
| 22 | SB4 | AI Call Bot for Collections & Sales | 5.8 | PARTIAL MOAT |
| 23 | SL2 | Voice AI Rating System | 5.8 | PARTIAL MOAT |
| 24 | SS2 | AI-Enhanced Investment Experience | 5.6 | PARTIAL MOAT |
| 25 | SF6 | BNPL/Personal Loan Partnership | 5.5 | PARTIAL MOAT |
| 26 | SB5 | AI for Internal Reporting & BI Automation | 4.6 | WEAK MOAT |
| 27 | SF9 | AI for Management BI Reports | 4.4 | WEAK MOAT |
| 28 | SS3 | AI-Powered Financial Content Generation | 4.2 | WEAK MOAT |
| 29 | SF10 | Voice-to-Text Solution | 4.0 | WEAK MOAT |
| 30 | SB10 | AI-Powered Branch Traffic Prediction | 3.9 | WEAK MOAT |
| 31 | SB8 | AI Voice Biometrics for Fraud Prevention | 3.7 | WEAK MOAT |
| 32 | SS1 | AI-Native Rapid POC / Vibe Coding | 3.5 | WEAK MOAT |

[SOURCE: TRUE_HACKER_ADVANTAGE.md]

---

### Best Chance To Win Ranking

> **Pure hacker advantage ranking (highest to lowest):**
> 1.  SB9 - AI-Driven SME Credit Scoring via POS Data
> 2.  SF12 - MicroBiz Loan for Digital Economy
> 3.  SF11 - Earned Wage Access & Salary-Linked Lending
> 4.  SB3 - AI-Powered Loyalty & Personalized Offers
> 5.  SF5 - Open Banking API for AI Credit Scoring

These are the strongest because the moat comes from alternative data plumbing, Vietnam-specific underwriting rules, and workflow integration - not from the base model.

[SOURCE: TRUE_HACKER_ADVANTAGE.md]

---

## Competitor & Market Analysis

### Core Market Gaps
1. **SME Credit Gap:** $10-15B USD in unmet demand for Vietnam SME lending
2. **BNPL Penetration:** <5% of e-commerce GMV currently uses BNPL
3. **Thin-file Exclusion:** <30% of SMEs and informal workers have formal credit access
4. **Digital Seller Underservice:** Millions of marketplace sellers cannot access formal banking products

### Competitor Product Landscape
| Segment | Competitors | Gap Opportunity |
|---------|-------------|-----------------|
| BNPL | GrabPay, MoMo, Kredivo | Bank-integrated BNPL with existing customer base |
| SME Lending | Traditional banks, fintechs | Alternative data underwriting using POS / marketplace data |
| eKYC | Generic vendors | Vietnam-specific deepfake detection and workflow integration |
| Claims Fraud | Insurance vendors | Local provider pattern recognition and rule-based anomaly detection |

[SOURCE: HACKATHON_RESEARCH.md, TRUE_HACKER_ADVANTAGE.md]

---

## Strategic Recommendations

### FINAL RANKED LIST

#### TIER 1: MUST-BUILD (High Impact, High Demo)
| Rank | ID | Use Case | Score | Why Build |
|------|----|----------|-------|-----------|
| **#1** | **SB6** | Embedded Installment & BNPL | 7.4 | Best balance of demo impact + business value. Vietnam e-commerce is huge. Instant approval demo will wow judges. |
| **#2** | **SB4** | AI Call Bot | 6.9 | Highest demo score (9/10). Voice AI is perfect for hackathon - live conversation demos are memorable. Vietnamese language = differentiator. |

#### TIER 2: STRONG ALTERNATIVES (High Business Value)
| Rank | ID | Use Case | Score | Why Build |
|------|----|----------|-------|-----------|
| **#3** | **SF12** | MicroBiz Loan | 7.3 | Massive underserved market. Huge NPV potential. Strategic for Shinhan's SME expansion. |
| **#4** | **SB9** | SME Credit via POS | 7.1 | Captures $10-15B credit gap. First-mover with POS data = strong moat. |
| **#5** | **SF11** | Salary-Linked Lending | 7.0 | Lower risk, faster revenue. Payroll data = strong underwriting. |
| **#6** | **SF3** | eKYC Deepfake Detection | 6.9 | Critical capability. Excellent demo - show live deepfake detection. |
| **#7** | **SL3** | Claims Fraud Detection | 6.9 | Direct cost savings. Good demo with suspicious claim flagging. |

#### TIER 3: CONSIDER FOR DEPTH (Lower Priority)
| Rank | ID | Use Case | Score | Why Consider |
|------|----|----------|-------|---------------|
| **#8** | **SF4** | AI-based CRM | 6.8 | Cross-sell powerhouse. Best for long-term strategic value. |
| **#9** | **SF5** | Open Banking Credit | 6.8 | Alternative data moat. Captures thin-file customers. |
| **#10** | **SB7** | SoftPOS | 6.7 | SME ecosystem capture. Good demo with NFC. |

#### TIER 4: AVOID FOR HACKATHON
| ID | Use Case | Score | Why Avoid |
|----|----------|-------|-----------|
| SB5 | Internal BI Reporting | 4.8 | Boring demo, no direct revenue |
| SB10 | Branch Traffic | 3.9 | Lowest score. Operational only. |
| SF9 | Management BI | 4.7 | Boring demo, cost reduction only |
| SF10 | Voice-to-Text | 5.3 | Enabling tech, not standalone |
| SS1 | Vibe Coding | 5.1 | Generic, no strategic value |

---

### STRATEGIC SYNTHESIS

**If I Could Only Build ONE:** SB6 (BNPL) - Best overall balance.

**If I Want to WIN THE PRIZE:** SB4 (AI Call Bot) - Highest demo impressiveness.

**If I Want to GUARANTEE JOB CONTRACT:** SF12 (MicroBiz Loan) or SB9 (SME Credit) - Massive market, strategic value, data moat.

**If I Want BOTH:** Build **SB6** as primary (demo winner) with **SF12** insights as secondary narrative (job winner).

[SOURCE: USE_CASE_ANALYSIS.md, HACKER_ADVANTAGE_RESEARCH.md]

---

### RISK-ADJUSTED RECOMMENDATION

**Primary Build: SB6 - Embedded Installment & BNPL**
- Demo: 9/10 (impressive checkout flow)
- Business Value: 7.4/10 (strong revenue)
- Qwen Fit: 8/10 (credit decisioning)
- Time to Demo: 2-3 days for basic version
- Differentiation: Vietnam e-commerce integration

**Secondary Narrative: SF12 - MicroBiz Loan**
- Use as "Phase 2" story in pitch
- Shows deeper market understanding
- Demonstrates SME strategic thinking
- Explains data infrastructure play

[SOURCE: USE_CASE_ANALYSIS.md]

---

## Key Findings

1. **The moat is integration, not AI:** The strongest use cases use AI as the last 20%, not the first 80%. Real value comes from data plumbing and local heuristics.

2. **Alternative underwriting is the strongest cluster:** SB9 + SF12 + SF11 + SF5 create durable data assets and target underserved Vietnam segments.

3. **Demo impact and business value are often inversely correlated:** The best demos are not always the most strategic business opportunities.

4. **SB6 is the sweet spot:** It balances excellent demo impact with strong business value and serves as an entry point to the larger SME ecosystem.

5. **Operational efficiency use cases always lose:** Internal BI, reporting, and forecasting use cases score poorly on both demo impact and strategic value.

[SOURCE: TRUE_HACKER_ADVANTAGE.md, HACKATHON_RESEARCH.md]

---

## Source References

This document consolidates and removes duplicates from the following research artifacts:
- USE_CASE_ANALYSIS.md (primary scoring source)
- HACKER_ADVANTAGE_RESEARCH.md (strategic framing)
- TRUE_HACKER_ADVANTAGE.md (hacker advantage deep dive)
- HACKATHON_RESEARCH.md (complete use case overview)

---

**Document End**

*Analysis conducted for hackathon strategy optimization. Scores based on Vietnam market context, Shinhan ecosystem fit, and dual-objective (prize + job) optimization.*
