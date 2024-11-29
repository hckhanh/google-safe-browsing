# google-safe-browsing

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/be4f5f8019a743f3878358399c110a36)](https://app.codacy.com/gh/hckhanh/google-safe-browsing/dashboard)

A JavaScript client for [Google Safe Browsing](https://safebrowsing.google.com) [API](https://developers.google.com/safe-browsing)

## Features

- [Zero dependencies](https://jsr.io/@hckhanh/google-safe-browsing/dependencies)
- Built-in support for Edge runtime
- Typesafe with TypeScript
- Supports all Google Safe Browsing API v4 endpoints
- Fully documented

## APIs

### findThreadMatches

Finds the threat entries that match the Safe Browsing lists.

```ts
import { findThreadMatches } from '@hckhanh/google-safe-browsing'

const result = await findThreadMatches('apiKey', {
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
> The Safe Browsing API is for non-commercial use only. If you need to use APIs to detect malicious URLs for commercial
> purposes - meaning 'for sale or revenue-generating purposes' - please refer to the [Web Risk API](https://github.com/hckhanh/google-web-risk).
