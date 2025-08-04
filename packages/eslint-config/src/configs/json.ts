import eslintPluginJson from '@eslint/json'
import eslintPluginJsonc from 'eslint-plugin-jsonc'

import type { OptionsJson } from '../options.js'
import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs.js'
import parsers from '../parsers.js'
import { getFlatConfigName, memo } from '../utils/index.js'

const pluginJson = memo(eslintPluginJson, 'eslint-plugin-json')
const pluginJsonc = memo(eslintPluginJsonc, 'eslint-plugin-jsonc')

const name = getFlatConfigName('json')

export function json(options: OptionsJson = {}): TypedFlatConfigItem[] {
  const { extraFiles = [], stylistic = { indentWidth: 2 } } = options

  const { indentWidth = 2 } = typeof stylistic === 'object'
    ? stylistic
    : ({ indentWidth: 2 } as const)

  const files: string[] = [GLOB_JSON, GLOB_JSON5, GLOB_JSONC, ...extraFiles]

  return [
    {
      name: name.setup,
      files,
      plugins: {
        json: pluginJson,
        jsonc: pluginJsonc,
      },
      languageOptions: {
        parser: parsers['parserJsonc'],
      },
    },
    {
      name: name.rules,
      files,
      rules: {
        // @eslint/json
        // https://github.com/eslint/json
        ...pluginJson.configs.recommended.rules,
      },
    },
    {
      name: name.stylistic,
      files,
      rules: stylistic
        ? {
          // @eslint/json
          // https://github.com/eslint/json
          'json/sort-keys': ['error', 'asc', { natural: true }],

          // eslint-plugin-jsonc
          // https://github.com/ota-meshi/eslint-plugin-jsonc
          // Copied from antfu/eslint-config
          // Ref: https://github.com/antfu/eslint-config/blob/5d0c2a5ef25a7bc3a2d6d55c1ce157cc47b0bf55/src/configs/jsonc.ts#L70
          'jsonc/array-bracket-spacing': ['error', 'never'],
          'jsonc/comma-dangle': ['error', 'never'],
          'jsonc/comma-style': ['error', 'last'],
          'jsonc/indent': ['error', indentWidth],
          'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],
          'jsonc/object-curly-newline': ['error', { consistent: true, multiline: true }],
          'jsonc/object-curly-spacing': ['error', 'always'],
          'jsonc/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
          'jsonc/quote-props': 'error',
          'jsonc/quotes': 'error',
        }
        : {},
    },
    {
      name: `${name.base}/package-json`,
      files: ['**/package.json'],
      // Copied from antfu/eslint-config
      // Ref: https://github.com/antfu/eslint-config/blob/5d0c2a5ef25a7bc3a2d6d55c1ce157cc47b0bf55/src/configs/sort.ts#L13
      rules: {
        'json/sort-keys': 'off',
        'jsonc/sort-array-values': [
          'error',
          {
            order: { type: 'asc' },
            pathPattern: '^files$',
          },
        ],
        'jsonc/sort-keys': [
          'error',
          {
            order: [
              'publisher',
              'name',
              'displayName',
              'type',
              'version',
              'private',
              'packageManager',
              'description',
              'author',
              'contributors',
              'license',
              'funding',
              'homepage',
              'repository',
              'bugs',
              'keywords',
              'categories',
              'sideEffects',
              'exports',
              'main',
              'module',
              'unpkg',
              'jsdelivr',
              'types',
              'typesVersions',
              'bin',
              'icon',
              'files',
              'engines',
              'activationEvents',
              'contributes',
              'publishConfig',
              'scripts',
              'peerDependencies',
              'peerDependenciesMeta',
              'dependencies',
              'optionalDependencies',
              'devDependencies',
              'pnpm',
              'overrides',
              'resolutions',
              'husky',
              'simple-git-hooks',
              'lint-staged',
              'eslintConfig',
            ],
            pathPattern: '^$',
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$',
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$',
          },
          {
            order: ['types', 'import', 'require', 'default'],
            pathPattern: '^exports.*$',
          },
          {
            order: [
              // client hooks only
              'pre-commit',
              'prepare-commit-msg',
              'commit-msg',
              'post-commit',
              'pre-rebase',
              'post-rewrite',
              'post-checkout',
              'post-merge',
              'pre-push',
              'pre-auto-gc',
            ],
            pathPattern: '^(?:gitHooks|husky|simple-git-hooks)$',
          },
        ],
      },
    },
    {
      name: `${name.base}/tsconfig-json`,
      files: ['**/tsconfig.json', '**/tsconfig.*.json'],
      // Copied from antfu/eslint-config
      // Ref: https://github.com/antfu/eslint-config/blob/5d0c2a5ef25a7bc3a2d6d55c1ce157cc47b0bf55/src/configs/sort.ts#L121
      rules: {
        'json/sort-keys': 'off',
        'jsonc/sort-keys': [
          'error',
          {
            order: ['extends', 'compilerOptions', 'references', 'files', 'include', 'exclude'],
            pathPattern: '^$',
          },
          {
            order: [
              /* Projects */
              'incremental',
              'composite',
              'tsBuildInfoFile',
              'disableSourceOfProjectReferenceRedirect',
              'disableSolutionSearching',
              'disableReferencedProjectLoad',
              /* Language and Environment */
              'target',
              'jsx',
              'jsxFactory',
              'jsxFragmentFactory',
              'jsxImportSource',
              'lib',
              'moduleDetection',
              'noLib',
              'reactNamespace',
              'useDefineForClassFields',
              'emitDecoratorMetadata',
              'experimentalDecorators',
              /* Modules */
              'baseUrl',
              'rootDir',
              'rootDirs',
              'customConditions',
              'module',
              'moduleResolution',
              'moduleSuffixes',
              'noResolve',
              'paths',
              'resolveJsonModule',
              'resolvePackageJsonExports',
              'resolvePackageJsonImports',
              'typeRoots',
              'types',
              'allowArbitraryExtensions',
              'allowImportingTsExtensions',
              'allowUmdGlobalAccess',
              /* JavaScript Support */
              'allowJs',
              'checkJs',
              'maxNodeModuleJsDepth',
              /* Type Checking */
              'strict',
              'strictBindCallApply',
              'strictFunctionTypes',
              'strictNullChecks',
              'strictPropertyInitialization',
              'allowUnreachableCode',
              'allowUnusedLabels',
              'alwaysStrict',
              'exactOptionalPropertyTypes',
              'noFallthroughCasesInSwitch',
              'noImplicitAny',
              'noImplicitOverride',
              'noImplicitReturns',
              'noImplicitThis',
              'noPropertyAccessFromIndexSignature',
              'noUncheckedIndexedAccess',
              'noUnusedLocals',
              'noUnusedParameters',
              'useUnknownInCatchVariables',
              /* Emit */
              'declaration',
              'declarationDir',
              'declarationMap',
              'downlevelIteration',
              'emitBOM',
              'emitDeclarationOnly',
              'importHelpers',
              'importsNotUsedAsValues',
              'inlineSourceMap',
              'inlineSources',
              'mapRoot',
              'newLine',
              'noEmit',
              'noEmitHelpers',
              'noEmitOnError',
              'outDir',
              'outFile',
              'preserveConstEnums',
              'preserveValueImports',
              'removeComments',
              'sourceMap',
              'sourceRoot',
              'stripInternal',
              /* Interop Constraints */
              'allowSyntheticDefaultImports',
              'esModuleInterop',
              'forceConsistentCasingInFileNames',
              'isolatedDeclarations',
              'isolatedModules',
              'preserveSymlinks',
              'verbatimModuleSyntax',
              /* Completeness */
              'skipDefaultLibCheck',
              'skipLibCheck',
            ],
            pathPattern: '^compilerOptions$',
          },
        ],
      },
    },
  ]
}
