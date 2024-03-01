import type { ClientInfo, ThreatInfo, ThreatMatch } from './types.ts'
import { endpoint } from './configs.ts'

/**
 * @module
 * The Lookup API lets your client applications send requests to the Safe Browsing
 * servers to check if URLs are included on any of the Safe Browsing lists.
 * If a URL is found on one or more lists, the matching information is returned.
 *
 * @example
 * ```ts
 * import { findThreadMatches } from '@hckhanh/google-safe-browsing'
 *
 * const result = await findThreadMatches('apiKey', {
 *   client: {
 *     clientId: 'uniqueClientId',
 *     clientVersion: '1.0.0',
 *   },
 *   threatInfo: {
 *     threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
 *     platformTypes: ['ALL_PLATFORMS'],
 *     threatEntryTypes: ['URL'],
 *     threatEntries: [
 *       { url: 'http://malware.testing.google.test/testing/malware/' },
 *     ],
 *   },
 * })
 * ```
 */

/**
 * The request object containing the parameters for finding thread matches.
 */
export type FindThreadMatchesRequest = {
  /**
   * The client metadata.
   */
  client: ClientInfo
  /**
   * The lists and entries to be checked for matches.
   */
  threatInfo: ThreatInfo
}

/**
 * The threat list matches. This may be empty if the client's threat list is empty.
 */
export type FindThreadMatchesResponse = {
  /**
   * The threat list matches. If there is no threat, this field is omitted.
   */
  matches?: ThreatMatch[]
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
