/**
 * Convert a Unix epoch (seconds) integer to an ISO 8601 string.
 * Returns null if the value is null/undefined/0.
 */
export function toISOString(epoch: number | null | undefined): string | null {
  if (epoch == null || epoch === 0) return null;
  return new Date(epoch * 1000).toISOString();
}

/**
 * Generate a simple random ID with a given prefix.
 * Uses crypto.randomUUID() which is available in Cloudflare Workers.
 */
export function generateId(prefix: string): string {
  const uuid = crypto.randomUUID();
  return `${prefix}_${uuid.replace(/-/g, '').slice(0, 16)}`;
}

/**
 * Return a JSON error response.
 */
export function errorResponse(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Return a JSON success response.
 */
export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Current Unix epoch in seconds.
 */
export function nowEpoch(): number {
  return Math.floor(Date.now() / 1000);
}
