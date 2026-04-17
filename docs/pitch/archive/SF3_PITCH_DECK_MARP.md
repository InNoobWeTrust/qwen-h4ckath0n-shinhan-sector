---
marp: true
paginate: true
math: mathjax
headingDiv: marp-slide-content
style: |
  section {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: white;
    color: #1a1a1a;
  }
  h1 {
    font-size: 2.5em;
    font-weight: 700;
    margin-bottom: 0.5em;
    color: #1a1a1a;
  }
  h2 {
    font-size: 1.8em;
    font-weight: 600;
    margin-bottom: 0.4em;
  }
  h3 {
    font-size: 1.3em;
    font-weight: 600;
  }
  strong {
    color: #000;
    font-weight: 700;
  }
  ul {
    padding-left: 1.5em;
  }
  li {
    margin-bottom: 0.3em;
    font-size: 0.9em;
  }
  .slide-number {
    bottom: 0.8em;
    right: 1em;
    font-size: 0.6em;
  }
  blockquote {
    border-left: 4px solid #000;
    padding-left: 1em;
    margin-left: 0;
    font-style: italic;
    color: #444;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.75em;
    margin: 1em 0;
  }
  th {
    background: #000;
    color: white;
    padding: 0.5em;
    text-align: left;
  }
  td {
    border: 1px solid #ddd;
    padding: 0.5em;
  }
  .speaker-notes {
    background: #f5f5f5;
    border-top: 2px solid #000;
    padding: 1em;
    margin-top: 1em;
    font-size: 0.6em;
  }
  .highlight {
    background: #000;
    color: #fff;
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
  }
  .center {
    text-align: center;
  }
  .big-number {
    font-size: 3em;
    font-weight: 700;
    color: #000;
  }
---

# Video Call eKYC: 
# Deepfake Detection for Safe Digital Onboarding

## Qwen AI Build Day — Financial Track (sponsored by Shinhan)

**Team: Alpha Protectors**

<!-- speaker notes -->
<!-- Opening line: "Every bank is racing to onboard customers digitally. We're making sure they know who they're onboarding." -->

---

# The Problem

## A Story

---

A loan application comes in.

The video call looks normal.

The face matches the ID.

**But something is wrong.**

---

The person on the video **isn't real**.

It's a **deepfake**.

And your underwriting team has **30 seconds** to decide:

**Approve or Reject**

<!-- speaker notes -->
<!-- Tell this story with tension. Pause after each line. Emphasize the final dilemma - they have no idea this is fake. -->

---

# The Problem

# The Data

---

## <span class="big-number">$20</span>

The cost to create a convincing video deepfake using generative AI

**Generative AI can create convincing video deepfakes for less than $20**

---

## Vietnam's Reality

**Vietnam has seen increasing identity fraud in digital lending**

- Digital banking adoption skyrocketed
- Remote onboarding became standard
- But **verification hasn't kept up**

---

## The Underwriter's Dilemma

**Underwriters are overwhelmed with manual video review**

- Remote onboarding is now standard - but verification hasn't kept up
- One bad onboarding = 
  - **Credit fraud loss**
  - **Regulatory scrutiny**

<!-- speaker notes -->
<!-- Emphasize these points: The technology gap, the scale problem, and the consequence of failure. This is what keeps C-level executives awake at night. -->

---

# The Insight

# First Principles

---

## Why are deepfakes dangerous for eKYC?

**Traditional liveness checks look for "real" not "fake"**

They check for:
- Blinking
- Head movement
- Texture anomalies

But these **can be bypassed** with modern deepfakes

<!-- speaker notes -->
<!-- Start with a question. Let the audience think about it. Then reveal the fundamental flaw in current technology. -->

---

## What's missing?

**Contextual Analysis**

Is the **background** real?

Is the **movement** natural?

Is the **face** consistent with known fraud patterns?

---

## What does Qwen add?

**Multimodal Reasoning**

It can:
- **See** the video
- **Understand** the context
- **Explain** its assessment in real time

This is the game changer.

<!-- speaker notes -->
<!-- The insight here is that Qwen isn't just another detection algorithm - it's a reasoning engine that can understand context the way humans do. -->

---

# The Solution

# Shinhan Video eKYC Assistant

---

## Real-Time Deepfake Detection

During video calls for onboarding

**Detection layers:**
- Face liveness
- Micro-expressions
- Background consistency
- Replay/injection

---

## Risk Scoring with Explainable Evidence

**Not just "approve/reject"**

- Risk score: 0-100
- Why it's suspicious
- Confidence level
- Evidence summary

---

## Agent Assist

**Suggested follow-up questions**

Based on detected anomalies

Ask the right questions at the right time

---

## Automatic Routing

**Smart triage:**

`Normal → Auto-approved`

`Suspicious → Human review`

**Save underwriter time on 80% of cases**

<!-- speaker notes -->
<!-- Walk through each feature. The key message: This isn't replacing underwriters, it's making them 10x more effective. -->

---

# The Demo

# Watch This

---

## "When I press this button, you'll see our system analyze a video call in real time."

