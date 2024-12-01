// @ts-check

import vitest from '@vitest/eslint-plugin'
import perfectionist from 'eslint-plugin-perfectionist'
import tsEslint from 'typescript-eslint'

export default tsEslint.config(
  ...tsEslint.configs.recommended,
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': 'error',
      'perfectionist/sort-named-imports': 'error',

      'perfectionist/sort-exports': 'error',
      'perfectionist/sort-named-exports': 'error',

      'perfectionist/sort-jsx-props': 'error',
      'perfectionist/sort-union-types': 'error',
    },
  },
  {
    files: ['src/**/*.test.ts'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  {
    ignores: ['**/dist/**', '**/coverage/**', '**/*.d.ts'],
  },
)
