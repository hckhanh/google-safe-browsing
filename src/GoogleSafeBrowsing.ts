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
   * The client metadata.
   */
  private readonly client: ClientInfo

  /**
   * Represents the endpoint URL of a network request or API call.
   */
  private readonly endpoint: string

  /**
   * Constructs an instance of the Class with the specified API key and optional endpoint.
   *
   * @param apiKey The API key used for authentication; must be a non-empty string.
   * @param client The client metadata.
   * @param [endpoint=DEFAULT_ENDPOINT] The optional endpoint URL.
   * @throws {Error} If the `apiKey` is an empty string or only contains whitespace.
   */
  constructor(
    apiKey: string,
    client: ClientInfo,
    endpoint: string = DEFAULT_ENDPOINT,
  ) {
    if (!apiKey.trim()) {
      throw new Error('API key is required')
    }

    this.apiKey = apiKey
    this.client = client
    this.endpoint = endpoint
  }

  /**
   * Finds threat matches using Google Safe Browsing API.
   *
   * @example
   * ```ts
   * const client = new GoogleSafeBrowsing('apiKey', {
   *  clientId: 'uniqueClientId',
   *  clientVersion: '1.0.0',
   * })
   * const result = await client.findThreatMatches({
   *   threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
   *   platformTypes: ['ALL_PLATFORMS'],
   *   threatEntryTypes: ['URL'],
   *   threatEntries: [
   *     { url: 'http://malware.testing.google.test/testing/malware/' },
   *   ],
   * })
   *
   * const hasRisk = result.matches?.length > 0
   * ```
   *
   * @param threatInfo The lists and entries to be checked for matches.
   *
   * @return A promise that resolves to the response object containing the list of {@link ThreatMatch}.
   */
  async findThreatMatches(
    threatInfo: ThreatInfo,
  ): Promise<FindThreatMatchesResponse> {
    const res = await fetch(
      `${this.endpoint}/threatMatches:find?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, br',
        },
        body: JSON.stringify({ client: this.client, threatInfo }),
      },
    )

    if (!res.ok) {
      if (res.status === 429) {
        throw new Error('Rate limit exceeded for Google Safe Browsing API')
      }

      const errorBody = await res.text()
      throw new Error(
        `API request failed with status ${res.status}: ${errorBody}`,
      )
    }

    return res.json()
  }

  /**
   * Finds threat matches from urls using Google Safe Browsing API.
   *
   * @example
   * ```ts
   * const client = new GoogleSafeBrowsing('apiKey', {
   *  clientId: 'uniqueClientId',
   *  clientVersion: '1.0.0',
   * })
   * const result = await client.findThreatMatchesFromUrls([
   *   'http://malware.testing.google.test/testing/malware/'
   * ])
   *
   * const hasRisk = result.matches?.length > 0
   * ```
   *
   * @param urls The list of urls to be checked for matches.
   *
   * @return A promise that resolves to the response object containing the list of {@link ThreatMatch}.
   */
  async findThreatMatchesFromUrls(
    urls: string[],
  ): Promise<FindThreatMatchesResponse> {
    return this.findThreatMatches({
      threatTypes: [
        'MALWARE',
        'UNWANTED_SOFTWARE',
        'SOCIAL_ENGINEERING',
        'POTENTIALLY_HARMFUL_APPLICATION',
      ],
      platformTypes: ['ANY_PLATFORM'],
      threatEntryTypes: ['URL'],
      threatEntries: urls.map((url) => ({ url })),
    })
  }
}

/**
 * Represents the response from a find threat matches operation.
 */
export interface FindThreatMatchesResponse {
  /**
   * The threat list matches. If there is no threat, this field is omitted.
   */
  matches?: ThreatMatch[]
}
