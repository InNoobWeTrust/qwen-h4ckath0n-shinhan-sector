import { handleProducts } from "../../src/routes/products";
import type { Route } from "./+types/products";

export async function loader({ request, context }: Route.LoaderArgs) {
  const req = new Request(context.cloudflare.env.shinhan_pos_db ? `http://localhost${request.url}` : request.url, {
    method: "GET",
    headers: request.headers,
  });
  return handleProducts(req, { DB: context.cloudflare.env.shinhan_pos_db } as any);
}

export async function action({ request, context }: Route.ActionArgs) {
  const body = await request.arrayBuffer();
  const req = new Request(`http://localhost${request.url}`, {
    method: request.method,
    headers: request.headers,
    body,
  });
  return handleProducts(req, { DB: context.cloudflare.env.shinhan_pos_db } as any);
}