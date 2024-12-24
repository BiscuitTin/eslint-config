import pluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'

import type { TypedFlatConfigItem } from '../types.js'

import plugins from '../plugins.js'
import { getFlatConfigName } from '../utils/index.js'

const name = getFlatConfigName('unicorn')

export function unicorn(): TypedFlatConfigItem[] {
  return [
    {
      name: name.setup,
      plugins: {
        unicorn: plugins['pluginUnicorn'],
      },
      languageOptions: {
        globals: {
          ...globals.builtin,
        },
      },
    },
    {
      name: name.rules,
      rules: {
        // eslint-plugin-unicorn
        // https://github.com/sindresorhus/eslint-plugin-unicorn
        ...pluginUnicorn.configs['flat/recommended'].rules,

        // Ignore case for specific files
        'unicorn/filename-case': ['error', {
          cases: { kebabCase: true },
          ignore: ['README.md', 'LICENSE.md', 'CHANGELOG.md', 'CODE_OF_CONDUCT.md'],
        }],
      },
    },
  ]
}
