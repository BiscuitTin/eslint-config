import type { ESLint } from 'eslint'

// @ts-expect-error missing type info
import eslintPluginESLintComments from '@eslint-community/eslint-plugin-eslint-comments'

import type { TypedFlatConfigItem } from '../types.js'

import { getFlatConfigName, memo } from '../utils/index.js'

const pluginESLintComments = memo(eslintPluginESLintComments, 'eslint-plugin-eslint-comments') as ESLint.Plugin

const name = getFlatConfigName('eslint-comments')

export function comments(): TypedFlatConfigItem[] {
  return [
    {
      name: name.setup,
      plugins: {
        '@eslint-community/eslint-comments': pluginESLintComments,
      },
    },
    {
      name: name.rules,
      rules: {
        '@eslint-community/eslint-comments/disable-enable-pair': [
          'error',
          { allowWholeFile: true },
        ],
        '@eslint-community/eslint-comments/no-aggregating-enable': 'error',
        '@eslint-community/eslint-comments/no-duplicate-disable': 'error',
        '@eslint-community/eslint-comments/no-unlimited-disable': 'error',
        '@eslint-community/eslint-comments/no-unused-enable': 'error',
        '@eslint-community/eslint-comments/require-description': 'error',
      },
    },
  ]
}
