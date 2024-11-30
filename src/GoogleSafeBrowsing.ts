import type { ClientInfo, ThreatInfo, ThreatMatch } from './types.ts'

/**
 * The GoogleSafeBrowsing class provides methods to interact with the Google Safe Browsing API.
 * It allows users to query the API to check URLs for potential threats such as malware or social engineering.
 *
 * @version 4
 */
export class GoogleSafeBrowsing {
  /**
   * A [service endpoint]{@link https://cloud.google.com/apis/design/glossary#api_service_endpoint}
   * is a base URL that specifies the network address of an API service.
   * One service might have multiple service endpoints.
   * This service has the following service endpoint, and all URIs below are relative to this service endpoint.
   *
   * @version 4
   */
  static readonly endpoint = 'https://safebrowsing.googleapis.com/v4'

  private readonly apiKey: string

  /**
   * Creates an instance of the class with the specified API key.
   *
   * @param apiKey - The API key for accessing the Google Safe Browsing API.
   * You should follow the instruction to get the API key at https://developers.google.com/safe-browsing/v4/get-started.
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Finds threat matches using Google Safe Browsing API.
   *
   * @example
   * ```ts
   * const client = new GoogleSafeBrowsing('apiKey')
   * const result = await client.findThreadMatches('apiKey', {
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
   *
   * const hasRisk = result.matches !== undefined && result.matches.length > 0
   * ```
   *
   * @param request The request object containing the parameters for finding thread matches.
   *
   * @return A promise that resolves to the response object containing the list of {@link ThreatMatch}.
   */
  async findThreadMatches(
    request: FindThreadMatchesRequest,
  ): Promise<FindThreadMatchesResponse> {
    const res = await fetch(
      `${GoogleSafeBrowsing.endpoint}/threatMatches:find?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, br',
        },
        body: JSON.stringify(request),
      },
    )

    return res.json()
  }
}

/**
 * Represents a request to find thread matches.
 * This type is used to encapsulate the necessary information
 * for searching and identifying threats in specified lists and entries.
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
 * Represents the response from a find thread matches operation.
 */
export type FindThreadMatchesResponse = {
  /**
   * The threat list matches. If there is no threat, this field is omitted.
   */
  matches?: ThreatMatch[]
}
