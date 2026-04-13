import type { Env } from '../index';

// Prototype: single hardcoded API key
// In production, replace with KV/D1 lookup
const DEMO_KEY = 'Bearer shinhan-pos-demo-key-2024';

// Merchant associated with the demo key (matches seed data)
const DEMO_MERCHANT_ID = 'mer_tamduc_q7';

/**
 * Validates the Authorization header against the demo API key.
 * Returns merchant_id if valid.
 * Throws a Response with 401 status if invalid.
 */
export async function validateApiKey(request: Request, _env?: any): Promise<string> {
  const authorization = request.headers.get('Authorization');

  if (!authorization || authorization !== DEMO_KEY) {
    throw new Response(
      JSON.stringify({ error: 'Unauthorized', message: 'Invalid or missing API key' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return DEMO_MERCHANT_ID;
}
