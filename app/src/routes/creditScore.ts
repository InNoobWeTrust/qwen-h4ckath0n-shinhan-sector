import { mockMerchants } from '../lib/mockMerchants';
import { expandFactors } from '../lib/reasonCodes';
import { jsonResponse, errorResponse } from '../lib/utils';
import type { Env } from '../index';

export async function handleCreditScore(
  request: Request,
  env: Env
): Promise<Response> {
  if (request.method !== 'POST') {
    return errorResponse('Method Not Allowed', 405);
  }

  let merchantId: string | undefined;
  try {
    const body = (await request.json()) as { merchantId?: string };
    merchantId = body.merchantId;
  } catch {
    return errorResponse('Invalid JSON', 400);
  }

  const merchant = merchantId ? mockMerchants[merchantId] : undefined;
  if (!merchant) {
    return errorResponse('Invalid merchantId', 400);
  }

  return jsonResponse({
    merchantId,
    score: merchant.score,
    scores: merchant.scores,
    band: merchant.band,
    limit: merchant.limit,
    change: merchant.change,
    breakdown: merchant.breakdown,
    positiveFactors: expandFactors(merchant.positiveFactors),
    negativeFactors: expandFactors(merchant.negativeFactors),
    whatIf: merchant.whatIf,
  });
}
