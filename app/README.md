# Shinhan Soft POS — Backend (Cloudflare Workers)

## Stack

- **Workers** — Cloudflare Workers (ES2022 TypeScript)
- **D1** — SQLite database (D1 binding: `DB`)
- **R2** — Object storage for receipts (R2 binding: `REIPTS`)
- **KV** — Session/cache (KV binding: `SESSION`)

## Setup

### 1. Install dependencies

```bash
npm install -g wrangler
cd backend
npm install
```

### 2. Create D1 database

```bash
wrangler d1 create shinhan-pos-db
```

Copy the `database_id` from the output and paste it into `wrangler.toml` under `[[d1_databases]]`.

### 3. Create R2 bucket

```bash
wrangler r2 bucket create shinhan-pos-receipts
```

### 4. Run migrations

```bash
wrangler d1 migrations apply shinhan-pos-db --local   # local dev
wrangler d1 migrations apply shinhan-pos-db --remote   # production
```

### 5. Seed data

```bash
wrangler d1 execute shinhan-pos-db --local --file=seeds/seed.sql
wrangler d1 execute shinhan-pos-db --remote --file=seeds/seed.sql
```

### 6. Local dev

```bash
wrangler dev --local
# API available at http://localhost:8787/api
```

### 7. Deploy

```bash
wrangler deploy
```

## API Endpoints

All endpoints require:
```
Authorization: Bearer shinhan-pos-demo-key-2024
Content-Type: application/json
```

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/merchants` | Get merchant info |
| GET | `/api/products` | List products/inventory |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product |
| PATCH | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Soft-delete product |
| GET | `/api/orders` | List orders (filters: channel, status, limit, offset) |
| GET | `/api/orders/:id` | Get order with items |
| POST | `/api/orders` | Create order |
| PATCH | `/api/orders/:id` | Update order (status, settled) |
| GET | `/api/staff` | List staff |
| POST | `/api/staff` | Create staff |
| GET | `/api/shifts/active` | Get active shift + staff on shift |
| POST | `/api/shifts` | Open a new shift |
| PATCH | `/api/shifts/:id/close` | Close a shift |
| GET | `/api/receipts` | List receipts |
| GET | `/api/receipts/:id/download` | Download receipt PDF |
| POST | `/api/receipts` | Upload receipt (multipart/form-data) |

## Schema

See `migrations/0001_initial.sql` for full schema documentation.

## Seed Data

The seed creates:
- 1 merchant: "Cửa hàng tiện lợi Tâm Đức" (District 7, HCMC)
- 3 staff (1 manager, 2 cashiers)
- 22 products across 5 categories
- 13 orders across POS, Shopee, TikTok, MoMo
- Active morning shift with 2 staff
- Sample receipts

## Frontend Integration

The React prototype at `prototype/src/data/api.js` contains a ready-to-use API client.

Point `API_BASE` in `api.js` to your deployed worker URL when ready to connect to production.
