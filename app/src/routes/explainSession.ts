import { jsonResponse } from "../lib/utils"

// No backend session state needed anymore - all config is in sessionStorage
// This endpoint is no longer used for session management

export async function handleExplainSession(request: Request): Promise<Response> {
  void request
  // Return 404 - this endpoint is deprecated
  return jsonResponse({ error: "Not Found", deleted: true }, 404)
}
