import eslintPluginReact from '@eslint-react/eslint-plugin'
import { eslint_plugin_jsx_a11y_minimal as eslintPluginJsxA11y } from '@eslint-sukka/eslint-plugin-react-jsx-a11y'
import eslintPluginStylistic from '@stylistic/eslint-plugin'
import * as eslintPluginReactCompiler from 'eslint-plugin-react-compiler'
import * as eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'

import type { OptionsReact } from '../options.js'
import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_SRC } from '../globs.js'
import { getFlatConfigName, memo } from '../utils/index.js'

const reactPlugins = eslintPluginReact.configs.all.plugins
/* eslint-disable format/dprint -- disable format */
const pluginJsxA11y = memo(eslintPluginJsxA11y, 'eslint-plugin-react-jsx-a11y')
const pluginReact = memo(reactPlugins['@eslint-react'], 'eslint-plugin-react-x')
const pluginReactCompiler = memo(eslintPluginReactCompiler, 'eslint-plugin-react-compiler')
const pluginReactDebug = memo(reactPlugins['@eslint-react/debug'], 'eslint-plugin-react-debug')
const pluginReactDom = memo(reactPlugins['@eslint-react/dom'], 'eslint-plugin-react-dom')
const pluginReactHooks = memo(eslintPluginReactHooks, 'eslint-plugin-react-hooks')
const pluginReactHooksExtra = memo(reactPlugins['@eslint-react/hooks-extra'], 'eslint-plugin-react-hooks-extra')
const pluginReactHooksNamingConvention = memo(reactPlugins['@eslint-react/naming-convention'], 'eslint-plugin-react-naming-convention')
const pluginReactRefresh = memo(eslintPluginReactRefresh, 'eslint-plugin-react-refresh')
const pluginReactWebApi = memo(reactPlugins['@eslint-react/web-api'], 'eslint-plugin-react-web-api')
const pluginStylistic = memo(eslintPluginStylistic, 'eslint-plugin-stylistic')
/* eslint-enable format/dprint -- disable format */

const name = getFlatConfigName('react')
const files: string[] = [GLOB_SRC]

