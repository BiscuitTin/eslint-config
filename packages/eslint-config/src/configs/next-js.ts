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
      rules: {
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

        // @next/eslint-plugin-next
        // https://www.npmjs.com/package/@next/eslint-plugin-next
        '@next/next/google-font-display': 'warn',
        '@next/next/google-font-preconnect': 'warn',
        '@next/next/next-script-for-ga': 'warn',
        '@next/next/no-async-client-component': 'warn',
        '@next/next/no-before-interactive-script-outside-document': 'warn',
        '@next/next/no-css-tags': 'warn',
        '@next/next/no-head-element': 'warn',
        '@next/next/no-img-element': 'warn',
        '@next/next/no-page-custom-font': 'warn',
        '@next/next/no-styled-jsx-in-document': 'warn',
        '@next/next/no-title-in-document-head': 'warn',
        '@next/next/no-typos': 'warn',
        '@next/next/no-unwanted-polyfillio': 'warn',
        '@next/next/inline-script-id': 'error',
        '@next/next/no-assign-module-variable': 'error',
        '@next/next/no-document-import-in-page': 'error',
        '@next/next/no-duplicate-head': 'error',
        '@next/next/no-head-import-in-document': 'error',
        '@next/next/no-script-component-in-head': 'error',
        '@next/next/no-html-link-for-pages': 'error',
        '@next/next/no-sync-scripts': 'error',
      },
    },
  ]
}
