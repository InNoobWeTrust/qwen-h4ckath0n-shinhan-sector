import { handleExplainSession } from "../../src/routes/explainSession"
import type { Route } from "./+types/explain-session"

export async function loader({ request }: Route.LoaderArgs) {
  return handleExplainSession(request)
}

export async function action({ request }: Route.ActionArgs) {
  return handleExplainSession(request)
}
