---
marp: true
paginate: true
theme: default
math: tex
style: |
  section {
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    background: white;
    color: #1a1a1a;
  }
  h1, h2, h3, h4, h5, h6 {
    color: #1a1a1a;
    font-weight: 700;
  }
  strong {
    color: #dc2626;
  }
  .highlight {
    color: #dc2626;
    font-weight: 700;
  }
  .blue {
    color: #2563eb;
    font-weight: 600;
  }
  .gray {
    color: #6b7280;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }
  th {
    background: #f9fafb;
    font-weight: 600;
  }
  .feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
  }
  .feature-item {
    background: #f9fafb;
    padding: 16px;
    border-radius: 8px;
    border-left: 4px solid #dc2626;
  }
  .quote {
    font-size: 1.5em;
    font-style: italic;
    color: #4b5563;
    border-left: 4px solid #dc2626;
    padding-left: 20px;
    margin: 30px 0;
  }
---

<!-- _class: lead -->
<!-- _header: Qwen AI Build Day — Financial Track (sponsored by Shinhan) -->

# Shinhan Voice Agent: AI-Powered Collections & Sales

### Qwen AI Build Day — Financial Track (sponsored by Shinhan)

<div class="gray">
Team: [Your Team Name]
</div>

---

<!-- _class: lead -->

# Your collection team makes 500 calls a day.

- <strong>60%</strong> are simple reminders: "Please pay your bill"
- <strong>20%</strong> are basic questions: "How much do I owe?"
- <strong>15%</strong> need negotiation: "I can't pay full amount"
- <strong>5%</strong> are complex: needs human judgment

---

# But your best collectors spend 80% of their time on the easy 60%.

<div class="gray" style="font-size: 0.9em; margin-top: 40px;">
Meanwhile, the complex cases wait. And wait.
</div>

---

<!-- _class: lead -->

# The Problem (The Data)

<div class="feature-grid">
  <div class="feature-item">
    <strong>Cost Impact</strong>
    <div class="gray">
      Average collection call costs $2-5 per attempt (human agent)
    </div>
  </div>
  <div class="feature-item">
    <strong>High Turnover</strong>
    <div class="gray">
      Vietnam call center turnover is 30-50% annually
    </div>
  </div>
  <div class="feature-item">
    <strong>Compliance Risk</strong>
    <div class="gray">
      Inconsistent messaging causes regulatory issues
    </div>
  </div>
  <div class="feature-item">
    <strong>Peak Bottleneck</strong>
    <div class="gray">
      9-11 AM, 2-4 PM create service delays
    </div>
  </div>
</div>

---

<!-- _class: lead -->

# The Problem (The Data)

<div class="feature-grid">
  <div class="feature-item">
    <strong>Customer Preference</strong>
    <div class="gray">
      Customers prefer self-service for simple inquiries
    </div>
  </div>
</div>

---

<!-- _class: lead -->

# What do collection calls actually need?

<div class="highlight">
Structured conversation with policy boundaries
</div>

---

# What's the human doing that AI can't?

<div class="gray">
Nothing for <strong>80%</strong> of calls. Handling objections, yes. But structured reminders? <strong>No.</strong>
</div>

---

# Where does human judgment matter?

<div class="highlight">
Negotiation, hardship cases, emotional distress.
</div>

---

<!-- _class: lead -->

# The Solution: Shinhan Voice Agent

<div class="feature-grid">
  <div class="feature-item">
    <strong>Automatic First-Touch</strong>
    <div class="gray">
      Handles initial collection calls without human intervention
    </div>
  </div>
  <div class="feature-item">
    <strong>Natural Vietnamese</strong>
    <div class="gray">
      Conversation with tone awareness
    </div>
  </div>
</div>

---

<div class="feature-grid">
  <div class="feature-item">
    <strong>Policy Compliance</strong>
    <div class="gray">
      Stays within script boundaries and offer rules
    </div>
  </div>
  <div class="feature-item">
    <strong>Intent Capture</strong>
    <div class="gray">
      Records customer intent and promise-to-pay commitments
    </div>
  </div>
</div>

---

<div class="feature-item" style="border-left-color: #2563eb;">
  <strong>Intelligent Routing</strong>
  <div class="gray">
    Transfers complex cases to human agents with full conversation context
  </div>
