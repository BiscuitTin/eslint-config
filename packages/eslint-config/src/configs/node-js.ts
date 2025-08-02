import type { Linter } from 'eslint'

import eslintPluginNode from 'eslint-plugin-n'
import globals from 'globals'

import type { OptionsNodeJs } from '../options.js'
import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_JS, GLOB_TS } from '../globs.js'
import { getFlatConfigName, getPackageJson, memo } from '../utils/index.js'

const pluginNode = memo(eslintPluginNode, 'eslint-plugin-n')

const name = getFlatConfigName('node-js')
const isModule = getPackageJson()?.type === 'module'

const globalsCommonJs: Linter.Globals = {
  ...globals.es2025,
  ...globals.node,
  ...globals.commonjs,
  __dirname: 'readonly',
  __filename: 'readonly',
}

const globalsModule: Linter.Globals = {
  ...globals.es2025,
  ...globals.node,
  __dirname: 'off',
  __filename: 'off',
  exports: 'off',
  module: 'off',
  require: 'off',
}

export function nodeJs(options: OptionsNodeJs = {}): TypedFlatConfigItem[] {
  const { module = isModule, extraFiles = [] } = options

  const files: string[] = [GLOB_JS, GLOB_TS, ...extraFiles]

  return [
    {
      name: name.setup,
      files,
      plugins: {
        node: pluginNode,
      },
      languageOptions: {
        ecmaVersion: 'latest',
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
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
        'node/no-exports-assign': 'error',
        'node/no-process-exit': 'error',
        'node/no-unpublished-bin': 'error',
        'node/no-unpublished-import': 'error',
        'node/no-unpublished-require': 'error',
        'node/no-unsupported-features/es-builtins': 'error',
        'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
        'node/no-unsupported-features/node-builtins': 'error',
        'node/process-exit-as-throw': 'error',
        'node/hashbang': 'error',

        // Will handled by `eslint-plugin-import-x`
        'node/no-extraneous-import': 'off',
        'node/no-extraneous-require': 'off',
        'node/no-missing-import': 'off',
        'node/no-missing-require': 'off',

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
      name: name.script,
      files: ['**/*.[jt]s'],
      languageOptions: {
        sourceType: module ? 'module' : 'commonjs',
        parserOptions: {
          ecmaFeatures: {
            globalReturn: !module,
          },
        },
        globals: {
          ...(module ? globalsModule : globalsCommonJs),
        },
      },
    },
    {
      name: name.commonjs,
      files: ['**/*.c[jt]s'],
      languageOptions: {
        sourceType: 'commonjs',
        parserOptions: {
          ecmaFeatures: {
            globalReturn: true,
          },
        },
        globals: {
          ...globalsCommonJs,
        },
      },
      rules: {
        strict: ['error', 'global'],
        'node/no-unsupported-features/es-syntax': ['error', { ignores: [] }],
      },
    },
    {
      name: name.module,
      files: ['**/*.m[jt]s'],
      languageOptions: {
        sourceType: 'module',
        parserOptions: {
          ecmaFeatures: {
            globalReturn: false,
          },
        },
        globals: {
          ...globalsModule,
        },
      },
    },
  ]
}
