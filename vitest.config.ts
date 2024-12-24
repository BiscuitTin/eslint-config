import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      ignoreEmptyLines: true,
      include: ['packages/**/src/**/*.ts', 'packages/**/src/**/*.tsx'],
      exclude: ['packages/eslint-config/**'],
    },
  },
})
