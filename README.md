# google-safe-browsing [![JSR](https://jsr.io/badges/@hckhanh/google-safe-browsing)](https://jsr.io/@hckhanh/google-safe-browsing)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=hckhanh_google-safe-browsing&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=hckhanh_google-safe-browsing)
[![codecov](https://codecov.io/gh/hckhanh/google-safe-browsing/graph/badge.svg?token=OTWNSODDXK)](https://codecov.io/gh/hckhanh/google-safe-browsing)

A JavaScript client for [Google Safe Browsing](https://safebrowsing.google.com) [API](https://developers.google.com/safe-browsing)

## Features

- [Zero dependencies](https://jsr.io/@hckhanh/google-safe-browsing/dependencies)
- Built-in support for Edge runtime
- Typesafe with TypeScript
- Supports some common cases
- Fully documented

## APIs

### threatMatches.find

Finds the threat entries that match the Safe Browsing lists.

```ts
import { GoogleSafeBrowsing } from '@hckhanh/google-safe-browsing'

const client = new GoogleSafeBrowsing('apiKey')

const result = await client.findThreatMatches({
  client: {
    clientId: 'uniqueClientId',
    clientVersion: '1.0.0',
  },
  threatInfo: {
    threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
    platformTypes: ['ALL_PLATFORMS'],
    threatEntryTypes: ['URL'],
    threatEntries: [
      { url: 'http://malware.testing.google.test/testing/malware/' },
    ],
  },
})

const hasRisk = result.matches !== undefined && result.matches.length > 0
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
