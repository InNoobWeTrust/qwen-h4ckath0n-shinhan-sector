# Strategic Use Case Research

## Bottom Line

Do not go back to lending-heavy ideas. The best chance to win is a use case that is easy to demo live, visibly uses Qwen, has believable business value, and does not trigger a long compliance debate. On that basis, the two strongest recommendations are:

1. **SF3: Video Call eKYC with Deepfake Detection** - best overall balance of wow factor, urgency, Qwen fit, and executive credibility.
2. **SB4: AI Call Bot for Collections & Sales** - best live-demo theater, clear cost story, but slightly weaker on novelty and compliance comfort.

If a safer fallback is needed, use **SB3: AI Loyalty & Personalized Offers**.

---

## Decision Criteria

- **Demo impressiveness:** can it land in 3-5 minutes without long setup?
- **Novelty:** will banking judges feel this is more than a generic chatbot or dashboard?
- **ROI clarity:** can the value be explained in one sentence without heroic assumptions?
- **Qwen alignment:** does multimodal / voice / reasoning visibly improve the product?
- **Regulatory simplicity:** avoid credit underwriting and heavy model-risk debates.

---

## Top 5 Contenders For Wow Factor

| Rank | Use Case | Why It Contends | Main Risk |
|------|----------|-----------------|-----------|
| 1 | **SF3 - Video Call eKYC with Deepfake Detection** | Strong visual demo, urgent problem, clear "why now," strong Qwen multimodal fit | Accuracy claims can be challenged if overstated |
| 2 | **SB4 - AI Call Bot for Collections & Sales** | Most memorable live demo, immediate cost story, easy to stage | Judges may have seen call bots before |
| 3 | **SB3 - AI Loyalty & Personalized Offers** | Clean consumer demo, easy ROI story, low regulatory drag | Feels less novel unless execution is sharp |
| 4 | **SB7 - SoftPOS for SOHO** | Tangible and physical demo, strong SME story | Qwen is not the star unless paired with AI merchant insights |
| 5 | **SF2 - Falsified Document Detection** | Credible fraud story, easy before/after demo, lower hype risk | Less theatrical than video or voice |

---

## Strategic Comparison

### 1) SF3 - Video Call eKYC with Deepfake Detection

**A. Demo**

- Show a mock onboarding video call screen.
- Upload or stream two cases: one normal applicant, one suspicious applicant.
- Overlay live signals: face match, liveness checks, suspicious frame markers, agent assist prompts.
- **Wow moment:** the system flags a deepfake or replay attempt and explains why in plain language while suggesting the next question for the agent.
- **Demo risk:** if detection feels binary or magical, judges will challenge accuracy; the safer demo is a risk-score and escalation assistant, not a perfect detector.

**B. ROI**

- One-sentence value: **reduce manual video-review workload and fraud exposure by auto-triaging risky onboarding sessions before they become booked customers.**
- Number to use: **"1 risk score in under 10 seconds per video session"** as the demo KPI; this is safer than quoting unsourced fraud-loss savings.
- Type: **cost reduction + loss avoidance + faster digital onboarding.**

**C. Competition**

- Judges have likely seen basic liveness checks and face-match demos.
- They may also have seen generic "AI detects deepfake" hackathon pitches.
- The new angle is **Qwen as a multimodal investigator**: detect, explain, highlight evidence, and guide the human reviewer in real time.

**D. Why Now**

- This is a real "why now" use case because generative video fraud is now plausible enough to worry executives, and multimodal models are finally good enough to support live review workflows.
- The claim to make is not "deepfakes exist now" but **"banks now need explainable AI assistance during remote onboarding, not just offline fraud review."**

### 2) SB4 - AI Call Bot for Collections & Sales

**A. Demo**

- Show an outbound-call console with customer profile, risk tier, script policy, and live transcript.
- Start a live voice call simulation in Vietnamese or bilingual mode.
- Show the bot handling interruption, objection, and handoff logic.
- **Wow moment:** the bot adapts tone and next-best-action in real time while keeping a compliance-safe script boundary.
- **Demo risk:** speech latency, awkward TTS, and overpromising autonomous collections can hurt trust fast.

**B. ROI**

