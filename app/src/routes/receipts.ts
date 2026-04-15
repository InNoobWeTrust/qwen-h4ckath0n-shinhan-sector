import type { Env } from '../index'
import { validateApiKey } from '../lib/auth'
import { toISOString, generateId, errorResponse, jsonResponse } from '../lib/utils'
import { uploadReceipt } from '../lib/r2'

export async function handleReceipts(request: Request, env: Env): Promise<Response> {
  try {
    const db = env.DB
    const v = await validateApiKey(request, env as any)
    const merchantId = typeof v === 'string' ? v : v?.merchantId
    if (!merchantId) return errorResponse('Unauthorized', 401)

    const url = new URL(request.url)
    const pathname = url.pathname

    if (pathname === '/api/receipts' && request.method === 'GET') {
      const q = `SELECT r.*, o.channel, o.total as order_total FROM receipts r JOIN orders o ON r.order_id = o.id WHERE r.merchant_id = ? ORDER BY r.created_at DESC`
      const res = await db.prepare(q).bind(merchantId).all()
      const rows = (res.results || []).map((r: any) => ({ ...r, created_at: toISOString(r.created_at) }))
      return jsonResponse(rows)
    }

    const mDownload = pathname.match(/^\/api\/receipts\/([^/]+)\/download$/)
    if (mDownload && request.method === 'GET') {
      const id = decodeURIComponent(mDownload[1])
      const rec = await db.prepare(`SELECT * FROM receipts WHERE id = ? AND merchant_id = ?`).bind(id, merchantId).first()
      if (!rec) return errorResponse('Not Found', 404)
      const obj = await env.RECEIPTS.get(rec.r2_key)
      if (!obj) return errorResponse('Not Found', 404)
      const headers = new Headers({ 'Content-Type': obj.httpMetadata?.contentType || 'application/octet-stream' })
      return new Response(obj.body, { status: 200, headers })
    }

    if (pathname === '/api/receipts' && request.method === 'POST') {
      const contentType = request.headers.get('content-type') || ''
      if (!contentType.startsWith('multipart/form-data')) return errorResponse('Content-Type must be multipart/form-data', 400)

      const form = await request.formData()
      const order_id = form.get('order_id') as string | null
      const file = form.get('file') as File | null
      if (!order_id) return errorResponse('order_id required', 400)
      if (!file) return errorResponse('file required', 400)

      const ord = await db.prepare(`SELECT * FROM orders WHERE id = ? AND merchant_id = ?`).bind(order_id, merchantId).first()
      if (!ord) return errorResponse('Order not found', 400)

      const arrayBuffer = await file.arrayBuffer()
      const content_type = file.type || 'application/octet-stream'
      const r2Key = await uploadReceipt(env.RECEIPTS, order_id, merchantId, arrayBuffer, content_type)

      const id = generateId('rcp')
      await db.prepare(`INSERT INTO receipts (id, merchant_id, order_id, r2_key, status) VALUES (?, ?, ?, ?, ?)`).bind(id, merchantId, order_id, r2Key, 'pending').run()
      const created = await db.prepare(`SELECT * FROM receipts WHERE id = ?`).bind(id).first()
      return jsonResponse(created, 201)
    }

    return errorResponse('Not Found', 404)
  } catch (err: any) {
    return errorResponse(err?.message || 'Internal Server Error', 500)
  }
}
