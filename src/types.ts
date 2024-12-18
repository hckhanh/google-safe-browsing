/**
 * Types of threats.
 *
 * * **THREAT_TYPE_UNSPECIFIED**: Unknown.
 * * **MALWARE**: Malware threat type.
 * * **SOCIAL_ENGINEERING**: Social engineering threat type.
 * * **UNWANTED_SOFTWARE**: Unwanted software threat type.
 * * **POTENTIALLY_HARMFUL_APPLICATION**: Potentially harmful application threat type.
 *
 * @see https://developers.google.com/safe-browsing/reference/rest/v4/ThreatType
 */
export type ThreatType =
  | 'MALWARE'
  | 'POTENTIALLY_HARMFUL_APPLICATION'
  | 'SOCIAL_ENGINEERING'
  | 'THREAT_TYPE_UNSPECIFIED'
  | 'UNWANTED_SOFTWARE'

/**
 * Types of platforms.
 *
 * * **PLATFORM_TYPE_UNSPECIFIED**: Unknown platform.
 * * **WINDOWS**: Threat posed to Windows.
 * * **LINUX**: Threat posed to Linux.
 * * **ANDROID**: Threat posed to Android.
 * * **OSX**: Threat posed to OS X.
 * * **IOS**: Threat posed to iOS.
 * * **ANY_PLATFORM**: Threat posed to at least one of the defined platforms.
 * * **ALL_PLATFORMS**: Threat posed to all defined platforms.
 * * **CHROME**: Threat posed to Chrome.
 *
 * @see https://developers.google.com/safe-browsing/reference/rest/v4/PlatformType
 */
export type PlatformType =
  | 'ALL_PLATFORMS'
  | 'ANDROID'
  | 'ANY_PLATFORM'
  | 'CHROME'
  | 'IOS'
  | 'LINUX'
  | 'OSX'
  | 'PLATFORM_TYPE_UNSPECIFIED'
  | 'WINDOWS'

/**
 * Types of entries that pose threats.
 * Threat lists are collections of all types.
 *
 * * **THREAT_ENTRY_TYPE_UNSPECIFIED**:	Unspecified.
 * * **URL**:	A URL.
 * * **EXECUTABLE**:	An executable program.
 *
 * @see https://developers.google.com/safe-browsing/reference/rest/v4/ThreatEntryType
 */
export type ThreatEntryType =
  | 'EXECUTABLE'
  | 'THREAT_ENTRY_TYPE_UNSPECIFIED'
  | 'URL'

/**
 * An individual threat; for example, a malicious URL or its hash representation. Only one of these fields should be set.
 *
 * @see https://developers.google.com/safe-browsing/reference/rest/v4/ThreatEntry
 */
export type ThreatEntry =
  | {
      /**
       * A hash prefix, consisting of the most significant 4-32 bytes of a SHA256 hash. This field is in binary format.
       * For JSON requests, hashes are base64-encoded string.
       */
      hash: string
    }
  | {
      /**
       * A URL.
       */
      url: string
    }
  | {
      /**
       * The digest of an executable in SHA256 format.
       * The API supports both binary and hex digests.
       * For JSON requests, digests are base64-encoded.
       *
       * A base64-encoded string.
       */
      digest: string
    }

/**
 * The client metadata associated with Safe Browsing API requests.
 *
 * @see https://developers.google.com/safe-browsing/reference/rest/v4/ClientInfo
 */
export interface ClientInfo {
  /**
   * A client ID that (hopefully) uniquely identifies the client implementation of the Safe Browsing API.
   */
  clientId: string
  /**
   * The version of the client implementation.
   */
  clientVersion: string
}

/**
 * The information regarding one or more threats that a client submits when checking for matches in threat lists.
 *
 * @see https://developers.google.com/safe-browsing/reference/rest/v4/ThreatInfo
 */
export interface ThreatInfo {
  /**
   * The threat types to be checked.
   */
  threatTypes: ThreatType[]
  /**
   * The platform types to be checked.
   */
  platformTypes: PlatformType[]
  /**
   * The entry types to be checked.
   */
  threatEntryTypes: ThreatEntryType[]
  /**
   * The threat entries to be checked.
   */
  threatEntries: ThreatEntry[]
}

/**
 * A single metadata entry.
 *
 * @see https://developers.google.com/safe-browsing/v4/reference/rest/v4/ThreatMatch#metadataentry
 */
export interface MetadataEntry {
  /**
   * The metadata entry key.
   * For JSON requests, the key is base64-encoded.
   *
   * A base64-encoded string.
   */
  key: string
  /**
   * The metadata entry value.
   * For JSON requests, the value is base64-encoded.
   *
   * A base64-encoded string.
   */
  value: string
}

/**
 * The metadata associated with a specific threat entry.
 * The client is expected to know the metadata key/value pairs associated with each threat type.
 *
 * @see https://developers.google.com/safe-browsing/reference/rest/v4/ThreatMatch#threatentrymetadata
 */
export interface ThreatEntryMetadata {
  /**
   * The metadata entries.
   */
  entries: MetadataEntry[]
}

/**
 * A match when checking a threat entry in the Safe Browsing threat lists.
 *
 * @see https://developers.google.com/safe-browsing/reference/rest/v4/ThreatMatch
 */
export interface ThreatMatch {
  /**
   * The threat type matching this threat.
   */
  threatType: ThreatType
  /**
   * The platform type matching this threat.
   */
  platformType: PlatformType
  /**
   * The threat entry type matching this threat.
   */
  threatEntryType: ThreatEntryType
  /**
   * The threat matching this threat.
   */
  threat: ThreatEntry
  /**
   * Optional metadata associated with this threat.
   */
  threatEntryMetadata: ThreatEntryMetadata
  /**
   * The cache lifetime for the returned match. Clients must not cache this response for more than this duration to avoid false positives.
   *
   * A duration in seconds with up to nine fractional digits, ending with '**s**'.
   * Example: "**3.5s**".
   */
  cacheDuration: string
}