**The first call looks normal.**

**The second call... watch closely.**

---

[Demo Screenshot Placeholder]

**Live analysis panel showing:**
- Risk score: **87/100**
- Detection: **Deepfake detected**
- Evidence: **Inconsistent lighting, unnatural eye movement**
- Suggested question: **"Can you turn your head slowly to the left?"**

<!-- speaker notes -->
<!-- This is where you demonstrate the product. Have the demo ready. If live demo isn't possible, show a pre-recorded video. Emphasize the real-time nature of the analysis. -->

---

# How It Works

# Technical Flow

---

## Step 1: Customer Starts Video Call

For onboarding verification

---

## Step 2: Qwen Multimodal Model Processes Stream

Video frames processed in real time

---

## Step 3: Multi-Layer Analysis

| Layer | What it Checks |
|-------|----------------|
| Face Liveness | Is this a real person? |
| Micro-expression | Natural emotional movement |
| Background | Consistent with real environment |
| Replay Detection | Not a video of a video |

---

## Step 4: Risk Score Generated

**In under 10 seconds**

Score: 0-100 with confidence level

---

## Step 5: If Suspicious

**Evidence summary generated**

**Suggested challenge questions**

---

## Step 6: Underwriter Decision

**Sees risk score + explanation BEFORE decision**

**Faster, more confident decisions**

<!-- speaker notes -->
<!-- Walk through the flow. Emphasize the speed - under 10 seconds for a comprehensive analysis. That's faster than a human can blink. -->

---

# Qwen Advantage

# Traditional vs. Qwen-Powered eKYC

---

| Traditional eKYC | Qwen-Powered eKYC |
|------------------|-------------------|
| Pass/Fail binary | Risk score **0-100** |
| No explanation | **Explainable risk factors** |
| Static rules | **Contextual reasoning** |
| Human review **all cases** | **Auto-route normal cases** |

---

## The Difference

**Binary vs. Nuanced**

Traditional: "Real or fake?"

Qwen: **"How fake? How sure? What's the evidence?"**

---

## Why It Matters

**80% of cases are normal**

Qwen can **auto-route these**

Underwriters focus on the **20% that need human judgment**

**10x productivity gain**

<!-- speaker notes -->
<!-- The key insight: This isn't just better detection, it's better workflow design. By auto-approving normal cases, you free up humans to focus on what matters. -->

---

# The Business Case

# ROI for Underwriting & Shinhan

---

## For Underwriting Team

### Reduce Manual Video Review Time

**By 70%**

Focus on suspicious cases only

### Catch Deepfakes That Pass Traditional Checks

**100% deeper analysis**

### Faster Onboarding for Legitimate Customers

**Real-time decisions**

---

## For Shinhan

### Reduce Fraud Losses

**From identity theft**

**Million-dollar protection**

### Regulatory Confidence

**Digital onboarding you can audit**

### Competitive Advantage

**Speed-to-approve while maintaining security**

**Faster than competitors, safer than banks**

<!-- speaker notes -->
<!-- The business case is simple: This saves money, reduces risk, and improves customer experience. Those are the three things that matter to any business. -->

---

# Pilot Plan

# 6-Month Rollout

---

## Phase 1 (Month 1-2)

### Underwriter Assist Tool

**Deploy as decision support**

**Measure:**
- Review time per case
- Fraud detection rate
- Underwriter satisfaction

---

## Phase 2 (Month 3-4)

### Auto-Routing Based on Risk Score

**Normal cases auto-approved**

**Measure:**
- Approval rate
- False positive rate
- Fraud leakage

---

## Phase 3 (Month 5-6)

### Full Integration with SOL Onboarding

**End-to-end workflow**

**Measure:**
- Conversion rate
- End-to-end processing time
- Overall fraud rate

<!-- speaker notes -->
<!-- This is a careful, measured approach. Start as assistive tool, build trust, then gradually add automation. This is how you actually get adoption in a bank. -->

---

# The Ask

# What We Need

---

## Access

**Historical video review data** (anonymized)

Underwriter feedback during pilot

**Integration sandbox with SOL app**

---

## What You Get

**Today:**

✓ Working deepfake detection prototype

**In 6 Months:**

✓ Clear path to production as underwriter assist

✓ Team that understands **both AI and banking compliance**

---

## Why Us?

We built this at a hackathon

**But we think like bankers**

We know what matters:

- **Accuracy**
- **Explainability**
- **Compliance**
- **Speed**

<!-- speaker notes -->
<!-- The ask should be clear and specific. The what you get section should feel like a value proposition. Emphasize that you're not just technologists, you understand banking. -->

---

# Every bank is racing to onboard customers digitally.

# We're making sure they know who they're onboarding.

---

## Video Call eKYC: Deepfake Detection for Safe Digital Onboarding

### Qwen AI Build Day — Financial Track (sponsored by Shinhan)

**Team: Alpha Protectors**

**Qwen-Powered Underwriting Assistant**

<!-- speaker notes -->
<!-- End with impact. This should be a line they remember. Pause for effect. Thank them. -->
