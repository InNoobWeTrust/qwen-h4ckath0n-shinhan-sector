import { Hono } from 'hono'
import { reactRenderer } from '@hono/react-renderer'
import { handleProducts } from './routes/products'
import { handleOrders } from './routes/orders'
import { handleStaff } from './routes/staff'
import { handleShifts } from './routes/shifts'
import { handleReceipts } from './routes/receipts'
import { handleMerchants } from './routes/merchants'
import { errorResponse, jsonResponse, toISOString } from './lib/utils'

export interface Env {
  DB: D1Database
  RECEIPTS: R2Bucket
  SESSION: KVNamespace
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
}

const app = new Hono<{ Bindings: Env }>()

// CORS preflight
app.options('*', (c) => {
  return c.text('', 204, CORS_HEADERS as any)
})

// ── SSR Page ─────────────────────────────────────────────────
app.use(
  reactRenderer(({ children }) => {
    return (
      <html lang="vi">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Shinhan Soft POS</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <style>{`body { font-family: 'Be Vietnam Pro', sans-serif; }`}</style>
        </head>
        <body>
          <div id="root">{children}</div>
        </body>
      </html>
    )
  })
)

// ── API Routes ──────────────────────────────────────────────
app.all('/api/:path*', async (c) => {
  const path = `/api/${c.req.param('path')}`
  const method = c.req.method
  const request = new Request(c.req.raw.url, {
    method,
    headers: c.req.header(),
    body: ['POST', 'PATCH', 'PUT'].includes(method) ? await c.req.raw.arrayBuffer() : undefined,
  })

  let resp: Response
  if (path === '/api/merchants' || path.startsWith('/api/merchants/')) {
    resp = await handleMerchants(request, c.env as any)
  } else if (path === '/api/products' || path.startsWith('/api/products/')) {
    resp = await handleProducts(request, c.env as any)
  } else if (path === '/api/orders' || path.startsWith('/api/orders/')) {
    resp = await handleOrders(request, c.env as any)
  } else if (path === '/api/staff' || path.startsWith('/api/staff/')) {
    resp = await handleStaff(request, c.env as any)
  } else if (path === '/api/shifts' || path.startsWith('/api/shifts/')) {
    resp = await handleShifts(request, c.env as any)
  } else if (path === '/api/receipts' || path.startsWith('/api/receipts/')) {
    resp = await handleReceipts(request, c.env as any)
  } else {
    resp = errorResponse('Not Found', 404)
  }

  const headers = new Headers(Object.fromEntries(resp.headers))
  for (const [k, v] of Object.entries(CORS_HEADERS)) {
    headers.set(k, v)
  }
  return new Response(resp.body, { status: resp.status, headers })
})

// ── SSR Dashboard (/) ───────────────────────────────────────
app.get('/', async (c) => {
  const db = c.env.DB

  // Fetch initial data server-side — no auth needed for demo
  const merchant = await db.prepare(`SELECT * FROM merchants LIMIT 1`).first()
  const products = await db.prepare(`SELECT * FROM products WHERE is_active = 1`).all()
  const orders = await db.prepare(`SELECT * FROM orders ORDER BY created_at DESC LIMIT 20`).all()
  const staff = await db.prepare(`SELECT * FROM staff WHERE is_active = 1`).all()
  const shift = await db.prepare(`SELECT * FROM shifts WHERE status = 'active' LIMIT 1`).first()
  const shiftStaff = shift
    ? await db.prepare(`SELECT s.* FROM staff s JOIN shifts sh ON sh.staff_id = s.id WHERE sh.status = 'active'`).all()
    : { results: [] }

  const initialData = {
    merchant,
    products: (products.results || []).map((r: any) => ({ ...r, created_at: toISOString(r.created_at), updated_at: toISOString(r.updated_at) })),
    orders: (orders.results || []).map((r: any) => ({ ...r, created_at: toISOString(r.created_at) })),
    staff: staff.results || [],
    activeShift: shift,
    shiftStaff: shiftStaff.results || [],
  }

  // Import React app dynamically to avoid circular deps
  const { App } = await import('./frontend/App.jsx')
  return c.render(<App initialData={initialData} />)
})

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return app.fetch(request, env, ctx)
  },
}