import type { ESLint } from 'eslint'

// @ts-expect-error missing type info
import pluginESLintComments from '@eslint-community/eslint-plugin-eslint-comments'
import pluginReact from '@eslint-react/eslint-plugin'
import { eslint_plugin_jsx_a11y_minimal as pluginJsxA11y } from '@eslint-sukka/eslint-plugin-react-jsx-a11y'
import pluginJson from '@eslint/json'
// @ts-expect-error missing type info
import pluginNextJs from '@next/eslint-plugin-next'
import pluginStylisticJsx from '@stylistic/eslint-plugin-jsx'
import pluginAntfu from 'eslint-plugin-antfu'
// @ts-expect-error missing type info
import pluginAutofix from 'eslint-plugin-autofix'
import pluginFormat from 'eslint-plugin-format'
import pluginImportX from 'eslint-plugin-import-x'
import pluginJsonc from 'eslint-plugin-jsonc'
import pluginNode from 'eslint-plugin-n'
import pluginPerfectionist from 'eslint-plugin-perfectionist'
// @ts-expect-error missing type info
import * as pluginReactCompiler from 'eslint-plugin-react-compiler'
// @ts-expect-error missing type info
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactPreferFunctionComponent from 'eslint-plugin-react-prefer-function-component'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import * as pluginRegexp from 'eslint-plugin-regexp'
// @ts-expect-error missing type info
import pluginTailwindCSS from 'eslint-plugin-tailwindcss'
import pluginUnicorn from 'eslint-plugin-unicorn'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import { plugin as pluginTypescript } from 'typescript-eslint'

import { memo } from './utils/index.js'

const reactPlugins = pluginReact.configs.all.plugins

const plugins: Record<string, ESLint.Plugin> = {
  pluginAntfu: memo(pluginAntfu, 'eslint-plugin-antfu'),
  pluginAutofix: memo(pluginAutofix, 'eslint-plugin-autofix') as ESLint.Plugin,

  pluginESLintComments: memo(
    pluginESLintComments,
    'eslint-plugin-eslint-comments',
  ) as ESLint.Plugin,

  pluginFormat: memo(pluginFormat, 'eslint-plugin-format'),

  pluginImportX: memo(pluginImportX, 'eslint-plugin-import-x') as unknown as ESLint.Plugin,

  pluginJson: memo(pluginJson, 'eslint-plugin-json'),
  pluginJsonc: memo(pluginJsonc, 'eslint-plugin-jsonc') as unknown as ESLint.Plugin,
  pluginJsxA11y: memo(pluginJsxA11y, 'eslint-plugin-react-jsx-a11y'),

  pluginNextJs: memo(pluginNextJs, 'eslint-plugin-next') as ESLint.Plugin,
  pluginNode: memo(pluginNode, 'eslint-plugin-n'),

  pluginPerfectionist: memo(pluginPerfectionist, 'eslint-plugin-perfectionist'),

  pluginReact: memo(
    reactPlugins['@eslint-react'],
    'eslint-plugin-react-x',
  ) as unknown as ESLint.Plugin,
  pluginReactCompiler: memo(
    pluginReactCompiler,
    'eslint-plugin-react-compiler',
  ) as ESLint.Plugin,
  pluginReactDebug: memo(
    reactPlugins['@eslint-react/debug'],
    'eslint-plugin-react-debug',
  ) as unknown as ESLint.Plugin,
  pluginReactDom: memo(
    reactPlugins['@eslint-react/dom'],
    'eslint-plugin-react-dom',
  ) as unknown as ESLint.Plugin,
  pluginReactHooks: memo(pluginReactHooks, 'eslint-plugin-react-hooks') as ESLint.Plugin,
  pluginReactHooksExtra: memo(
    reactPlugins['@eslint-react/hooks-extra'],
    'eslint-plugin-react-hooks-extra',
  ) as unknown as ESLint.Plugin,
  pluginReactHooksNamingConvention: memo(
    reactPlugins['@eslint-react/naming-convention'],
    'eslint-plugin-react-naming-convention',
  ) as unknown as ESLint.Plugin,
  pluginReactPreferFunctionComponent: memo<ESLint.Plugin>(
    pluginReactPreferFunctionComponent,
    'eslint-plugin-react-prefer-function-component',
  ),
  pluginReactRefresh: memo(pluginReactRefresh, 'eslint-plugin-react-refresh'),
  pluginReactWebApi: memo(
    reactPlugins['@eslint-react/web-api'],
    'eslint-plugin-react-web-api',
  ) as unknown as ESLint.Plugin,

  pluginRegexp: memo(pluginRegexp, 'eslint-plugin-regexp'),

  pluginStylisticJsx: memo(pluginStylisticJsx, 'eslint-plugin-jsx'),

  pluginTailwindCSS: memo(pluginTailwindCSS, 'eslint-plugin-tailwindcss') as ESLint.Plugin,
  pluginTypescript: memo(pluginTypescript, 'typescript-eslint') as unknown as ESLint.Plugin,

  pluginUnicorn: memo(pluginUnicorn, 'eslint-plugin-unicorn'),
  pluginUnusedImports: memo(pluginUnusedImports, 'eslint-plugin-unused-imports'),
}

export default plugins
