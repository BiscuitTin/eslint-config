import eslintPluginNextJs from '@next/eslint-plugin-next'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'

import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_SRC } from '../globs.js'
import { getFlatConfigName, memo } from '../utils/index.js'

const pluginNextJs = memo(eslintPluginNextJs, 'eslint-plugin-next')
const pluginReactRefresh = memo(eslintPluginReactRefresh, 'eslint-plugin-react-refresh')

const name = getFlatConfigName('next-js')
const files: string[] = [GLOB_SRC]

export function nextJs(): TypedFlatConfigItem[] {
  return [
    {
      name: name.setup,
      files,
      plugins: {
        '@next/next': pluginNextJs,
        'react-refresh': pluginReactRefresh,
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- missing type info
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
