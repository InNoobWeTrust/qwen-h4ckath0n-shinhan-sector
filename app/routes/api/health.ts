import { jsonResponse } from "../../src/lib/utils";
import type { Route } from "./+types/health";

export async function loader({ context }: Route.LoaderArgs) {
  return jsonResponse({ status: "ok", timestamp: new Date().toISOString() });
}