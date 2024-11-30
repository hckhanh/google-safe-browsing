import type { ClientInfo, ThreatInfo, ThreatMatch } from './types.ts'

/**
 * A [service endpoint]{@link https://cloud.google.com/apis/design/glossary#api_service_endpoint}
 * is a base URL that specifies the network address of an API service.
 * One service might have multiple service endpoints.
 * This service has the following service endpoint, and all URIs below are relative to this service endpoint.
 *
 * @version 4
 */
const DEFAULT_ENDPOINT = 'https://safebrowsing.googleapis.com/v4'

/**
 * The GoogleSafeBrowsing class provides methods to interact with the Google Safe Browsing API.
 * It allows users to query the API to check URLs for potential threats such as malware or social engineering.
 *
 * @version 4
 */
export class GoogleSafeBrowsing {
  /**
   * A string representing the API key required to authenticate and authorize requests
   * to Google Safe Browsing API.
   */
  private readonly apiKey: string

  /**
   * Represents the endpoint URL of a network request or API call.
   */
  private readonly endpoint: string

  /**
   * Constructs an instance of the Class with the specified API key and optional endpoint.
   *
   * @param apiKey The API key used for authentication; must be a non-empty string.
   * @param [endpoint=DEFAULT_ENDPOINT] The optional endpoint URL.
   * @throws {Error} If the `apiKey` is an empty string or only contains whitespace.
   */
  constructor(apiKey: string, endpoint: string = DEFAULT_ENDPOINT) {
    if (!apiKey?.trim()) {
      throw new Error('API key is required')
    }

    this.apiKey = apiKey
    this.endpoint = endpoint
  }

  /**
   * Finds threat matches using Google Safe Browsing API.
   *
   * @example
   * ```ts
   * const client = new GoogleSafeBrowsing('apiKey')
   * const result = await client.findThreatMatches('apiKey', {
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
   * @param request The request object containing the parameters for finding threat matches.
   *
   * @return A promise that resolves to the response object containing the list of {@link ThreatMatch}.
   */
  async findThreatMatches(
    request: FindThreatMatchesRequest,
  ): Promise<FindThreatMatchesResponse> {
    const res = await fetch(
      `${this.endpoint}/threatMatches:find?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, br',
        },
        body: JSON.stringify(request),
      },
    )

    if (!res.ok) {
      if (res.status === 429) {
        throw new Error('Rate limit exceeded for Google Safe Browsing API')
      }

      throw new Error(`API request failed with status ${res.status}`)
    }

    try {
      return await res.json()
    } catch (error) {
      throw new Error('Failed to parse API response')
    }
  }
}

/**
 * Represents a request to find threat matches.
 * This type is used to encapsulate the necessary information
 * for searching and identifying threats in specified lists and entries.
 */
export type FindThreatMatchesRequest = {
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
 * Represents the response from a find threat matches operation.
 */
export type FindThreatMatchesResponse = {
  /**
   * The threat list matches. If there is no threat, this field is omitted.
   */
  matches?: ThreatMatch[]
}
