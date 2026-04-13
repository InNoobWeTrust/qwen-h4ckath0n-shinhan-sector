# Deployment Guide

## Architecture

```
                          ┌──────────────────────────┐
                          │  Cloudflare Worker         │
                          │  shinhan-pos.<account>     │
                          │  .workers.dev              │
                          │                            │
                          │  ├── /api/*  → REST API   │
                          │  │            → D1/R2/KV  │
                          │  │                           │
                          │  └── /*     → React SPA    │
                          │              (static dist) │
                          └──────────────────────────┘
```

Single Worker, single deploy, single URL. Frontend and API are served from the same origin — no CORS, no separate hosting.

---

## Prerequisites

```bash
npm install -g wrangler
wrangler login
```

---

## One-time Cloudflare Setup

### 1. Create D1 database

```bash
wrangler d1 create shinhan-pos-db
```

Copy the `database_id` from the output. Paste it into `backend/wrangler.toml` under `[[d1_databases]]`.

### 2. Create R2 bucket

```bash
wrangler r2 bucket create shinhan-pos-receipts
```

### 3. Create KV namespace for sessions

```bash
wrangler kv:namespace create SESSION
```

Paste the `id` into `backend/wrangler.toml` under `[[kv_namespaces]]`.

---

## Database Setup

```bash
# Local development
npm run db:init

# Production
npm run db:init:remote
```

---

## Local Development

```bash
# Full stack (builds frontend, starts API with assets)

# API only
npm run dev:api

# Frontend hot-reload (needs API running separately)
```

---

## Deploy

```bash
wrangler deploy --cwd backend
```

This builds `prototype/dist` and deploys the Worker + static assets in a single operation.

---

## Quick Reference

| Command | What it does |
|---------|-------------|
| `npm run dev` | Build frontend + start Worker locally |
| `npm run db:init` | Run migrations + seed (local D1) |
| `npm run deploy` | Build + deploy Worker to Cloudflare |
| `wrangler dev --local --cwd backend` | Start Worker locally |
| `wrangler deploy --cwd backend` | Deploy Worker + assets |

---

## How Routing Works

1. Request arrives at Worker
2. If pathname starts with `/api/` → route to REST handlers
3. Otherwise → serve from static assets (`env.ASSETS.fetch`)
4. `not_found_handling = "single-page-application"` returns `index.html` for unmatched routes
```
