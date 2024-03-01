/**
 * Types of threats.
 *
 * @see https://developers.google.com/safe-browsing/v4/reference/rest/v4/ThreatType
 */
export type ThreatType =
  | 'THREAT_TYPE_UNSPECIFIED'
  | 'MALWARE'
  | 'SOCIAL_ENGINEERING'
  | 'UNWANTED_SOFTWARE'
  | 'POTENTIALLY_HARMFUL_APPLICATION'

/**
 * Types of platforms.
 *
 * @see [PlatformType]{@link https://developers.google.com/safe-browsing/v4/reference/rest/v4/PlatformType}
 */
export type PlatformType =
  | 'PLATFORM_TYPE_UNSPECIFIED'
  | 'WINDOWS'
  | 'LINUX'
  | 'ANDROID'
  | 'OSX'
  | 'IOS'
  | 'ANY_PLATFORM'
  | 'ALL_PLATFORMS'
  | 'CHROME'

/**
 * Types of entries that pose threats. Threat lists are collections of entries of a single type.
 *
 * @see [ThreatEntryType]{@link https://developers.google.com/safe-browsing/v4/reference/rest/v4/ThreatEntryType}
 */
export type ThreatEntryType =
  | 'THREAT_ENTRY_TYPE_UNSPECIFIED'
  | 'URL'
  | 'EXECUTABLE'

/**
 * An individual threat; for example, a malicious URL or its hash representation. Only one of these fields should be set.
 *
 * @see [ThreatEntry]{@link https://developers.google.com/safe-browsing/v4/reference/rest/v4/ThreatEntry}
 */
export type ThreatEntry =
  | {
      /**
       * A URL.
       */
      url: string
    }
  | {
      /**
       * A hash prefix, consisting of the most significant 4-32 bytes of a SHA256 hash. This field is in binary format.
       * For JSON requests, hashes are base64-encoded string.
       */
      hash: string
    }
  | {
      /**
       * The digest of an executable in SHA256 format. The API supports both binary and hex digests.
       * For JSON requests, digests are base64-encoded string.
       */
      digest: string
    }

/**
 * The client metadata associated with Safe Browsing API requests.
 *
 * @see [ClientInfo]{@link https://developers.google.com/safe-browsing/v4/reference/rest/v4/ClientInfo}
 */
export type ClientInfo = {
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
 * @see [ThreatInfo]{@link https://developers.google.com/safe-browsing/v4/reference/rest/v4/ThreatInfo}
 */
export type ThreatInfo = {
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
 * @see [MetadataEntry]{@link https://developers.google.com/safe-browsing/v4/reference/rest/v4/ThreatMatch#metadataentry}
 */
export type MetadataEntry = {
  /**
   * The metadata entry key. For JSON requests, the key is base64-encoded string.
   */
  key: string
  /**
   * The metadata entry value. For JSON requests, the value is base64-encoded string.
   */
  value: string
}

/**
 * The metadata associated with a specific threat entry. The client is expected
 * to know the metadata key/value pairs associated with each threat type.
 *
 * @see [ThreatEntryMetadata]{@link https://developers.google.com/safe-browsing/v4/reference/rest/v4/ThreatMatch#threatentrymetadata}
 */
export type ThreatEntryMetadata = {
  /**
   * The metadata entries.
   */
  entries: MetadataEntry[]
}

/**
 * A match when checking a threat entry in the Safe Browsing threat lists.
 *
 * @see [ThreatMatch]{@link https://developers.google.com/safe-browsing/v4/reference/rest/v4/ThreatMatch}
 */
export type ThreatMatch = {
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
   * A duration in seconds with up to nine fractional digits, terminated by 's'. Example: "3.5s".
   */
  cacheDuration: string
}
