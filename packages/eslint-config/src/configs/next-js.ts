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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- missing type info
      rules: {
        // @next/eslint-plugin-next
        // https://www.npmjs.com/package/@next/eslint-plugin-next
        // @ts-expect-error missing type info
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, import-x/no-named-as-default-member -- missing type info
        ...pluginNextJs.flatConfig.coreWebVitals.rules,

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
