import { validateApiKey } from '../lib/auth';
import { toISOString, jsonResponse, errorResponse } from '../lib/utils';
import type { Env } from '../index';

export async function handleMerchants(
  request: Request,
  env: Env
): Promise<Response> {
  const merchantId = await validateApiKey(request);

  // GET /api/merchants
  if (request.method === 'GET') {
    const row = await env.DB.prepare(
      'SELECT id, name, address, phone, created_at, updated_at FROM merchants WHERE id = ?'
    )
      .bind(merchantId)
      .first<{
        id: string;
        name: string;
        address: string | null;
        phone: string | null;
        created_at: number;
        updated_at: number;
      }>();

    if (!row) {
      return errorResponse('Merchant not found', 404);
    }

    return jsonResponse({
      id: row.id,
      name: row.name,
      address: row.address,
      phone: row.phone,
      created_at: toISOString(row.created_at),
      updated_at: toISOString(row.updated_at),
    });
  }

  return errorResponse('Method Not Allowed', 405);
}
