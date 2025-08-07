import { eslint_plugin_jsx_a11y_minimal as eslintPluginJsxA11y } from '@eslint-sukka/eslint-plugin-react-jsx-a11y'
import eslintPluginStylistic from '@stylistic/eslint-plugin'
import * as eslintPluginReactCompiler from 'eslint-plugin-react-compiler'
import eslintPluginReactDom from 'eslint-plugin-react-dom'
import * as eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactHooksExtra from 'eslint-plugin-react-hooks-extra'
import eslintPluginReactNamingConvention from 'eslint-plugin-react-naming-convention'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginReactWebApi from 'eslint-plugin-react-web-api'
import eslintPluginReactX from 'eslint-plugin-react-x'
import { plugin as eslintPluginTypescript } from 'typescript-eslint'

import type { OptionsReact } from '../options.js'
import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_SRC, GLOB_TS, GLOB_TSX } from '../globs.js'
import { getFlatConfigName, memo } from '../utils/index.js'

const pluginJsxA11y = memo(eslintPluginJsxA11y, 'eslint-plugin-react-jsx-a11y')
const pluginReact = memo(eslintPluginReactX, 'eslint-plugin-react-x')
const pluginReactCompiler = memo(eslintPluginReactCompiler, 'eslint-plugin-react-compiler')
const pluginReactDom = memo(eslintPluginReactDom, 'eslint-plugin-react-dom')
const pluginReactHooks = memo(eslintPluginReactHooks, 'eslint-plugin-react-hooks')
const pluginReactHooksExtra = memo(eslintPluginReactHooksExtra, 'eslint-plugin-react-hooks-extra')
const pluginReactNamingConvention = memo(eslintPluginReactNamingConvention, 'eslint-plugin-react-naming-convention')
const pluginReactRefresh = memo(eslintPluginReactRefresh, 'eslint-plugin-react-refresh')
const pluginReactWebApi = memo(eslintPluginReactWebApi, 'eslint-plugin-react-web-api')
const pluginStylistic = memo(eslintPluginStylistic, 'eslint-plugin-stylistic')
const pluginTypescript = memo(eslintPluginTypescript, '@typescript-eslint/eslint-plugin')

const name = getFlatConfigName('react')
const files: string[] = [GLOB_SRC]

const configSetup: TypedFlatConfigItem = {
  name: name.setup,
  files,
  plugins: {
    'react-hooks': pluginReactHooks,
    'react-refresh': pluginReactRefresh,
    'jsx-a11y': pluginJsxA11y,
    '@eslint-react': pluginReact,
    '@eslint-react/dom': pluginReactDom,
    '@eslint-react/web-api': pluginReactWebApi,
    '@eslint-react/hooks-extra': pluginReactHooksExtra,
    '@eslint-react/naming-convention': pluginReactNamingConvention,
  },
  settings: {
    'react-x': {
      version: 'detect',
      importSource: 'react',
      strict: true,
      skipImportCheck: true,
      polymorphicPropName: 'as',
      jsxPragma: 'createElement',
      jsxPragmaFrag: 'Fragment',
      additionalHooks: {
        useEffect: ['useIsomorphicLayoutEffect'],
        useLayoutEffect: ['useIsomorphicLayoutEffect'],
      },
    },
  },
}

