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
      reporter: process.env.CI ? ['lcovonly'] : coverageConfigDefaults.reporter,
    },
    reporters: process.env.CI
      ? ['dot', 'github-actions']
      : configDefaults.reporters,
  },
})
