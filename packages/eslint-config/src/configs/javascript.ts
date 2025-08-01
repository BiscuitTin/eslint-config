import type { ESLint, Linter } from 'eslint'

import js from '@eslint/js'
import eslintPluginAntfu from 'eslint-plugin-antfu'
// @ts-expect-error missing type info
import eslintPluginAutofix from 'eslint-plugin-autofix'
import eslintPluginImportX, { createNodeResolver } from 'eslint-plugin-import-x'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

import type { OptionsJavaScript } from '../options.js'
import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_JS, GLOB_JSX } from '../globs.js'
import { getFlatConfigName, memo } from '../utils/index.js'

const pluginAntfu = memo(eslintPluginAntfu, 'eslint-plugin-antfu')
const pluginAutofix = memo(eslintPluginAutofix, 'eslint-plugin-autofix') as ESLint.Plugin
const pluginImportX = memo(eslintPluginImportX, 'eslint-plugin-import-x')
const pluginUnusedImports = memo(eslintPluginUnusedImports, 'eslint-plugin-unused-imports')

const name = getFlatConfigName('javascript')
const files: string[] = [GLOB_JS, GLOB_JSX]

const commonjsGlobalsOffList = Object.keys(globals.commonjs).map<
  Record<string, Linter.GlobalConf>
>((key) => ({ [key]: 'off' }))
const commonjsGlobalsOff = Object.assign({}, ...commonjsGlobalsOffList) as Record<
  string,
  Linter.GlobalConf
>

const extensions = ['.js', '.jsx', '.cjs', '.mjs']

export function javascript(options: OptionsJavaScript = {}): TypedFlatConfigItem[] {
  const { env = { browser: true }, module = true } = options

  const sourceType = module ? 'module' : 'commonjs'

  return [
    {
      name: name.setup,
      files,
      plugins: {
        'import-x': pluginImportX,
        'unused-imports': pluginUnusedImports,
        autofix: pluginAutofix,
        antfu: pluginAntfu,
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      languageOptions: {
        // https://eslint.org/docs/latest/use/configure/language-options
        sourceType,
        ecmaVersion: 'latest',
        parserOptions: {
          // https://eslint.org/docs/latest/use/configure/language-options#specifying-parser-options
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
        globals: {
          // https://eslint.org/docs/latest/use/configure/language-options#specifying-globals
          ...globals.es2025,
          ...(module ? {} : globals.commonjs),
          ...(env.browser ? globals.browser : {}),
          ...(env.customGlobals),
        },
      },
      settings: {
        'import-x/extensions': extensions,
        'import-x/resolver-next': [
          createNodeResolver({ extensions }),
        ],
      },
    },
    {
      name: name.commonjs,
      files: ['**/*.cjs'],
      languageOptions: {
        sourceType: 'commonjs',
        globals: {
          ...globals.commonjs,
        },
      },
    },
    {
      name: name.module,
      files: ['**/*.mjs'],
      languageOptions: {
        sourceType: 'module',
        globals: {
          ...commonjsGlobalsOff,
        },
      },
    },
    {
      name: name.rules,
      files,
      rules: {
        ...js.configs.recommended.rules,

        // Copied from SukkaW/eslint-config-sukka
        // Ref: https://github.com/SukkaW/eslint-config-sukka/blob/3b1c6e5098bd92459237b637a3a63aa60d4cb326/packages/eslint-config-sukka/src/modules/javascript.ts#L451
        'no-unused-vars': [
          'error',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        'unused-imports/no-unused-vars': 'off',

        // disallow use of arguments.caller or arguments.callee
        // Ref: https://github.com/SukkaW/eslint-config-sukka/blob/3b1c6e5098bd92459237b637a3a63aa60d4cb326/packages/eslint-config-sukka/src/modules/javascript.ts#L191
        'no-caller': 'off',
        'autofix/no-caller': 'error',

        // disallow usage of __proto__ property
        // Ref: https://github.com/SukkaW/eslint-config-sukka/blob/3b1c6e5098bd92459237b637a3a63aa60d4cb326/packages/eslint-config-sukka/src/modules/javascript.ts#L275
        'no-proto': 'off',
        'autofix/no-proto': 'error',

        // disallow unnecessary catch clauses
        // Ref: https://github.com/SukkaW/eslint-config-sukka/blob/3b1c6e5098bd92459237b637a3a63aa60d4cb326/packages/eslint-config-sukka/src/modules/javascript.ts#L343
        'no-useless-catch': 'off',
        'autofix/no-useless-catch': 'error',

        // disallow useless string concatenation
        // Ref: https://github.com/SukkaW/eslint-config-sukka/blob/3b1c6e5098bd92459237b637a3a63aa60d4cb326/packages/eslint-config-sukka/src/modules/javascript.ts#L348
        'no-useless-concat': 'off',
        'autofix/no-useless-concat': 'error',

        // require use of the second argument for parseInt()
        // Ref: https://github.com/SukkaW/eslint-config-sukka/blob/3b1c6e5098bd92459237b637a3a63aa60d4cb326/packages/eslint-config-sukka/src/modules/javascript.ts#L382
        radix: 'off',
        'autofix/radix': 'error',

        // ensure that the results of typeof are compared against a valid string
        // Ref: https://github.com/SukkaW/eslint-config-sukka/blob/3b1c6e5098bd92459237b637a3a63aa60d4cb326/packages/eslint-config-sukka/src/modules/javascript.ts#L478
        'valid-typeof': 'off',
        'autofix/valid-typeof': ['error', { requireStringLiterals: true }],

        // disallow new operators with global non-constructor functions
        // Ref: https://github.com/SukkaW/eslint-config-sukka/blob/3b1c6e5098bd92459237b637a3a63aa60d4cb326/packages/eslint-config-sukka/src/modules/javascript.ts#L483
        'no-new-native-nonconstructor': 'off',
        'autofix/no-new-native-nonconstructor': 'error',

        // disallow use of Object.prototypes builtins directly
        // Ref: https://github.com/SukkaW/eslint-config-sukka/blob/3b1c6e5098bd92459237b637a3a63aa60d4cb326/packages/eslint-config-sukka/src/modules/javascript.ts#L1069
        'no-prototype-builtins': 'off',
        'autofix/no-prototype-builtins': 'error',

        // eslint-plugin-antfu
        // https://github.com/antfu/eslint-plugin-antfu
        'antfu/no-top-level-await': 'error',
        'antfu/top-level-function': 'error',
      },
    },
  ]
}
