import { handleExplainScore } from "../../src/routes/explainScore"
import type { Route } from "./+types/explain-score"

export async function action({ request }: Route.ActionArgs) {
  return handleExplainScore(request)
}
