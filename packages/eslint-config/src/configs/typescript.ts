import type { Linter } from 'eslint'

import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import pluginImportX from 'eslint-plugin-import-x'
import process from 'node:process'
import { configs } from 'typescript-eslint'

import type { OptionsTypeScript } from '../options.js'
import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_TS, GLOB_TSX } from '../globs.js'
import parsers from '../parsers.js'
import plugins from '../plugins.js'
import { getFlatConfigName } from '../utils/index.js'

const name = getFlatConfigName('typescript')

const typescriptStrictTypeCheckedRuleList = configs.strictTypeChecked.map(
  (config) => config.rules,
)
const typescriptStrictTypeCheckedRules = Object.assign(
  {},
  ...typescriptStrictTypeCheckedRuleList,
) as Record<string, Linter.RuleEntry>

const typescriptStylisticTypeCheckedRuleList = configs.stylisticTypeChecked.map(
  (config) => config.rules,
)
const typescriptStylisticTypeCheckedRules = Object.assign(
  {},
  ...typescriptStylisticTypeCheckedRuleList,
) as Record<string, Linter.RuleEntry>

export function typescript(options: OptionsTypeScript = {}): TypedFlatConfigItem[] {
  const {
    isInEditor = false,
    tsconfigPath = true,
    tsconfigRootDir = process.cwd(),
    allowDefaultProject = [],
    extraFileExtensions = [],
    reactTypeCheck = false,
  } = options

  const files = [
    GLOB_TS,
    GLOB_TSX,
    ...extraFileExtensions.map((extension) => `**/*${extension}`),
  ]

  const tsProjectOptions = tsconfigPath === true
    ? {
      projectService: {
        allowDefaultProject,
        loadTypeScriptPlugins: isInEditor,
      },
    }
    : { project: tsconfigPath }

  return [
    {
      name: name.setup,
      files,
      plugins: {
        'import-x': plugins['pluginImportX'],
        '@typescript-eslint': plugins['pluginTypescript'],
        antfu: plugins['pluginAntfu'],
      },
      languageOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        parser: parsers['parserTypescript'],
        parserOptions: {
          // https://typescript-eslint.io/packages/parser#configuration
          ecmaVersion: 'latest',
          extraFileExtensions,
          // Assuming using JSX transform
          // eslint-disable-next-line unicorn/no-null -- Set to null when using JSX transform
          jsxPragma: null,
          ...tsProjectOptions,
          tsconfigRootDir,
          warnOnUnsupportedTypeScriptVersion: true,
        },
      },
      settings: {
        'import-x/extensions': [
          '.js',
          '.jsx',
          '.cjs',
          '.mjs',
          '.ts',
          '.tsx',
          '.cts',
          '.mts',
          ...extraFileExtensions,
        ],
        'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
        'import-x/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx', '.cts', '.mts', ...extraFileExtensions],
        },
        'import-x/resolver-next': [
          // eslint-import-resolver-typescript
          // https://github.com/import-js/eslint-import-resolver-typescript
          createTypeScriptImportResolver({
            alwaysTryTypes: true,
            project: tsconfigPath === true ? undefined : tsconfigPath,
            extensions: [
              '.ts',
              '.tsx',
              '.d.ts',
              '.js',
              '.jsx',
              '.json',
              '.node',
              ...extraFileExtensions,
            ],
          }),
        ],
      },
    },
    {
      name: name.rules,
      files,
      rules: {
        // eslint-plugin-import-x
        // https://github.com/un-ts/eslint-plugin-import-x
        // TypeScript compilation already ensures that named imports exist in the referenced module
        ...pluginImportX.configs.typescript.rules,

        // Contains all of `recommended`, `recommended-type-checked`, and `strict`, along with additional strict rules that require type information.
        // https://typescript-eslint.io/users/configs#strict-type-checked
        ...typescriptStrictTypeCheckedRules,

        // Contains all of `stylistic`, along with additional stylistic rules that require type information.
        // https://typescript-eslint.io/users/configs#stylistic-type-checked
        ...typescriptStylisticTypeCheckedRules,

        // Disallow `@ts-<directive>` comments or require descriptions after directives
        // https://typescript-eslint.io/rules/ban-ts-comment
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            minimumDescriptionLength: 10,
            'ts-check': false,
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': true,
            'ts-nocheck': true,
          },
        ],

        // enforce naming conventions for everything across a codebase
        // https://typescript-eslint.io/rules/naming-convention
        '@typescript-eslint/naming-convention': [
          'warn',
          // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables (23.10)
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allowSingleOrDouble',
            trailingUnderscore: 'forbid',
          },
          // Allow camelCase functions (23.2), and PascalCase functions (23.8)
          {
            selector: 'function',
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allowSingleOrDouble',
            trailingUnderscore: 'forbid',
          },
          // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations,
          // we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
          {
            selector: 'typeLike',
            format: ['PascalCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
        ],

        // Allow number literals to be used in template expressions
        '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],

        // eslint-plugin-antfu
        // https://github.com/antfu/eslint-plugin-antfu
        'antfu/no-ts-export-equal': 'error',
      },
    },
    {
      name: `${name.base}/react-type-checked`,
      files,
      plugins: {
        '@eslint-react': plugins['pluginReact'],
        '@eslint-react/dom': plugins['pluginReactDom'],
      },
      rules: reactTypeCheck
        ? {
          // Disables checking an asynchronous function passed as a JSX attribute expected to be a function that returns `void`
          '@typescript-eslint/no-misused-promises': ['error', {
            checksVoidReturn: { attributes: false },
          }],

          // @eslint-react/eslint-plugin
          // https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin
          // pluginReact.configs.['recommended-typescript'].rules
          '@eslint-react/dom/no-unknown-property': 'off',
          '@eslint-react/jsx-no-duplicate-props': 'off',
          '@eslint-react/jsx-uses-vars': 'off',

          // pluginReact.configs.['recommended-type-checked'].rules
          // https://eslint-react.xyz/docs/rules/no-leaked-conditional-rendering
          '@eslint-react/no-leaked-conditional-rendering': 'error',
          '@eslint-react/prefer-read-only-props': 'warn',
        }
        : {},
    },
    {
      files: ['**/*.cts'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ]
}