export function react(options: OptionsReact = {}): TypedFlatConfigItem[] {
  const { stylistic = true, reactCompiler = false } = options

  return [
    {
      name: name.setup,
      files,
      plugins: {
        'react-hooks': pluginReactHooks,
        'react-compiler': pluginReactCompiler,
        'react-refresh': pluginReactRefresh,
        'jsx-a11y': pluginJsxA11y,
        '@stylistic': pluginStylistic,

        '@eslint-react': pluginReact,
        '@eslint-react/dom': pluginReactDom,
        '@eslint-react/web-api': pluginReactWebApi,
        '@eslint-react/debug': pluginReactDebug,
        '@eslint-react/hooks-extra': pluginReactHooksExtra,
        '@eslint-react/naming-convention': pluginReactHooksNamingConvention,
      },
      settings: {
        'react-x': {
          importSource: 'react',
          jsxPragma: 'createElement',
          jsxPragmaFrag: 'Fragment',
          polymorphicPropName: 'as',
          strict: true,
          strictImportCheck: true,
          version: 'detect',
          additionalHooks: {
            useEffect: ['useIsomorphicLayoutEffect'],
            useLayoutEffect: ['useIsomorphicLayoutEffect'],
          },
        },
      },
    },
    {
      name: name.rules,
      files,
      rules: {
        // eslint-plugin-react-hooks
        // https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',

        // eslint-plugin-react-compiler
        // https://github.com/facebook/react/tree/main/compiler/packages/eslint-plugin-react-compiler
        'react-compiler/react-compiler': reactCompiler ? 'error' : 'off',

        // eslint-plugin-react-refresh
        // https://github.com/ArnaudBarre/eslint-plugin-react-refresh
        'react-refresh/only-export-components': 'warn',

        // @eslint-sukka/eslint-plugin-react-jsx-a11y
        // https://github.com/SukkaW/eslint-config-sukka/tree/master/packages/eslint-plugin-react-jsx-a11y
        // Copied from SukkaW/eslint-config-sukka
        // Ref: https://github.com/SukkaW/eslint-config-sukka/blob/3a04c31727e0b5bab98fda1a6440f9932fe42dd8/packages/react/src/react.ts#L383
        'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'] }],
        'jsx-a11y/aria-props': 'warn',
        'jsx-a11y/aria-proptypes': 'warn',
        'jsx-a11y/aria-role': 'warn',
        'jsx-a11y/aria-unsupported-elements': 'warn',
        'jsx-a11y/iframe-has-title': 'warn',
        'jsx-a11y/no-access-key': 'warn',
        'jsx-a11y/role-has-required-aria-props': 'warn',
        'jsx-a11y/role-supports-aria-props': 'warn',
        'jsx-a11y/tabindex-no-positive': 'warn',

        // @eslint-react/eslint-plugin
        // https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin
        ...pluginReact.configs.recommended.rules,
        '@eslint-react/ensure-forward-ref-using-ref': 'error',
        '@eslint-react/no-duplicate-jsx-props': 'error',
        '@eslint-react/no-duplicate-key': 'error',
        '@eslint-react/no-children-count': 'error',
        '@eslint-react/no-children-for-each': 'error',
        '@eslint-react/no-children-only': 'error',
        '@eslint-react/no-children-to-array': 'error',
        '@eslint-react/no-clone-element': 'error',
        '@eslint-react/no-comment-textnodes': 'error',
        '@eslint-react/no-implicit-key': 'error',
        '@eslint-react/no-missing-component-display-name': 'error',
        '@eslint-react/no-unstable-context-value': 'error',

        // Update as of 2021: All current versions of major browsers now automatically use the
        // behavior of rel="noopener" for any target="_blank" link, nullifying this issue.
        // See: https://chromestatus.com/feature/6140064063029248.
        // See: https://stackoverflow.com/a/50709724
        '@eslint-react/dom/no-unsafe-target-blank': 'off',
        '@eslint-react/dom/no-void-elements-with-children': 'error',

        '@eslint-react/web-api/no-leaked-event-listener': 'error',
        '@eslint-react/web-api/no-leaked-interval': 'error',
        '@eslint-react/web-api/no-leaked-resize-observer': 'error',
        '@eslint-react/web-api/no-leaked-timeout': 'error',

        '@eslint-react/hooks-extra/no-unnecessary-use-callback': 'error',
        '@eslint-react/hooks-extra/no-unnecessary-use-memo': 'error',
        '@eslint-react/hooks-extra/no-useless-custom-hooks': 'error',
        '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'error',
        '@eslint-react/hooks-extra/no-direct-set-state-in-use-layout-effect': 'error',
      },
    },
    {
      name: name.stylistic,
      files,
      rules: stylistic
        ? {
          // @eslint-react/eslint-plugin
          // https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin
          '@eslint-react/prefer-destructuring-assignment': 'error',
          '@eslint-react/prefer-react-namespace-import': 'warn',
          '@eslint-react/prefer-shorthand-boolean': 'error',
          '@eslint-react/prefer-shorthand-fragment': 'off',
          '@eslint-react/avoid-shorthand-boolean': 'off',
          '@eslint-react/avoid-shorthand-fragment': 'error',

          // @stylistic/eslint-plugin
          // https://github.com/eslint-stylistic/eslint-stylistic/tree/main/packages/eslint-plugin-jsx
          '@stylistic/jsx-closing-bracket-location': 'error',
          '@stylistic/jsx-closing-tag-location': 'error',
          '@stylistic/jsx-curly-brace-presence': [
            'error',
            { propElementValues: 'always' },
          ],
          '@stylistic/jsx-equals-spacing': 'error',
          '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
          '@stylistic/jsx-function-call-newline': ['error', 'multiline'],
          '@stylistic/jsx-max-props-per-line': [
            'error',
            { maximum: 1, when: 'multiline' },
          ],
          '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'non-jsx' }],
          '@stylistic/jsx-pascal-case': [
            'error',
            { allowNamespace: true, ignore: ['motion'] },
          ],
          '@stylistic/jsx-self-closing-comp': ['error', { component: true, html: true }],
          '@stylistic/jsx-tag-spacing': [
            'error',
            {
              afterOpening: 'never',
              beforeClosing: 'never',
              beforeSelfClosing: 'always',
              closingSlash: 'never',
            },
          ],
          '@stylistic/jsx-wrap-multilines': [
            'error',
            {
              arrow: 'parens-new-line',
              assignment: 'parens-new-line',
              condition: 'parens-new-line',
              declaration: 'parens-new-line',
              logical: 'parens-new-line',
              prop: 'parens-new-line',
              propertyValue: 'parens-new-line',
              return: 'parens-new-line',
            },
          ],
          '@stylistic/jsx-sort-props': [
            'error',
            {
              callbacksLast: true,
              shorthandFirst: true,
              multiline: 'last',
              reservedFirst: true,
            },
          ],
        }
        : {},
    },
  ]
}
