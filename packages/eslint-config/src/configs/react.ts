import pluginReact from '@eslint-react/eslint-plugin'

import type { OptionsReact } from '../options.js'
import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_SRC } from '../globs.js'
import plugins from '../plugins.js'
import { getFlatConfigName } from '../utils/index.js'

const name = getFlatConfigName('react')
const files: string[] = [GLOB_SRC]

export function react(options: OptionsReact = {}): TypedFlatConfigItem[] {
  const { stylistic = true, reactCompiler = false } = options

  return [
    {
      name: name.setup,
      files,
      plugins: {
        'react-hooks': plugins['pluginReactHooks'],
        'react-compiler': plugins['pluginReactCompiler'],
        'react-refresh': plugins['pluginReactRefresh'],
        'react-prefer-function-component': plugins['pluginReactPreferFunctionComponent'],
        'jsx-a11y': plugins['pluginJsxA11y'],
        '@stylistic/jsx': plugins['pluginStylisticJsx'],

        '@eslint-react': plugins['pluginReact'],
        '@eslint-react/dom': plugins['pluginReactDom'],
        '@eslint-react/web-api': plugins['pluginReactWebApi'],
        '@eslint-react/debug': plugins['pluginReactDebug'],
        '@eslint-react/hooks-extra': plugins['pluginReactHooksExtra'],
        '@eslint-react/naming-convention': plugins['pluginReactHooksNamingConvention'],
      },
      settings: {
        'react-x': {
          additionalHooks: {
            useLayoutEffect: ['useIsomorphicLayoutEffect'],
          },
          polymorphicPropName: 'as',
          strictImportCheck: true,
          version: 'detect',
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

        // eslint-plugin-react-prefer-function-component
        // https://github.com/tatethurston/eslint-plugin-react-prefer-function-component
        'react-prefer-function-component/react-prefer-function-component': 'error',

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
        '@eslint-react/no-children-count': 'error',
        '@eslint-react/no-children-for-each': 'error',
        '@eslint-react/no-children-only': 'error',
        '@eslint-react/no-children-to-array': 'error',
        '@eslint-react/no-clone-element': 'error',
        '@eslint-react/no-comment-textnodes': 'error',
        '@eslint-react/no-implicit-key': 'error',
        '@eslint-react/no-missing-component-display-name': 'error',
        '@eslint-react/no-unstable-context-value': 'error',
        '@eslint-react/dom/no-void-elements-with-children': 'error',
        // Update as of 2021: All current versions of major browsers now automatically use the
        // behavior of rel="noopener" for any target="_blank" link, nullifying this issue.
        // See: https://chromestatus.com/feature/6140064063029248.
        // See: https://stackoverflow.com/a/50709724
        '@eslint-react/dom/no-unsafe-target-blank': 'off',
        '@eslint-react/web-api/no-leaked-interval': 'error',
        '@eslint-react/web-api/no-leaked-resize-observer': 'error',
        '@eslint-react/web-api/no-leaked-timeout': 'error',
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

          // @stylistic/eslint-plugin-jsx
          // https://github.com/eslint-stylistic/eslint-stylistic/tree/main/packages/eslint-plugin-jsx
          '@stylistic/jsx/jsx-closing-bracket-location': 'error',
          '@stylistic/jsx/jsx-closing-tag-location': 'error',
          '@stylistic/jsx/jsx-curly-brace-presence': [
            'error',
            { propElementValues: 'always' },
          ],
          '@stylistic/jsx/jsx-equals-spacing': 'error',
          '@stylistic/jsx/jsx-first-prop-new-line': ['error', 'multiline'],
          '@stylistic/jsx/jsx-function-call-newline': ['error', 'multiline'],
          '@stylistic/jsx/jsx-max-props-per-line': [
            'error',
            { maximum: 1, when: 'multiline' },
          ],
          '@stylistic/jsx/jsx-one-expression-per-line': ['error', { allow: 'non-jsx' }],
          '@stylistic/jsx/jsx-pascal-case': [
            'error',
            { allowNamespace: true, ignore: ['motion'] },
          ],
          '@stylistic/jsx/jsx-self-closing-comp': ['error', { component: true, html: true }],
          '@stylistic/jsx/jsx-tag-spacing': [
            'error',
            {
              afterOpening: 'never',
              beforeClosing: 'never',
              beforeSelfClosing: 'always',
              closingSlash: 'never',
            },
          ],
          '@stylistic/jsx/jsx-wrap-multilines': [
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
          '@stylistic/jsx/jsx-sort-props': [
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
