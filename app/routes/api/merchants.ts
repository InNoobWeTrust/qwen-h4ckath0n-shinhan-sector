import { handleMerchants } from "../../src/routes/merchants";
import type { Route } from "./+types/merchants";

export async function loader({ request, context }: Route.LoaderArgs) {
  const req = new Request(`http://localhost${request.url}`, { method: "GET", headers: request.headers });
  return handleMerchants(req, { DB: context.cloudflare.env.shinhan_pos_db } as any);
}