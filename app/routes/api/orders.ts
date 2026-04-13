import { handleOrders } from "../../src/routes/orders";
import type { Route } from "./+types/orders";

export async function loader({ request, context }: Route.LoaderArgs) {
  const req = new Request(`http://localhost${request.url}`, { method: "GET", headers: request.headers });
  return handleOrders(req, { DB: context.cloudflare.env.shinhan_pos_db } as any);
}

export async function action({ request, context }: Route.ActionArgs) {
  const body = await request.arrayBuffer();
  const req = new Request(`http://localhost${request.url}`, { method: request.method, headers: request.headers, body });
  return handleOrders(req, { DB: context.cloudflare.env.shinhan_pos_db } as any);
}