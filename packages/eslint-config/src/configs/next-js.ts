// @ts-expect-error missing type info
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Next.js ESLint plugin missing types
      rules: {
        // @next/eslint-plugin-next
        // https://www.npmjs.com/package/@next/eslint-plugin-next
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- Next.js ESLint plugin missing types
        ...pluginNextJs?.configs?.recommended?.rules,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- Next.js ESLint plugin missing types
        ...pluginNextJs?.configs['core-web-vitals'].rules,

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
