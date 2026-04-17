<div align="center">

# Shinhan Soft POS + AI Credit Scoring

**AI-powered credit scoring for Vietnamese SME merchants — built on Cloudflare Workers**

[![Shinhan Soft POS — home page](docs/images/%5Bqwen%20x%20shinhan%5D%20Shinhan%20Soft%20POS%20-%20home.png)](docs/images/%5Bqwen%20x%20shinhan%5D%20Shinhan%20Soft%20POS%20-%20home.png)

https://github.com/user-attachments/assets/a678cbe4-e7d7-4cb2-8b26-7ea4cc2cc204

[![Deploy to Cloudflare](https://img.shields.io/badge/Deploy-Cloudflare%20Workers-orange?logo=cloudflare)](https://developers.cloudflare.com/workers/)
[![React Router](https://img.shields.io/badge/Frontend-React%20Router%20v7-blue?logo=react)](https://reactrouter.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38b2ac?logo=tailwindcss)](https://tailwindcss.com/)

**Qwen AI Build Day — Financial Track (sponsored by Shinhan)** — Alternative credit scoring for the 59.5% of Vietnamese SMEs excluded from formal banking.

</div>

---

## 🎯 What Was Built

Two integrated products in one Cloudflare Workers deployment:

### 1. Shinhan Soft POS
Operational dashboard for convenience stores and SME merchants — orders, inventory, staff shifts, receipts, and daily business overview.

### 2. AI Credit Scoring Mini-App
Explainable credit scoring engine with AI-powered Vietnamese explanations. Scores 5 merchant profiles on a 300–850 scale using 4 pillars (revenue, stability, payment quality, data diversity). Users configure their own AI provider — the app never touches credentials.

[!["Credit Score Rating Gauge"](docs/images/%5Bqwen%20x%20shinhan%5D%20rating_gauge.png)](docs/images/%5Bqwen%20x%20shinhan%5D%20rating_gauge.png)

---

## ✨ Features

### POS Operations

| Module | Description |
|--------|-------------|
| **Tổng quan** | Business dashboard with revenue chart, recent transactions, top products, staff on shift |
| **Đơn hàng** | Multi-channel orders: POS, Shopee, TikTok, MoMo — with settlement status tracking |
| **Kho hàng** | Inventory table, low stock alerts, reorder suggestions |
| **Nhân viên** | Shift management, staff performance, on-shift roster |
| **Biên lai** | Receipt center with print actions and preview |

[!["Orders"](docs/images/%5Bqwen%20x%20shinhan%5D%20Shinhan%20Soft%20POS%20-%20orders.png)](docs/images/%5Bqwen%20x%20shinhan%5D%20Shinhan%20Soft%20POS%20-%20orders.png) [!["Warehouse"](docs/images/%5Bqwen%20x%20shinhan%5D%20Shinhan%20Soft%20POS%20-%20warehouse.png)](docs/images/%5Bqwen%20x%20shinhan%5D%20Shinhan%20Soft%20POS%20-%20warehouse.png) [!["Employee"](docs/images/%5Bqwen%20x%20shinhan%5D%20Shinhan%20Soft%20POS%20-%20employee.png)](docs/images/%5Bqwen%20x%20shinhan%5D%20Shinhan%20Soft%20POS%20-%20employee.png) [!["Bill"](docs/images/%5Bqwen%20x%20shinhan%5D%20Shinhan%20Soft%20POS%20-%20bill.png)](docs/images/%5Bqwen%20x%20shinhan%5D%20Shinhan%20Soft%20POS%20-%20bill.png)

### Credit Scoring

**5 Merchant Profiles** with distinct risk profiles:

| Merchant | Business | Score | Band | Limit |
|----------|----------|------:|------|------:|
| Chị Linh | Cửa hàng tiện lợi 24/7 | 760 | Tốt | 95M |
| Anh Hùng | Quán trà sữa | 640 | Trung bình | 30M |
| Chị Mai | Hàng quán vỉa hè | 480 | Yếu nhiều | 0 |
| Anh Khoa | Cửa hàng linh kiện điện tử | 700+ | Khá | 75M |
| Chị Thảo | Cửa hàng thời trang | 700+ | Khá | 75M |

**Scoring Formula:**
```
score = (revenue × 0.35 + stability × 0.25 + payment × 0.25 + diversity × 0.15) × 8.5 + 300
```

**4 Pillars:** Doanh thu (35%) · Ổn định (25%) · Thanh toán (25%) · Đa dạng (15%)

**AI Explainability** — Configure any OpenAI-compatible provider (Puter, Kilo, Groq, Alibaba Qwen, OpenRouter). AI explanations in Vietnamese via direct browser calls — no proxy, no server-side API costs.

[!["Loan Application"](docs/images/%5Bqwen%20x%20shinhan%5D%20Shinhan%20Soft%20POS%20-%20loan.png)](docs/images/%5Bqwen%20x%20shinhan%5D%20Shinhan%20Soft%20POS%20-%20loan.png) [!["Lending Analytics"](docs/images/%5Bqwen%20x%20shinhan%5D%20lending%20analytics.png)](docs/images/%5Bqwen%20x%20shinhan%5D%20lending%20analytics.png)

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Cloudflare Workers (ES2022 TypeScript) |
| Frontend | React Router v7 (SPA, Cloudflare Pages) |
| Database | Cloudflare D1 (SQLite) |
| Object Storage | Cloudflare R2 (receipts) |
| Session Cache | Cloudflare KV |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Charts | Recharts |
| Markdown | marked |
| AI Integration | Browser-direct (Kilo, Groq, Alibaba Qwen, OpenRouter) + Puter SDK |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- `wrangler` CLI (`npm install -g wrangler`)
- Cloudflare account (for remote deployment)

### Local Development

```bash
# Install dependencies
cd app && npm install

# Initialize local D1 database
npm run db:init

# Start dev server → http://localhost:8787
npm run dev
```

### Build & Deploy

```bash
npm run build    # Production build
npm run deploy   # Deploy to Cloudflare Workers
```

---

## 🤖 AI Provider Configuration

The credit scoring feature lets users configure any OpenAI-compatible AI provider. Credentials are stored in `sessionStorage` — each provider is independent and the app never touches credentials server-side.

| Provider | Auth | Base URL |
|----------|------|----------|
| **Puter** | SDK popup (Google/email) | Built-in — free auth, 500+ models |
| **Kilo** | API key | `https://api.kilo.ai/api/gateway` |
| **Groq** | API key | `https://api.groq.com/openai/v1` |
| **Alibaba Qwen** | API key | `https://dashscope-intl.aliyuncs.com/compatible-mode/v1` |
| **OpenRouter** | API key | `https://openrouter.ai/api/v1` |
| **Custom** | API key + URL | Any OpenAI-compatible endpoint |

> **CORS Note:** Browser CORS restrictions may block direct AI API calls. For Kilo and others, disable CORS in your browser. Puter SDK handles CORS internally.

---

## 📁 Project Structure

```
shinhan-sector/
├── app/
│   ├── components/
│   │   ├── layout/          # AppShell, TopNav
│   │   ├── ui/             # ProviderCredentialsModal, ExplanationPanel,
│   │   │                   # ModelSelector, SparkleButton
│   │   ├── CreditScorePanel.jsx    # Dashboard score preview
│   │   ├── CreditScoreModal.jsx    # Score detail + gauge
│   │   ├── LoanApplicationModal.jsx # 4-step loan flow
│   │   ├── Dashboard.jsx           # POS overview
│   │   ├── OrdersHub.jsx           # Multi-channel orders
│   │   ├── InventoryOverview.jsx    # Inventory management
│   │   ├── ShiftOverview.jsx        # Staff & shifts
│   │   ├── ReceiptCenter.jsx       # Receipt management
│   │   └── capital/                # Capital support cards
│   ├── hooks/
│   │   └── useExplanation.ts       # AI explanation hook
│   ├── routes/
│   │   ├── home.tsx               # AppShell entry
│   │   ├── von-kinh-doanh.tsx     # Credit scoring page
│   │   └── api/                   # Hono API routes
│   ├── src/lib/
│   │   ├── creditScoring.ts       # Score computation + bands
│   │   ├── mockMerchants.ts       # 5 merchant profiles
│   │   ├── reasonCodes.ts          # 10 reason codes (VI/EN)
│   │   └── explainSession.ts       # Provider credential storage
│   └── workers/
│       └── app.ts                  # Hono worker entry point
├── docs/
│   ├── prd/                       # Product Requirement Documents
│   ├── trd/                       # Technical Requirement Documents
│   ├── specs/                     # Feature specifications
│   ├── research/                  # Use case analysis, competitors
│   ├── pitch/                    # Pitch deck sources
│   ├── hackathon/                # Hackathon-specific specs
│   └── videos/                   # Demo video + director's cut
├── wrangler.toml
└── package.json
```

---

## 🎯 Key Design Decisions

### WoE Scorecard (Not Black-Box ML)
The production scoring path uses Weight-of-Evidence logistic regression — the same model type traditional banks use. Every score is fully reproducible from audit logs; reason codes are fixed pre-approved vocabulary. No neural nets or LLMs in the production decision path.

### Browser-Direct AI Calls
AI explanation generation happens entirely in the browser. Credentials stay in `sessionStorage` and calls go direct to providers — no server-side API costs and no credential management.

### Why Puter SDK
Puter provides free popup authentication and access to 500+ models. The default "zero-setup" option for users without an existing AI account.

---

## 📄 License

MIT — Qwen AI Build Day — Financial Track (sponsored by Shinhan)
