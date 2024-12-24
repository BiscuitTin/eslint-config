import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_JSX, GLOB_TSX } from '../globs.js'
import { getFlatConfigName } from '../utils/index.js'

const name = getFlatConfigName('jsx')

export function jsx(): TypedFlatConfigItem[] {
  return [
    {
      name: name.setup,
      files: [GLOB_JSX, GLOB_TSX],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    },
  ]
}
