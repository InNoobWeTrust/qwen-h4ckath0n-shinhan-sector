# Shinhan Soft POS - Frontend

React + Vite prototype for the Shinhan Soft POS merchant operating system.

## Architecture

This frontend is deployed as part of a **Cloudflare Worker** (not a separate hosting service). The Worker serves both the React SPA and the REST API from a single origin.

```
                    Request
                         │
                    ┌────▼────┐
                    │ Worker   │
                    │          │
                    │ /api/*  │──► REST API (D1, R2, KV)
                    │ /*      │──► React SPA (static assets)
                    └─────────┘
```

## Prerequisites

- Node.js 18+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (`npm install -g wrangler`)
- Cloudflare account (free tier works)

## Cloudflare Setup (One-time)

Run these commands after logging in:

```bash
# 1. Login
wrangler login

# 2. Create D1 database
wrangler d1 create shinhan-pos-db

# 3. Create R2 bucket
wrangler r2 bucket create shinhan-pos-receipts

# 4. Create KV namespace
wrangler kv namespace create SESSION
```

### Update `backend/wrangler.toml`

After creating the resources, paste the IDs into `backend/wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "shinhan-pos-db"
database_id = "PASTE_ID_HERE"          # from step 2

[[r2_buckets]]
binding = "RECEIPTS"
bucket_name = "shinhan-pos-receipts"
# No id needed for R2

[[kv_namespaces]]
binding = "SESSION"
id = "PASTE_ID_HERE"                   # from step 4
```

## Local Development

```bash
# From project root — builds frontend + starts Worker
npm run dev
```

This serves:
- **Frontend**: http://localhost:8787/
- **API**: http://localhost:8787/api

For frontend hot-reload only (run API separately):
```bash
# Terminal 1 — API
npm run dev:api

# Terminal 2 — Frontend
VITE_DEV=true VITE_API_URL=http://localhost:8787/api npm run dev --prefix prototype
```

## Database Setup

```bash
# Local D1
npm run db:init

# Remote D1 (production)
npm run db:init:remote
```

## Deploy

```bash
# Single command — builds + deploys Worker + static assets
npm run deploy
```

## Project Structure

```
prototype/
├── src/
│   ├── App.jsx            # Main app (renders AppShell)
│   ├── components/        # UI components
│   │   ├── layout/        # AppShell, TopNav
│   │   ├── Dashboard.jsx  # Tổng quan tab
│   │   └── ...
│   └── data/
│       ├── api.js         # API client
│       └── mockData.js    # Fallback mock data
└── dist/                  # Built static assets (served by Worker)
```

## API Client

`src/data/api.js` uses relative paths by default (`/api`), so it works seamlessly whether running locally via `wrangler dev` or against the deployed Worker.

For local frontend hot-reload without the Worker:
```bash
VITE_DEV=true VITE_API_URL=http://localhost:8787/api npm run dev --prefix prototype
```
