import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

import type { OptionsTailwindCss } from '../options.js'
import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_HTML, GLOB_POSTCSS, GLOB_SRC, GLOB_STYLE } from '../globs.js'
import { getFlatConfigName, memo } from '../utils/index.js'

const pluginBetterTailwindCSS = memo(eslintPluginBetterTailwindcss, 'eslint-plugin-better-tailwindcss')

const name = getFlatConfigName('tailwindcss')
const files: string[] = [GLOB_SRC, GLOB_STYLE, GLOB_POSTCSS, GLOB_HTML]

export function tailwindcss(options: OptionsTailwindCss = {}): TypedFlatConfigItem[] {
  return [
    {
      name: name.setup,
      files,
      plugins: {
        'better-tailwindcss': pluginBetterTailwindCSS,
      },
      settings: {
        'better-tailwindcss': { ...options },
      },
    },
    {
      name: name.rules,
      files,
      rules: {
        // eslint-plugin-better-tailwindcss
        // https://github.com/schoero/eslint-plugin-better-tailwindcss
        'better-tailwindcss/enforce-consistent-class-order': 'error',
        'better-tailwindcss/enforce-consistent-variable-syntax': ['error', { syntax: 'variable' }],
        'better-tailwindcss/enforce-consistent-important-position': 'error',
        'better-tailwindcss/enforce-shorthand-classes': 'error',
        'better-tailwindcss/no-duplicate-classes': 'error',
        'better-tailwindcss/no-deprecated-classes': 'error',
        'better-tailwindcss/no-unnecessary-whitespace': 'error',
        'better-tailwindcss/no-unregistered-classes': 'error',
        'better-tailwindcss/no-conflicting-classes': 'error',
      },
    },
  ]
}
