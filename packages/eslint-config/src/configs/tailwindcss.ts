import type { TypedFlatConfigItem } from '../types.js'

import plugins from '../plugins.js'
import { getFlatConfigName } from '../utils/index.js'

const name = getFlatConfigName('tailwindcss')

export function tailwindcss(): TypedFlatConfigItem[] {
  return [
    {
      name: name.setup,
      plugins: {
        tailwindcss: plugins['pluginTailwindCSS'],
      },
      settings: {
        tailwindcss: {
          callees: ['classnames', 'clsx', 'ctl', 'cva', 'cn', 'tv'],
        },
      },
    },
    {
      name: name.rules,
      rules: {
        // eslint-plugin-tailwindcss
        // https://github.com/francoismassart/eslint-plugin-tailwindcss
        'tailwindcss/classnames-order': 'error',
        'tailwindcss/enforces-negative-arbitrary-values': 'error',
        'tailwindcss/enforces-shorthand': 'warn',
        'tailwindcss/no-arbitrary-value': 'off',
        'tailwindcss/no-custom-classname': 'warn',
        'tailwindcss/no-contradicting-classname': 'error',
        'tailwindcss/no-unnecessary-arbitrary-value': 'error',
      },
    },
  ]
}
