import type { Env } from '../index'
import { validateApiKey } from '../lib/auth'
import { toISOString, generateId, errorResponse, jsonResponse } from '../lib/utils'

export async function handleShifts(request: Request, env: Env): Promise<Response> {
  try {
    const db = env.DB
    const v = await validateApiKey(request, env as any)
    const merchantId = typeof v === 'string' ? v : v?.merchantId
    if (!merchantId) return errorResponse('Unauthorized', 401)

    const url = new URL(request.url)
    const pathname = url.pathname

    if (pathname === '/api/shifts/active' && request.method === 'GET') {
      const shift = await db.prepare(`SELECT * FROM shifts WHERE merchant_id = ? AND status = 'active' LIMIT 1`).bind(merchantId).first()
      const staffRes = await db.prepare(`SELECT s.* FROM staff s JOIN shifts sh ON sh.staff_id = s.id WHERE sh.merchant_id = ? AND sh.status = 'active'`).bind(merchantId).all()
      return jsonResponse({ shift: shift || null, staff_on_shift: (staffRes.results || []) })
    }

    if (pathname === '/api/shifts' && request.method === 'POST') {
      const body = await request.json().catch(() => null)
      if (!body) return errorResponse('Invalid JSON', 400)
      const { staff_id } = body
      if (!staff_id) return errorResponse('staff_id required', 400)

      const staff = await db.prepare(`SELECT * FROM staff WHERE id = ? AND merchant_id = ? AND is_active = 1`).bind(staff_id, merchantId).first()
      if (!staff) return errorResponse('Staff not found or inactive', 400)

      const existing = await db.prepare(`SELECT * FROM shifts WHERE staff_id = ? AND merchant_id = ? AND status = 'active'`).bind(staff_id, merchantId).first()
      if (existing) return errorResponse('Staff already has an active shift', 400)

      const id = generateId('shf')
      await db.prepare(`INSERT INTO shifts (id, merchant_id, staff_id, start_time, status) VALUES (?, ?, ?, unixepoch(), ?)`).bind(id, merchantId, staff_id, 'active').run()
      const created = await db.prepare(`SELECT * FROM shifts WHERE id = ?`).bind(id).first()
      return jsonResponse(created, 201)
    }

    const mClose = pathname.match(/^\/api\/shifts\/([^/]+)\/close$/)
    if (mClose && request.method === 'PATCH') {
      const id = decodeURIComponent(mClose[1])
      const existing = await db.prepare(`SELECT * FROM shifts WHERE id = ? AND merchant_id = ?`).bind(id, merchantId).first()
      if (!existing) return errorResponse('Not Found', 404)
      await db.prepare(`UPDATE shifts SET end_time = unixepoch(), status = 'closed' WHERE id = ? AND merchant_id = ?`).bind(id, merchantId).run()
      const updated = await db.prepare(`SELECT * FROM shifts WHERE id = ?`).bind(id).first()
      return jsonResponse(updated)
    }

    return errorResponse('Not Found', 404)
  } catch (err: any) {
    return errorResponse(err?.message || 'Internal Server Error', 500)
  }
}
