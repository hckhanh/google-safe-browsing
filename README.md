# google-safe-browsing [![JSR](https://jsr.io/badges/@hckhanh/google-safe-browsing)](https://jsr.io/@hckhanh/google-safe-browsing)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=hckhanh_google-safe-browsing&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=hckhanh_google-safe-browsing)

A JavaScript client for [Google Safe Browsing](https://safebrowsing.google.com) [API](https://developers.google.com/safe-browsing)

## Features

- [Zero dependencies](https://jsr.io/@hckhanh/google-safe-browsing/dependencies)
- Built-in support for Edge runtime
- Typesafe with TypeScript
- Supports some common cases
- Fully documented

## APIs

### Find threat entries

Finds the threat entries that match the Safe Browsing lists.

```ts
import { GoogleSafeBrowsing } from '@hckhanh/google-safe-browsing'

// Initialize Google Safe Browsing client with API key and required identifiers
// clientId: Unique identifier for your application instance
// clientVersion: Current version of your application
const client = new GoogleSafeBrowsing('apiKey', {
  clientId: 'uniqueClientId',
  clientVersion: '1.0.0',
})

const result = await client.findThreatMatches({
  threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
  platformTypes: ['ALL_PLATFORMS'],
  threatEntryTypes: ['URL'],
  threatEntries: [
    { url: 'http://malware.testing.google.test/testing/malware/' },
  ],
})

const hasRisk = result.matches?.length > 0
```

### Find threat entries from urls

Finds the threat entries that match the Safe Browsing lists from the input urls

```ts
import { GoogleSafeBrowsing } from '@hckhanh/google-safe-browsing'

const client = new GoogleSafeBrowsing('apiKey', {
  clientId: 'uniqueClientId',
  clientVersion: '1.0.0',
})

const result = await client.findThreatMatchesFromUrls([
  'http://malware.testing.google.test/testing/malware/',
])

const hasRisk = result.matches?.length > 0
```

## Release Notes

You can go to the [Releases](https://github.com/hckhanh/google-safe-browsing/releases) page to see the release notes.

> [!NOTE]
> Enables client applications to check web resources (most commonly URLs)
> against Google-generated lists of unsafe web resources.
> The Safe Browsing APIs are for non-commercial use only.
> If you need to use APIs to detect malicious URLs for commercial purposes –
> meaning “for sale or revenue-generating purposes” –
> please refer to the [Web Risk API](https://github.com/hckhanh/google-web-risk).
