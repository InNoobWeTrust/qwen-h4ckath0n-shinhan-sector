import type { Env } from '../index'
import { validateApiKey } from '../lib/auth'
import { toISOString, generateId, errorResponse, jsonResponse } from '../lib/utils'

export async function handleStaff(request: Request, env: Env): Promise<Response> {
  try {
    const db = env.DB
    const v = await validateApiKey(request, env as any)
    const merchantId = typeof v === 'string' ? v : v?.merchantId
    if (!merchantId) return errorResponse('Unauthorized', 401)

    const url = new URL(request.url)
    const pathname = url.pathname

    if (pathname === '/api/staff' && request.method === 'GET') {
      const q = `SELECT id, merchant_id, name, role, phone, is_active, created_at FROM staff WHERE merchant_id = ? AND is_active = 1`
      const res = await db.prepare(q).bind(merchantId).all()
      const rows = (res.results || []).map((r: any) => ({ ...r, created_at: toISOString(r.created_at) }))
      return jsonResponse(rows)
    }

    if (pathname === '/api/staff' && request.method === 'POST') {
      const body = await request.json().catch(() => null)
      if (!body) return errorResponse('Invalid JSON', 400)
      const { name, role, phone = null, pin = null } = body
      const roles = ['cashier','manager','admin']
      if (!name) return errorResponse('name required', 400)
      if (!roles.includes(role)) return errorResponse('invalid role', 400)

      const id = generateId('stf')
      await db.prepare(`INSERT INTO staff (id, merchant_id, name, role, phone, pin) VALUES (?, ?, ?, ?, ?, ?)`).bind(id, merchantId, name, role, phone, pin).run()
      const created = await db.prepare(`SELECT * FROM staff WHERE id = ? AND merchant_id = ?`).bind(id, merchantId).first()
      return jsonResponse({ ...created, created_at: toISOString((created as any).created_at) }, 201)
    }

    return errorResponse('Not Found', 404)
  } catch (err: any) {
    return errorResponse(err?.message || 'Internal Server Error', 500)
  }
}
