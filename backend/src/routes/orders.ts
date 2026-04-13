import type { Env } from '../index'
import { validateApiKey } from '../lib/auth'
import { toISOString, generateId, errorResponse, jsonResponse } from '../lib/utils'

export async function handleOrders(request: Request, env: Env): Promise<Response> {
  try {
    const url = new URL(request.url)
    const pathname = url.pathname
    const db = env.DB

    const v = await validateApiKey(request, env as any)
    const merchantId = typeof v === 'string' ? v : v?.merchantId
    if (!merchantId) return errorResponse('Unauthorized', 401)

    if (pathname === '/api/orders' && request.method === 'GET') {
      const params = url.searchParams
      const channel = params.get('channel')
      const status = params.get('status')
      const limit = Number(params.get('limit') || 50)
      const offset = Number(params.get('offset') || 0)

      let where = `WHERE o.merchant_id = ?`
      const binds: any[] = [merchantId]
      if (channel) {
        where += ` AND o.channel = ?`
        binds.push(channel)
      }
      if (status) {
        where += ` AND o.status = ?`
        binds.push(status)
      }

      const totalRes = await db.prepare(`SELECT COUNT(*) as cnt FROM orders o ${where}`).bind(...binds).first()
      const total = totalRes?.cnt || 0

      const q = `SELECT o.* FROM orders o ${where} ORDER BY o.created_at DESC LIMIT ? OFFSET ?`
      const rowsRes = await db.prepare(q).bind(...binds, limit, offset).all()
      const orders = (rowsRes.results || [])

      // expand items for each order
      const expanded = []
      for (const ord of orders) {
        const itemsRes = await db.prepare(`SELECT oi.*, p.name as product_name FROM order_items oi LEFT JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?`).bind(ord.id).all()
        expanded.push({
          ...ord,
          created_at: toISOString(ord.created_at),
          updated_at: toISOString(ord.updated_at),
          items: (itemsRes.results || []).map((it: any) => ({ ...it })),
        })
      }

      return jsonResponse({ orders: expanded, total })
    }

    const m = pathname.match(/^\/api\/orders\/([^/]+)$/)
    if (m) {
      const id = decodeURIComponent(m[1])
      if (request.method === 'GET') {
        const order = await db.prepare(`SELECT * FROM orders WHERE id = ? AND merchant_id = ?`).bind(id, merchantId).first()
        if (!order) return errorResponse('Not Found', 404)
        const itemsRes = await db.prepare(`SELECT oi.*, p.name as product_name FROM order_items oi LEFT JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?`).bind(id).all()
        return jsonResponse({
          ...order,
          created_at: toISOString(order.created_at),
          updated_at: toISOString(order.updated_at),
          items: (itemsRes.results || []).map((it: any) => ({ ...it })),
        })
      }

      if (request.method === 'PATCH') {
        const body = await request.json().catch(() => null)
        if (!body) return errorResponse('Invalid JSON', 400)

        // ownership
        const existing = await db.prepare(`SELECT * FROM orders WHERE id = ? AND merchant_id = ?`).bind(id, merchantId).first()
        if (!existing) return errorResponse('Not Found', 404)

        const sets: string[] = []
        const binds: any[] = []
        if (body.status) {
          sets.push(`status = ?`)
          binds.push(body.status)
        }
        if (typeof body.settled !== 'undefined') {
          sets.push(`settled = ?`)
          binds.push(body.settled ? 1 : 0)
          if (body.settled) sets.push(`settled_at = unixepoch()`)
        }
        if (sets.length === 0) return jsonResponse({ message: 'No fields to update' })
        const sql = `UPDATE orders SET ${sets.join(', ')}, updated_at = unixepoch() WHERE id = ? AND merchant_id = ?`
        binds.push(id, merchantId)
        await db.prepare(sql).bind(...binds).run()

        const updated = await db.prepare(`SELECT * FROM orders WHERE id = ? AND merchant_id = ?`).bind(id, merchantId).first()
        return jsonResponse({ ...updated, created_at: toISOString(updated.created_at), updated_at: toISOString(updated.updated_at) })
      }
    }

    if (pathname === '/api/orders' && request.method === 'POST') {
      const body = await request.json().catch(() => null)
      if (!body) return errorResponse('Invalid JSON', 400)
      const { channel, items, customer_name = null, customer_phone = null, notes = null, discount = 0 } = body
      const allowedChannels = ['POS','Shopee','TikTok','MoMo']
      if (!allowedChannels.includes(channel)) return errorResponse('Invalid channel', 400)
      if (!Array.isArray(items) || items.length === 0) return errorResponse('items required', 400)

      // compute prices
      let subtotal = 0
      const computedItems: any[] = []
      for (const it of items) {
        const prod = await db.prepare(`SELECT id, price, stock FROM products WHERE id = ? AND merchant_id = ?`).bind(it.product_id, merchantId).first()
        if (!prod) return errorResponse(`Product not found: ${it.product_id}`, 400)
        const qty = Number(it.quantity || 0)
        const total_price = prod.price * qty
        subtotal += total_price
        computedItems.push({ product_id: prod.id, quantity: qty, price: prod.price, total_price })
      }

      const total = Math.max(0, subtotal - (discount || 0))

      const orderId = generateId('ord')
      await db.prepare(`INSERT INTO orders (id, merchant_id, channel, subtotal, discount, total, customer_name, customer_phone, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(orderId, merchantId, channel, subtotal, discount, total, customer_name, customer_phone, notes, 'pending').run()

      const itemsOut: any[] = []
      for (const it of computedItems) {
        const oiId = generateId('oi')
        await db.prepare(`INSERT INTO order_items (id, order_id, product_id, quantity, price, total_price) VALUES (?, ?, ?, ?, ?, ?)`).bind(oiId, orderId, it.product_id, it.quantity, it.price, it.total_price).run()
        await db.prepare(`UPDATE products SET stock = stock - ? WHERE id = ?`).bind(it.quantity, it.product_id).run()
        itemsOut.push({ id: oiId, order_id: orderId, ...it })
      }

      const created = await db.prepare(`SELECT * FROM orders WHERE id = ?`).bind(orderId).first()
      return jsonResponse({ ...created, items: itemsOut }, 201)
    }

    return errorResponse('Not Found', 404)
  } catch (err: any) {
    return errorResponse(err?.message || 'Internal Server Error', 500)
  }
}
