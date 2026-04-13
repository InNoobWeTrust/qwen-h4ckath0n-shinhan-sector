import type { Env } from '../index'
import { validateApiKey } from '../lib/auth'
import { toISOString, generateId, errorResponse, jsonResponse } from '../lib/utils'

export async function handleProducts(request: Request, env: Env): Promise<Response> {
  try {
    const url = new URL(request.url)
    const pathname = url.pathname

    // resolve merchant id from API key
    let merchantId: string | undefined = undefined
    const v = await validateApiKey(request, env as any)
    merchantId = typeof v === 'string' ? v : v?.merchantId
    if (!merchantId) return errorResponse('Unauthorized', 401)

    const db = env.DB

    // GET /api/products
    if (pathname === '/api/products' && request.method === 'GET') {
      const q = `SELECT id, merchant_id, category_id, sku, name, price, cost, stock, low_stock_threshold, unit, is_active, created_at, updated_at FROM products WHERE merchant_id = ? AND is_active = 1 ORDER BY name`
      const res = await db.prepare(q).bind(merchantId).all()
      const rows = (res.results || []).map((r: any) => ({
        ...r,
        created_at: toISOString(r.created_at),
        updated_at: toISOString(r.updated_at),
      }))
      return jsonResponse(rows)
    }

    // match /api/products/:id
    const m = pathname.match(/^\/api\/products\/([^/]+)$/)
    if (m) {
      const id = decodeURIComponent(m[1])

      if (request.method === 'GET') {
        const q = `SELECT * FROM products WHERE id = ? AND merchant_id = ?`
        const res = await db.prepare(q).bind(id, merchantId).first()
        if (!res) return errorResponse('Not Found', 404)
        const row = {
          ...res,
          created_at: toISOString((res as any).created_at),
          updated_at: toISOString((res as any).updated_at),
        }
        return jsonResponse(row)
      }

      if (request.method === 'PATCH') {
        const body = await request.json().catch(() => null)
        if (!body) return errorResponse('Invalid JSON', 400)

        // verify ownership
        const existing = await db.prepare(`SELECT * FROM products WHERE id = ? AND merchant_id = ?`).bind(id, merchantId).first()
        if (!existing) return errorResponse('Not Found', 404)

        const allowed = ['name','sku','category_id','price','cost','stock','low_stock_threshold','unit','is_active']
        const sets: string[] = []
        const binds: any[] = []
        for (const k of allowed) {
          if (Object.prototype.hasOwnProperty.call(body, k)) {
            sets.push(`${k} = ?`)
            binds.push(body[k])
          }
        }
        if (sets.length === 0) return jsonResponse({ message: 'No fields to update' })
        sets.push(`updated_at = unixepoch()`)
        const sql = `UPDATE products SET ${sets.join(', ')} WHERE id = ? AND merchant_id = ?`
        binds.push(id, merchantId)
        await db.prepare(sql).bind(...binds).run()

        const updated = await db.prepare(`SELECT * FROM products WHERE id = ? AND merchant_id = ?`).bind(id, merchantId).first()
        return jsonResponse({
          ...updated,
          created_at: toISOString((updated as any).created_at),
          updated_at: toISOString((updated as any).updated_at),
        })
      }

      if (request.method === 'DELETE') {
        // soft delete
        await db.prepare(`UPDATE products SET is_active = 0, updated_at = unixepoch() WHERE id = ? AND merchant_id = ?`).bind(id, merchantId).run()
        return new Response(null, { status: 204 })
      }
    }

    // POST /api/products
    if (pathname === '/api/products' && request.method === 'POST') {
      const body = await request.json().catch(() => null)
      if (!body) return errorResponse('Invalid JSON', 400)

      const { name, sku = null, category_id = null, price, cost = 0, stock = 0, low_stock_threshold = 10, unit = 'cái' } = body
      if (!name) return errorResponse('name is required', 400)
      if (price == null || !Number.isInteger(price) || price <= 0) return errorResponse('price must be a positive integer', 400)

      const id = generateId('prd')
      const sql = `INSERT INTO products (id, merchant_id, name, sku, category_id, price, cost, stock, low_stock_threshold, unit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      await db.prepare(sql).bind(id, merchantId, name, sku, category_id, price, cost, stock, low_stock_threshold, unit).run()

      const created = await db.prepare(`SELECT * FROM products WHERE id = ? AND merchant_id = ?`).bind(id, merchantId).first()
      return jsonResponse({
        ...created,
        created_at: toISOString((created as any).created_at),
        updated_at: toISOString((created as any).updated_at),
      }, 201)
    }

    return errorResponse('Not Found', 404)
  } catch (err: any) {
    return errorResponse(err?.message || 'Internal Server Error', 500)
  }
}
