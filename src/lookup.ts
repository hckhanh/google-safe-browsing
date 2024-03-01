import type { ClientInfo, ThreatInfo, ThreatMatch } from './types.ts'
import { endpoint } from './configs.ts'

type FindThreadMatchesRequest = {
  client: ClientInfo
  threatInfo: ThreatInfo
}

/**
 * The threat list matches. This may be empty if the client's threat list is empty.
 */
type FindThreadMatchesResponse = {
  /**
   * The threat list matches.
   */
  matches: ThreatMatch[]
}

/**
 * Finds threat matches using Google Safe Browsing API.
 *
 * @param apiKey The API key for accessing the Google Safe Browsing API. You should follow the instruction to get the API key at https://developers.google.com/safe-browsing/v4/get-started.
 * @param request The request object containing the parameters for finding thread matches.
 *
 * @return A promise that resolves to the response object containing the list of {@link ThreatMatch}.
 */
export async function findThreadMatches(
  apiKey: string,
  request: FindThreadMatchesRequest,
): Promise<FindThreadMatchesResponse> {
  const res = await fetch(`${endpoint}/threatMatches:find?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  return res.json()
}
