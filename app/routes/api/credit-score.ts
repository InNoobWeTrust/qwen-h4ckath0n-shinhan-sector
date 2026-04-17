import type { Route } from "./+types/credit-score";

import { mockMerchants } from "../../src/lib/mockMerchants";
import { expandFactors } from "../../src/lib/reasonCodes";
import { jsonResponse } from "../../src/lib/utils";

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method Not Allowed" }, 405);
  }

  let merchantId: string | undefined;

  try {
    const body = (await request.json()) as { merchantId?: string };
    merchantId = body.merchantId;
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  const merchant = merchantId ? mockMerchants[merchantId] : undefined;

  if (!merchant) {
    return jsonResponse({ error: "Invalid merchantId" }, 400);
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
