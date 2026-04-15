import { handleShifts } from "../../src/routes/shifts";
import type { Route } from "./+types/shifts";

export async function loader({ request, context }: Route.LoaderArgs) {
  const req = new Request(`http://localhost${request.url}`, { method: "GET", headers: request.headers });
  return handleShifts(req, { DB: context.cloudflare.env.shinhan_pos_db } as any);
}

export async function action({ request, context }: Route.ActionArgs) {
  const body = await request.arrayBuffer();
  const req = new Request(`http://localhost${request.url}`, { method: request.method, headers: request.headers, body });
  return handleShifts(req, { DB: context.cloudflare.env.shinhan_pos_db } as any);
}