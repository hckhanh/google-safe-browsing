import {
  configDefaults,
  coverageConfigDefaults,
  defineConfig,
} from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      enabled: false,
      provider: 'v8',
      exclude: [
        '*.config.ts',
        '*.config.js',
        ...coverageConfigDefaults.exclude,
      ],
      reporter: process.env.CI ? ['clover'] : coverageConfigDefaults.reporter,
    },
    reporters: process.env.CI
      ? process.env.TEST_ANALYTICS
        ? ['junit', 'dot', 'github-actions']
        : ['dot', 'github-actions']
      : configDefaults.reporters,
    outputFile: 'coverage/junit.xml',
  },
})
