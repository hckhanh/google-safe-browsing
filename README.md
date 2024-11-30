# google-safe-browsing

[![JSR](https://jsr.io/badges/@hckhanh/google-safe-browsing)](https://jsr.io/@hckhanh/google-safe-browsing)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/be4f5f8019a743f3878358399c110a36)](https://app.codacy.com/gh/hckhanh/google-safe-browsing/dashboard)

A JavaScript client for [Google Safe Browsing](https://safebrowsing.google.com) [API](https://developers.google.com/safe-browsing)

## Features

- [Zero dependencies](https://jsr.io/@hckhanh/google-safe-browsing/dependencies)
- Built-in support for Edge runtime
- Typesafe with TypeScript
- Supports some common cases
- Fully documented

## APIs

### findThreadMatches

Finds the threat entries that match the Safe Browsing lists.

```ts
import { GoogleSafeBrowsing } from '@hckhanh/google-safe-browsing'

const client = new GoogleSafeBrowsing('apiKey')
const result = await client.findThreadMatches({
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