const configCommonRules: TypedFlatConfigItem = {
  name: name.rules,
  files,
  rules: {
    // eslint-plugin-react-hooks
    // https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': ['error', { additionalHooks: 'useIsomorphicLayoutEffect' }],

    // eslint-plugin-react-refresh
    // https://github.com/ArnaudBarre/eslint-plugin-react-refresh
    'react-refresh/only-export-components': 'warn',

    // @eslint-sukka/eslint-plugin-react-jsx-a11y
    // https://github.com/SukkaW/eslint-config-sukka/tree/master/packages/eslint-plugin-react-jsx-a11y
    // Copied from SukkaW/eslint-config-sukka
    // Ref: https://github.com/SukkaW/eslint-config-sukka/blob/3a04c31727e0b5bab98fda1a6440f9932fe42dd8/packages/react/src/react.ts#L383-L398
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

    // @eslint-react/eslint-plugin - eslint-plugin-react-x
    // https://eslint-react.xyz/docs/rules/overview#x-rules
    '@eslint-react/jsx-key-before-spread': 'warn',
    '@eslint-react/jsx-no-duplicate-props': 'error',
    '@eslint-react/jsx-no-iife': 'off',
    '@eslint-react/jsx-no-undef': 'off',
    '@eslint-react/jsx-uses-react': 'warn',
    '@eslint-react/jsx-uses-vars': 'warn',
    '@eslint-react/no-access-state-in-setstate': 'error',
    '@eslint-react/no-array-index-key': 'warn',
    '@eslint-react/no-children-count': 'error',
    '@eslint-react/no-children-for-each': 'error',
    '@eslint-react/no-children-map': 'warn',
    '@eslint-react/no-children-only': 'error',
    '@eslint-react/no-children-prop': 'off',
    '@eslint-react/no-children-to-array': 'error',
    '@eslint-react/no-class-component': 'off',
    '@eslint-react/no-clone-element': 'error',
    '@eslint-react/no-comment-textnodes': 'error',
    '@eslint-react/no-complex-conditional-rendering': 'off',
    '@eslint-react/no-component-will-mount': 'error',
    '@eslint-react/no-component-will-receive-props': 'error',
    '@eslint-react/no-component-will-update': 'error',
    '@eslint-react/no-context-provider': 'warn',
    '@eslint-react/no-create-ref': 'error',
    '@eslint-react/no-default-props': 'error',
    '@eslint-react/no-direct-mutation-state': 'error',
    '@eslint-react/no-duplicate-key': 'error',
    '@eslint-react/no-forward-ref': 'warn',
    '@eslint-react/no-implicit-key': 'error',
    '@eslint-react/no-leaked-conditional-rendering': 'off', // type checking
    '@eslint-react/no-missing-component-display-name': 'error',
    '@eslint-react/no-missing-context-display-name': 'off',
    '@eslint-react/no-missing-key': 'error',
    '@eslint-react/no-misused-capture-owner-stack': 'error',
    '@eslint-react/no-nested-component-definitions': 'error',
    '@eslint-react/no-nested-lazy-component-declarations': 'error',
    '@eslint-react/no-prop-types': 'error',
    '@eslint-react/no-redundant-should-component-update': 'error',
    '@eslint-react/no-set-state-in-component-did-mount': 'warn',
    '@eslint-react/no-set-state-in-component-did-update': 'warn',
    '@eslint-react/no-set-state-in-component-will-update': 'warn',
    '@eslint-react/no-string-refs': 'error',
    '@eslint-react/no-unsafe-component-will-mount': 'warn',
    '@eslint-react/no-unsafe-component-will-receive-props': 'warn',
    '@eslint-react/no-unsafe-component-will-update': 'warn',
    '@eslint-react/no-unstable-context-value': 'error',
    '@eslint-react/no-unstable-default-props': 'warn',
    '@eslint-react/no-unused-class-component-members': 'warn',
    '@eslint-react/no-unused-state': 'warn',
    '@eslint-react/no-use-context': 'warn',
    '@eslint-react/no-useless-forward-ref': 'error',
    '@eslint-react/no-useless-fragment': 'off',
    '@eslint-react/prefer-destructuring-assignment': 'off', // stylistic
    '@eslint-react/prefer-react-namespace-import': 'off', // stylistic
    '@eslint-react/prefer-read-only-props': 'off', // type checking
    '@eslint-react/prefer-shorthand-boolean': 'off', // stylistic
    '@eslint-react/prefer-shorthand-fragment': 'off', // stylistic
    '@eslint-react/avoid-shorthand-boolean': 'off', // stylistic
    '@eslint-react/avoid-shorthand-fragment': 'off', // stylistic

    // @eslint-react/eslint-plugin - eslint-plugin-react-dom
    // https://eslint-react.xyz/docs/rules/overview#dom-rules
    '@eslint-react/dom/no-dangerously-set-innerhtml': 'warn',
    '@eslint-react/dom/no-dangerously-set-innerhtml-with-children': 'error',
    '@eslint-react/dom/no-find-dom-node': 'error',
    '@eslint-react/dom/no-flush-sync': 'error',
    '@eslint-react/dom/no-hydrate': 'error',
    '@eslint-react/dom/no-missing-button-type': 'warn',
    '@eslint-react/dom/no-missing-iframe-sandbox': 'warn',
    '@eslint-react/dom/no-namespace': 'error',
    '@eslint-react/dom/no-render': 'error',
    '@eslint-react/dom/no-render-return-value': 'error',
    '@eslint-react/dom/no-script-url': 'warn',
    '@eslint-react/dom/no-unknown-property': 'off',
    '@eslint-react/dom/no-unsafe-iframe-sandbox': 'warn',
    // Update as of 2021: All current versions of major browsers now automatically use the
    // behavior of rel="noopener" for any target="_blank" link, nullifying this issue.
    // See: https://chromestatus.com/feature/6140064063029248.
    // See: https://stackoverflow.com/a/50709724
    '@eslint-react/dom/no-unsafe-target-blank': 'off',
    '@eslint-react/dom/no-use-form-state': 'error',
    '@eslint-react/dom/no-void-elements-with-children': 'error',

    // @eslint-react/eslint-plugin - eslint-plugin-react-web-api
    // https://eslint-react.xyz/docs/rules/overview#web-api-rules
    '@eslint-react/web-api/no-leaked-event-listener': 'error',
    '@eslint-react/web-api/no-leaked-interval': 'error',
    '@eslint-react/web-api/no-leaked-resize-observer': 'error',
    '@eslint-react/web-api/no-leaked-timeout': 'error',

    // @eslint-react/eslint-plugin - eslint-plugin-react-hooks-extra
    // https://eslint-react.xyz/docs/rules/overview#hooks-extra-rules
    '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'error',
    '@eslint-react/hooks-extra/no-direct-set-state-in-use-layout-effect': 'error',
    '@eslint-react/hooks-extra/no-unnecessary-use-callback': 'error',
    '@eslint-react/hooks-extra/no-unnecessary-use-memo': 'error',
    '@eslint-react/hooks-extra/no-unnecessary-use-prefix': 'error',
    '@eslint-react/hooks-extra/prefer-use-state-lazy-initialization': 'warn',

    // @eslint-react/eslint-plugin - eslint-plugin-react-naming-convention
    // https://eslint-react.xyz/docs/rules/overview#naming-convention-rules
    '@eslint-react/naming-convention/component-name': 'warn',
    '@eslint-react/naming-convention/context-name': 'warn',
    '@eslint-react/naming-convention/filename': 'off', // stylistic
    '@eslint-react/naming-convention/filename-extension': 'warn',
    '@eslint-react/naming-convention/use-state': 'warn',
  },
}

