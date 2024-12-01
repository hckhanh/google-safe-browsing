import { describe, expect, it } from 'vitest'

import { GoogleSafeBrowsing } from './GoogleSafeBrowsing.js'

const client = new GoogleSafeBrowsing(
  process.env.GOOGLE_SAFE_BROWSING_API_KEY as string,
)

describe('GoogleSafeBrowsing', () => {
  it('should detect malicious link', async () => {
    await expect(
      client.findThreatMatches({
        client: {
          clientId: 'khanh.id',
          clientVersion: '2.0.0',
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
