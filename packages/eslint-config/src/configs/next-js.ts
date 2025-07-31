/* eslint-disable import-x/no-named-as-default-member -- FIXME */

import pluginNextJs from '@next/eslint-plugin-next'

import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_SRC } from '../globs.js'
import plugins from '../plugins.js'
import { getFlatConfigName } from '../utils/index.js'

const name = getFlatConfigName('next-js')
const files: string[] = [GLOB_SRC]

export function nextJs(): TypedFlatConfigItem[] {
  return [
    {
      name: name.setup,
      files,
      plugins: {
        '@next/next': plugins['pluginNextJs'],
        'react-refresh': plugins['pluginReactRefresh'],
      },
    },
    {
      name: name.rules,
      files,

      rules: {
        // @next/eslint-plugin-next
        // https://www.npmjs.com/package/@next/eslint-plugin-next

        ...pluginNextJs.configs.recommended.rules,

        ...pluginNextJs.configs['core-web-vitals'].rules,

        // eslint-plugin-react-refresh
        // https://github.com/ArnaudBarre/eslint-plugin-react-refresh
        'react-refresh/only-export-components': ['warn', {
          allowExportNames: [
            'config',
            'generateStaticParams',
            'metadata',
            'generateMetadata',
            'viewport',
            'generateViewport',
          ],
        }],
      },
    },
  ]
}
