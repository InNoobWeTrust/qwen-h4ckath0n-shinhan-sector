import type { Env } from '../index';

/**
 * Upload a receipt file to R2.
 * Returns the r2_key used to store the object.
 */
export async function uploadReceipt(
  bucket: R2Bucket,
  orderId: string,
  merchantId: string,
  body: ArrayBuffer,
  contentType: string
): Promise<string> {
  const date = new Date();
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');

  const extension = contentTypeToExtension(contentType);
  const r2Key = `receipts/${merchantId}/${yyyy}/${mm}/${dd}/${orderId}${extension}`;

  await bucket.put(r2Key, body, {
    httpMetadata: { contentType },
    customMetadata: { orderId, merchantId },
  });

  return r2Key;
}

/**
 * Generate a pre-signed URL for downloading a receipt from R2.
 * Expires in 1 hour (3600 seconds).
 *
 * Note: Cloudflare R2 presigned URLs require aws4fetch or the R2 binding's
 * createPresignedUrl method (Workers binding). For the prototype we use
 * a public-path approach via signed URL workaround — if the bucket is
 * private, use bucket.createMultipartUpload or the R2 binding method below.
 */
export async function getReceiptUrl(
  bucket: R2Bucket,
  r2Key: string
): Promise<string> {
  // R2 Workers binding does not expose createPresignedUrl directly.
  // For the prototype, we return a download endpoint URL that the Worker
  // itself serves by streaming from R2. This avoids needing public access.
  // The caller should proxy through /api/receipts/:id/download.
  //
  // If you want a real pre-signed URL, use the R2 REST API with HMAC signing.
  // For now, return the key so the caller can construct the internal URL.
  return r2Key;
}

/**
 * Retrieve a receipt object from R2.
 * Returns the R2ObjectBody or null if not found.
 */
export async function getReceiptObject(
  bucket: R2Bucket,
  r2Key: string
): Promise<R2ObjectBody | null> {
  const object = await bucket.get(r2Key);
  return object;
}

function contentTypeToExtension(contentType: string): string {
  const map: Record<string, string> = {
    'application/pdf': '.pdf',
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/webp': '.webp',
  };
  return map[contentType] ?? '.bin';
}
