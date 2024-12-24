import gitignore from 'eslint-config-flat-gitignore'

import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_EXCLUDE } from '../globs.js'
import { getFlatConfigName } from '../utils/index.js'

const name = getFlatConfigName('ignores')

export function ignores(userIgnores: string[] = []): TypedFlatConfigItem[] {
  return [
    {
      name: `${name.base}/files`,
      ignores: [...GLOB_EXCLUDE, ...userIgnores],
    },
    gitignore({ name: `${name.base}/gitignore` }),
  ]
}
