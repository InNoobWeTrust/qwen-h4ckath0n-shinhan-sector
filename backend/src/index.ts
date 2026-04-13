import { handleMerchants } from './routes/merchants'
import { handleProducts } from './routes/products'
import { handleOrders } from './routes/orders'
import { handleStaff } from './routes/staff'
import { handleShifts } from './routes/shifts'
import { handleReceipts } from './routes/receipts'
import { errorResponse, jsonResponse } from './lib/utils'

export interface Env {
  DB: D1Database
  RECEIPTS: R2Bucket
  SESSION: KVNamespace
  ASSETS?: any
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
}

function addCors(res: Response): Response {
  const headers = new Headers(Object.fromEntries(res.headers))
  for (const k in CORS_HEADERS) headers.set(k, (CORS_HEADERS as any)[k])
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const url = new URL(request.url)

      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS_HEADERS })
      }

      const path = url.pathname

      // Non-API routes: serve from static assets (SPA fallback)
      if (!path.startsWith('/api/')) {
        return env.ASSETS.fetch(request)
      }

      let resp: Response

      if (path === '/api/health') {
        resp = jsonResponse({ status: 'ok', timestamp: new Date().toISOString() })
      } else if (path === '/api/merchants' || path.startsWith('/api/merchants/')) {
        resp = await handleMerchants(request, env as any)
      } else if (path === '/api/products' || path.startsWith('/api/products/')) {
        resp = await handleProducts(request, env as any)
      } else if (path === '/api/orders' || path.startsWith('/api/orders/')) {
        resp = await handleOrders(request, env as any)
      } else if (path === '/api/staff' || path.startsWith('/api/staff/')) {
        resp = await handleStaff(request, env as any)
      } else if (path === '/api/shifts' || path.startsWith('/api/shifts/')) {
        resp = await handleShifts(request, env as any)
      } else if (path === '/api/receipts' || path.startsWith('/api/receipts/')) {
        resp = await handleReceipts(request, env as any)
      } else {
        resp = errorResponse('Not Found', 404)
      }

      return addCors(resp)
    } catch (err) {
      return addCors(errorResponse('Internal Server Error', 500))
    }
  },
}
