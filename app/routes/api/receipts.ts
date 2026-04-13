import { handleReceipts } from "../../src/routes/receipts";
import type { Route } from "./+types/receipts";

export async function loader({ request, context }: Route.LoaderArgs) {
  const req = new Request(`http://localhost${request.url}`, { method: "GET", headers: request.headers });
  return handleReceipts(req, { DB: context.cloudflare.env.shinhan_pos_db, RECEIPTS: context.cloudflare.env.shinhan_pos_receipts } as any);
}

export async function action({ request, context }: Route.ActionArgs) {
  const body = await request.arrayBuffer();
  const req = new Request(`http://localhost${request.url}`, { method: request.method, headers: request.headers, body });
  return handleReceipts(req, { DB: context.cloudflare.env.shinhan_pos_db, RECEIPTS: context.cloudflare.env.shinhan_pos_receipts } as any);
}