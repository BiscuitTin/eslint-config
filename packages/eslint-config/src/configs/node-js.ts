import globals from 'globals'

import type { OptionsNodeJs } from '../options.js'
import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_JS } from '../globs.js'
import plugins from '../plugins.js'
import { getFlatConfigName, getPackageJson } from '../utils/index.js'

const name = getFlatConfigName('node-js')
const isModule = getPackageJson()?.type === 'module'

export function nodeJs(options: OptionsNodeJs = {}): TypedFlatConfigItem[] {
  const { module = isModule, extraFiles = [] } = options

  const files = [GLOB_JS, ...extraFiles]

  return [
    {
      name: name.setup,
      files,
      plugins: {
        node: plugins['pluginNode'],
      },
      languageOptions: {
        sourceType: module ? 'module' : 'commonjs',
        ecmaVersion: 'latest',
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
        globals: {
          ...globals.es2025,
          ...globals.node,
          ...(module
            ? {
              __dirname: 'off',
              __filename: 'off',
              exports: 'off',
              module: 'off',
              require: 'off',
            }
            : {
              ...globals.commonjs,
              __dirname: 'readonly',
              __filename: 'readonly',
            }),
        },
      },
    },
    {
      name: name.rules,
      files,
      rules: {
        // eslint-plugin-n
        // pluginNode.configs.commons
        // Ref: https://github.com/eslint-community/eslint-plugin-n/blob/ccf5f9e482c32f2fd2d5f78649d7f837a5db8870/lib/configs/_commons.js#L6
        'node/no-deprecated-api': 'error',
        'node/no-extraneous-import': 'error',
        'node/no-extraneous-require': 'error',
        'node/no-exports-assign': 'error',
        'node/no-missing-import': 'error',
        'node/no-missing-require': 'error',
        'node/no-process-exit': 'error',
        'node/no-unpublished-bin': 'error',
        'node/no-unpublished-import': 'error',
        'node/no-unpublished-require': 'error',
        'node/no-unsupported-features/es-builtins': 'error',
        'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
        'node/no-unsupported-features/node-builtins': 'error',
        'node/process-exit-as-throw': 'error',
        'node/hashbang': 'error',

        // Require error handling in callbacks
        'node/handle-callback-err': ['error', '^error$'],
        // Disallow `new` operators with calls to `require`
        'node/no-new-require': 'error',
        // Disallow string concatenation with `__dirname` and `__filename`
        'node/no-path-concat': 'error',

        // Bundler specific rules
        'node/prefer-global/buffer': ['error', 'never'],
        'node/prefer-global/console': ['error', 'always'],
        'node/prefer-global/process': ['error', 'never'],
        'node/prefer-global/text-decoder': ['error', 'always'],
        'node/prefer-global/text-encoder': ['error', 'always'],
        'node/prefer-global/url': ['error', 'always'],
        'node/prefer-global/url-search-params': ['error', 'always'],

        ...(!module && {
          strict: ['error', 'global'],
          'node/no-unsupported-features/es-syntax': ['error', { ignores: [] }],
        }),
      },
    },
    {
      name: name.commonjs,
      files: ['*.c[jt]s', '.*.c[jt]s'],
      languageOptions: {
        sourceType: 'commonjs',
        globals: {
          ...globals.commonjs,
          __dirname: 'readonly',
          __filename: 'readonly',
        },
      },
      rules: {
        strict: ['error', 'global'],
        'node/no-unsupported-features/es-syntax': ['error', { ignores: [] }],
      },
    },
  ]
}