- One-sentence value: **automate high-volume first-touch outbound calls so human agents only spend time on escalations and high-value conversations.**
- Number to use: **"30% of first-touch outbound calls auto-handled"** as a pilot target, clearly labeled as a pilot KPI rather than a proven result.
- Type: **cost reduction first, revenue lift second.**

**C. Competition**

- Judges have almost certainly seen IVR, chatbot, and call-center automation pitches.
- Other hackathons may show voicebots that read a script.
- The new angle is **a finance-specific conversational agent with live reasoning, objection handling, and agent-ready summaries instead of a static script reader.**

**D. Why Now**

- "Why now" is credible because speech models, real-time transcription, and low-latency voice orchestration have become much more usable.
- The sharper version is **"voice AI is now good enough to handle structured banking conversations, but still needs a policy envelope and human escalation."**

### 3) SB3 - AI Loyalty & Personalized Offers

**A. Demo**

- Show a mobile wallet or SOL-style screen near a partner merchant.
- Present a dynamic QR, context-aware offer, and a short Qwen-generated explanation of why this offer fits this user now.
- Complete a mock redemption flow and show the merchant dashboard update.
- **Wow moment:** a static QR becomes a personalized, conversational offer trigger tied to location and customer context.
- **Demo risk:** if it looks like a coupon app, judges will downgrade it immediately.

**B. ROI**

- One-sentence value: **increase transaction frequency and merchant-funded offer redemption without adding branch or call-center cost.**
- Number to use: **"1 personalized offer generated at scan time"** as the live KPI; avoid unsourced uplift claims unless validated.
- Type: **revenue-generating.**

**C. Competition**

- Judges have likely seen generic rewards and personalization engines.
- Other teams may show a recommendation dashboard or discount carousel.
- The new angle is **dynamic QR plus conversational personalization at the exact transaction moment, not just static segmentation.**

**D. Why Now**

- "Why now" is credible only if tied to QR ubiquity and the ability of modern models to generate context-rich offers instantly.
- Without that real-time layer, this becomes an old loyalty story.

### 4) SB7 - SoftPOS for SOHO

**A. Demo**

- Show a merchant phone acting as a POS terminal.
- Simulate a tap-to-pay transaction and immediate settlement/receipt.
- Then show a lightweight AI merchant dashboard with sales summary and suggested next action.
- **Wow moment:** a normal smartphone becomes a merchant acceptance device in seconds.
- **Demo risk:** NFC setup and payment emulation are brittle; if the hardware flow breaks, the whole demo weakens.

**B. ROI**

- One-sentence value: **acquire small merchants cheaply through payment acceptance, then expand into deposits, lending, and merchant services.**
- Number to use: **"1 phone = 1 instant POS"** as the headline demo number.
- Type: **revenue-generating with ecosystem expansion.**

**C. Competition**

- Judges may have seen SoftPOS from payment vendors.
- Other hackathons may show a tap-to-pay prototype.
- The new angle is only strong if you position it as **the front door to AI-powered merchant banking**, not just payment acceptance.

**D. Why Now**

- The timing argument is smartphone capability and merchant digitization.
- The weakness is that the AI layer is optional, so Qwen can feel bolted on unless the merchant copilot is central.

### 5) SF2 - Falsified Document Detection

**A. Demo**

- Show a loan-document upload flow.
- Compare a normal document and a manipulated one.
- Highlight suspicious regions, inconsistent typography, metadata anomalies, or visual tampering cues.
- **Wow moment:** the system not only flags the document but explains where and why a reviewer should distrust it.
- **Demo risk:** if the manipulated example is too obvious, judges may dismiss it as a toy problem.

**B. ROI**

- One-sentence value: **reduce manual fraud-review effort by routing only suspicious application documents to human investigation.**
- Number to use: **"1 document triaged in seconds, with evidence attached"** as the demo KPI.
- Type: **cost reduction + loss avoidance.**

**C. Competition**

- Judges may have seen OCR, IDP, and rule-based document validation.
- The new angle is **forensic explainability**, not just pass/fail classification.

**D. Why Now**

- This is timely because document manipulation is easier in the generative-AI era, and banks need faster review capacity without scaling manual ops.
- It is less flashy than SF3, but more defensible under fact-checking.

---

## Shortlist