const configStylistic: TypedFlatConfigItem = {
  name: name.stylistic,
  files,
  plugins: {
    '@stylistic': pluginStylistic,
  },
  rules: {
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
    '@stylistic/jsx-curly-brace-presence': ['error', { propElementValues: 'always' }],
    '@stylistic/jsx-equals-spacing': 'error',
    '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
    '@stylistic/jsx-function-call-newline': ['error', 'multiline'],
    '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
    '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'non-jsx' }],
    '@stylistic/jsx-pascal-case': ['error', { allowNamespace: true, ignore: ['motion'] }],
    '@stylistic/jsx-self-closing-comp': ['error', { component: true, html: true }],
    '@stylistic/jsx-tag-spacing': ['error', {
      afterOpening: 'never',
      beforeClosing: 'never',
      beforeSelfClosing: 'always',
      closingSlash: 'never',
    }],
    '@stylistic/jsx-wrap-multilines': ['error', {
      arrow: 'parens-new-line',
      assignment: 'parens-new-line',
      condition: 'parens-new-line',
      declaration: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
      propertyValue: 'parens-new-line',
      return: 'parens-new-line',
    }],
    '@stylistic/jsx-sort-props': ['error', {
      callbacksLast: true,
      shorthandFirst: true,
      multiline: 'last',
      reservedFirst: true,
    }],
  },
}

const configTypeCheck: TypedFlatConfigItem = {
  name: `${name.base}/type-check`,
  files: [GLOB_TS, GLOB_TSX],
  plugins: {
    '@typescript-eslint': pluginTypescript,
  },
  rules: {
    // @eslint-react/eslint-plugin
    // https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin
    '@eslint-react/dom/no-unknown-property': 'off',
    '@eslint-react/jsx-no-duplicate-props': 'off',
    '@eslint-react/jsx-uses-react': 'off',
    '@eslint-react/jsx-uses-vars': 'off',
    '@eslint-react/no-leaked-conditional-rendering': 'error',
    '@eslint-react/prefer-read-only-props': 'warn',

    // typescript-eslint
    // Disables checking an asynchronous function passed as a JSX attribute expected to be a function that returns `void`
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
  },
}

const configReactCompiler: TypedFlatConfigItem = {
  name: `${name.base}/react-compiler`,
  files,
  plugins: {
    'react-compiler': pluginReactCompiler,
  },
  rules: {
    // eslint-plugin-react-hooks
    // https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
    // 'react-hooks/react-compiler': 'error', // TODO: Enable when eslint-plugin-react-hooks v6 is released

    // eslint-plugin-react-compiler
    // https://github.com/facebook/react/tree/main/compiler/packages/eslint-plugin-react-compiler
    'react-compiler/react-compiler': 'error',
  },
}

export function react(options: OptionsReact = {}): TypedFlatConfigItem[] {
  const { stylistic = true, typeCheck = false, reactCompiler = false } = options

  const configs: TypedFlatConfigItem[] = [configSetup, configCommonRules]

  if (stylistic) configs.push(configStylistic)

  if (typeCheck) configs.push(configTypeCheck)

  if (reactCompiler) configs.push(configReactCompiler)

  return configs
}
