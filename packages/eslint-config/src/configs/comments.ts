import type { TypedFlatConfigItem } from '../types.js'

import plugins from '../plugins.js'
import { getFlatConfigName } from '../utils/index.js'

const name = getFlatConfigName('eslint-comments')

export function comments(): TypedFlatConfigItem[] {
  return [
    {
      name: name.setup,
      plugins: {
        '@eslint-community/eslint-comments': plugins['pluginESLintComments'],
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