### 1) SF3 - Video Call eKYC with Deepfake Detection

This is the best overall bet. It is visibly AI-native, directly tied to a current executive fear, and allows a clean multimodal Qwen demo without walking into lending complexity. It also has a strong "judge story": safer digital onboarding, fewer false onboardings, faster review, and a clear path to production as an agent-assist tool.

### 2) SB4 - AI Call Bot for Collections & Sales

This is the best stage-performance bet. If the goal is pure memorability in a short demo, voice beats dashboards. The reason it is second, not first, is that judges may be more skeptical because they have seen call automation before and may worry about customer treatment and compliance.

### 3) SB3 - AI Loyalty & Personalized Offers

This is the safest commercial fallback. It is less novel, but the business logic is easy to believe, the demo can be consumer-friendly, and it avoids the heaviest regulatory objections.

**Recommendation:** build **SF3** as the primary submission. Keep **SB4** as the only serious alternative if the team is unusually strong in voice demo execution.

---

## Shortlisted Use Cases: Pitch, Demo, Number

### SF3 - Video Call eKYC with Deepfake Detection

**30-second pitch**

Remote onboarding is only as strong as the bank's ability to trust the face on the screen. We built an AI copilot for video eKYC that helps agents detect deepfakes, replay attacks, and suspicious sessions in real time, then explains the evidence and recommends the next question or escalation step. This makes digital onboarding faster for normal customers and safer for the bank.

**Demo script**

Open a mock onboarding call. Start with a normal applicant and show a low-risk result. Then switch to a suspicious video and let the system highlight face/liveness anomalies, produce a higher risk score, and suggest a follow-up challenge question. End by showing the case routed to manual review with an evidence summary generated by Qwen.

**One number**

**"Under 10 seconds to produce a review-ready risk score for a video session."**

### SB4 - AI Call Bot for Collections & Sales

**30-second pitch**

Banks still spend expensive human time on repetitive outbound calls that are structured, policy-bound, and high-volume. We built a voice agent that handles first-touch collections and sales conversations, adapts to customer responses in real time, stays inside a policy envelope, and produces a clean summary for a human agent when escalation is needed.

**Demo script**

Show the call console, then trigger a live outbound call simulation. Let the customer interrupt, object, and ask for clarification. Show the bot responding naturally, logging intent, and deciding whether to continue, reschedule, or hand off. Finish with the post-call summary and next-best-action recommendation.

**One number**

**"30% of first-touch outbound calls handled automatically"** as a pilot target.

### SB3 - AI Loyalty & Personalized Offers

**30-second pitch**

Most bank loyalty programs are static and forgettable. We turned the payment moment into a personalized offer engine by combining dynamic QR flows, customer context, and Qwen-generated explanations so the bank can drive more transactions, better merchant partnerships, and smarter cross-sell at the exact moment the customer is ready to act.

**Demo script**

Open a mobile wallet, place the user near a mock merchant, and scan a dynamic QR. Show the offer being generated for that user in that moment, explain why it fits, redeem it, and update the merchant and customer views instantly. End with the bank learning loop: next offer gets smarter based on interaction.

**One number**

**"1 personalized offer generated at scan time."**

---

## Strategic Insight

Winning hackathon projects do not just solve a bank problem. They do three things at once:

1. **Show visible intelligence live.** Judges need to see the AI doing work on screen, not hear architecture promises.
2. **Tell a believable money story.** The best projects attach to a line item executives already understand: fraud loss, agent time, onboarding throughput, transaction volume.
3. **Feel production-adjacent.** A winning project looks like something a business owner could pilot next quarter, not a science experiment.

The projects that get follow-up meetings usually have a narrow operating model: one user, one workflow, one KPI, one integration path. The projects that do not get follow-up meetings are usually broad, overbuilt, or dependent on unproven data, heavy regulation, or too many external partners.

---

## Final Recommendation

If the goal is the **best chance to win**, choose **SF3**.

- It is more current than loyalty.
- More defensible than BNPL or credit.
- More novel than a generic CRM or call bot.
- More strategic for banking judges than content generation or gamification.
- Better aligned with Qwen's multimodal strengths than SoftPOS.

If the team knows it can deliver a flawless voice demo, **SB4** is the only strong alternative worth switching to.
