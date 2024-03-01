import { describe, expect, it } from 'vitest'
import { findThreadMatches } from './lookup.ts'

const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY as string

describe('lookup', () => {
  it('should work detect malicious link', () => {
    expect(
      findThreadMatches(apiKey, {
        client: {
          clientId: 'khanh.sh',
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
      }),
    ).resolves.toEqual({
      matches: [
        {
          threatType: 'MALWARE',
          platformType: 'ALL_PLATFORMS',
          threat: {
            url: 'http://malware.testing.google.test/testing/malware/',
          },
          cacheDuration: '300s',
          threatEntryType: 'URL',
        },
      ],
    })
  })
})
