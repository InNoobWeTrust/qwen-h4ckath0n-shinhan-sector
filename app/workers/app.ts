import { createRequestHandler } from "react-router";
import { Hono } from "hono";
import { handleProducts } from "../src/routes/products";
import { handleOrders } from "../src/routes/orders";
import { handleStaff } from "../src/routes/staff";
import { handleShifts } from "../src/routes/shifts";
import { handleReceipts } from "../src/routes/receipts";
import { handleMerchants } from "../src/routes/merchants";
import { errorResponse, jsonResponse } from "../src/lib/utils";

export interface Env {
  shinhan_pos_db: D1Database;
  shinhan_pos_receipts: R2Bucket;
  SESSION: KVNamespace;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

const app = new Hono<{ Bindings: Env }>();

// CORS preflight
app.options("*", (c) => c.text("", 204, CORS_HEADERS as any));

// ── API Routes via Hono ──────────────────────────────────────
app.all("/api/:path*", async (c) => {
  const path = `/api/${c.req.param("path")}`;
  const method = c.req.method;
  const url = c.req.url;

  let body: ArrayBuffer | undefined;
  if (["POST", "PATCH", "PUT"].includes(method)) {
    body = await c.req.arrayBuffer();
  }

  const request = new Request(url, { method, headers: c.req.header(), body });
  let resp: Response;

  if (path === "/api/health") {
    resp = jsonResponse({ status: "ok", timestamp: new Date().toISOString() });
  } else if (
    path === "/api/merchants" ||
    path.startsWith("/api/merchants/")
  ) {
    resp = await handleMerchants(request, c.env as any);
  } else if (
    path === "/api/products" ||
    path.startsWith("/api/products/")
  ) {
    resp = await handleProducts(request, c.env as any);
  } else if (path === "/api/orders" || path.startsWith("/api/orders/")) {
    resp = await handleOrders(request, c.env as any);
  } else if (path === "/api/staff" || path.startsWith("/api/staff/")) {
    resp = await handleStaff(request, c.env as any);
  } else if (path === "/api/shifts" || path.startsWith("/api/shifts/")) {
    resp = await handleShifts(request, c.env as any);
  } else if (
    path === "/api/receipts" ||
    path.startsWith("/api/receipts/")
  ) {
    resp = await handleReceipts(request, c.env as any);
  } else {
    resp = errorResponse("Not Found", 404);
  }

  const headers = new Headers(Object.fromEntries(resp.headers));
  for (const [k, v] of Object.entries(CORS_HEADERS)) {
    headers.set(k, v);
  }
  return new Response(resp.body, { status: resp.status, headers });
});

// ── React Router request handler ─────────────────────────────
const reactRouterHandler = createRequestHandler(
  () => import("../build/server/index.js"),
  process.env.NODE_ENV || "production"
);

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    // API routes handled by Hono
    if (url.pathname.startsWith("/api/")) {
      return app.fetch(request, env, ctx);
    }

    // React Router handles everything else (pages, assets)
    return reactRouterHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<Env>;