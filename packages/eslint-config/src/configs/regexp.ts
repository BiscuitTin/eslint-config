import * as pluginRegexp from 'eslint-plugin-regexp'

import type { TypedFlatConfigItem } from '../types.js'

import plugins from '../plugins.js'
import { getFlatConfigName } from '../utils/index.js'

const name = getFlatConfigName('regexp')

export function regexp(): TypedFlatConfigItem[] {
  return [
    {
      name: name.setup,
      plugins: {
        regexp: plugins['pluginRegexp'],
      },
    },
    {
      name: name.rules,
      rules: {
        // eslint-plugin-regexp
        // https://github.com/ota-meshi/eslint-plugin-regexp
        ...pluginRegexp.configs['flat/recommended'].rules,
      },
    },
  ]
}