</div>

---

<!-- _class: lead -->

# Let's listen to a call.

<div class="quote">
[Audio/demo placeholder]
</div>

---

# The customer called to ask about their overdue payment.

<div class="gray">
Notice how the bot handles the conversation...
</div>

---

# It answers their question about the amount due.

<div class="gray">
Without hesitation. Without error. Consistently.
</div>

---

# It confirms their promise-to-pay.

<div class="gray">
Logging the commitment for follow-up.
</div>

---

# It offers a payment plan they can afford.

<div class="gray">
Within policy boundaries, customized to their situation.
</div>

---

# All without human intervention.

<div class="gray">
Freeing your best collectors for complex cases.
</div>

---

<!-- _class: lead -->

# How It Works

<div class="gray" style="font-size: 0.95em;">

1. **System pulls** due accounts from CMS
2. **Voice agent initiates** outbound call
3. **Real-time speech recognition** + intent classification
4. **Dynamic response** based on:
   - Customer payment history
   - Policy rules (what can be offered)
   - Conversation state (what's been said)
5. **If customer agrees**: log promise, set reminder
6. **If complex**: warm transfer to human with summary
7. **Post-call**: update CRM, schedule follow-up

</div>

---

<!-- _class: lead -->

# Qwen Voice Advantage

<div style="font-size: 0.9em;">

| Traditional IVR | **Qwen Voice Agent** |
|---|---|
| Press 1 for payments | **Natural conversation** |
| Fixed menu navigation | **Handles unexpected questions** |
| No memory of previous calls | **Full context across interactions** |
| Robotic voice | **Natural Vietnamese speech** |

</div>

---

<!-- _class: lead -->

# Collections Impact

<div class="feature-grid">
  <div class="feature-item">
    <strong>[X]%</strong> of first-touch calls handled automatically
  </div>
  <div class="feature-item">
    <strong>Reduced</strong> cost per collection attempt
  </div>
  <div class="feature-item">
    <strong>Consistent</strong> policy compliance across all calls
  </div>
  <div class="feature-item">
    <strong>Better</strong> prioritization of complex cases
  </div>
</div>

---

# Sales Impact

<div class="feature-grid">
  <div class="feature-item">
    <strong>[X]%</strong> of outbound sales calls handled for product info
  </div>
  <div class="feature-item">
    <strong>24/7</strong> availability for simple inquiries
  </div>
  <div class="feature-item">
    <strong>More</strong> human time for high-value sales conversations
  </div>
</div>

---

<!-- _class: lead -->

# Pilot Plan - Phase 1 (Month 1-2)

<div class="feature-item">
  <strong>Deploy for payment reminder calls</strong>
  <div class="gray">
    Measure: automation rate, customer satisfaction
  </div>
</div>

---

# Pilot Plan - Phase 2 (Month 3-4)

<div class="feature-item">
  <strong>Add negotiation capabilities for hardship cases</strong>
  <div class="gray">
    Measure: promise-to-pay rates, payment outcomes
  </div>
</div>

---

# Pilot Plan - Phase 3 (Month 5-6)

<div class="feature-item">
  <strong>Full integration with CRM and call center</strong>
  <div class="gray">
    Measure: cost per account, collection recovery rate
  </div>
</div>

---

<!-- _class: lead -->

# What We Need

<div class="feature-grid">
  <div class="feature-item">
    Access to collection call scripts and policies
  </div>
  <div class="feature-item">
    Anonymized call recordings for training
  </div>
  <div class="feature-item">
    Integration sandbox with CRM system
  </div>
</div>

---

# What You Get

<div class="feature-grid">
  <div class="feature-item">
    <strong>Working voice agent prototype</strong> (today)
  </div>
  <div class="feature-item">
    <strong>Clear path to production</strong> as first-touch automation
  </div>
  <div class="feature-item">
    <strong>Team that understands</strong> voice AI + banking compliance
  </div>
</div>

---

<!-- _class: lead -->

# Your best collectors should spend time on the cases that need them.

<div class="gray" style="font-size: 0.9em; margin-top: 10px;">
We're handling the rest.
</div>

---

# Shinhan Voice Agent

## AI-Powered Collections & Sales

<div class="gray">
Qwen AI Build Day — Financial Track (sponsored by Shinhan)
</div>
