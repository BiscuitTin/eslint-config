import * as pluginRegexp from 'eslint-plugin-regexp'

import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_SRC } from '../globs.js'
import plugins from '../plugins.js'
import { getFlatConfigName } from '../utils/index.js'

const name = getFlatConfigName('regexp')
const files: string[] = [GLOB_SRC]

export function regexp(): TypedFlatConfigItem[] {
  return [
    {
      name: name.setup,
      files,
      plugins: {
        regexp: plugins['pluginRegexp'],
      },
    },
    {
      name: name.rules,
      files,
      rules: {
        // eslint-plugin-regexp
        // https://github.com/ota-meshi/eslint-plugin-regexp
        ...pluginRegexp.configs['flat/recommended'].rules,
      },
    },
  ]
}
