import eslintPluginAntfu from 'eslint-plugin-antfu'
import eslintPluginImportX, { configs as importXConfigs } from 'eslint-plugin-import-x'
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import process from 'node:process'

import type { OptionsTypeScript } from '../options.js'
import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_SRC } from '../globs.js'
import { getFlatConfigName, memo } from '../utils/index.js'

const pluginAntfu = memo(eslintPluginAntfu, 'eslint-plugin-antfu')
const pluginImportX = memo(eslintPluginImportX, 'eslint-plugin-import-x')
const pluginPerfectionist = memo(eslintPluginPerfectionist, 'eslint-plugin-perfectionist')
const pluginUnusedImports = memo(eslintPluginUnusedImports, 'eslint-plugin-unused-imports')

const name = getFlatConfigName('imports')
const files: string[] = [GLOB_SRC]

export function imports(options: OptionsTypeScript = {}): TypedFlatConfigItem[] {
  const {
    tsconfigRootDir = process.cwd(),
  } = options

  return [
    {
      name: name.setup,
      files,
      plugins: {
        'import-x': pluginImportX,
        'unused-imports': pluginUnusedImports,
        antfu: pluginAntfu,
        perfectionist: pluginPerfectionist,
      },
    },
    {
      name: name.rules,
      files,
      rules: {
        // eslint-plugin-import-x
        // https://github.com/un-ts/eslint-plugin-import-x
        ...importXConfigs.recommended.rules,

        // Copied from SukkaW/eslint-config-sukka
        // Ref: https://github.com/SukkaW/eslint-config-sukka/blob/bbca2d568d738a1d287c473804ea8ccbf00d3c86/packages/eslint-config-sukka/src/modules/javascript.ts#L122
        'import-x/newline-after-import': ['error', { considerComments: false }],
        'import-x/no-absolute-path': 'error',
        'import-x/no-empty-named-blocks': 'error',
        'import-x/no-mutable-exports': 'error',
        'import-x/no-useless-path-segments': 'warn',
        'import-x/no-webpack-loader-syntax': 'error',
        // prevent monorepo sibling imports
        'import-x/no-relative-packages': 'warn',

        // eslint-plugin-unused-imports
        // https://github.com/sweepline/eslint-plugin-unused-imports
        'unused-imports/no-unused-imports': 'error',

        // eslint-plugin-antfu
        // https://github.com/antfu/eslint-plugin-antfu
        'antfu/import-dedupe': 'error',
        'antfu/no-import-dist': 'error',
        'antfu/no-import-node-modules-by-path': 'error',
      },
    },
    {
      name: name.stylistic,
      files,
      rules: {
        // rules that conflict with eslint-plugin-perfectionist are disabled.
        'sort-imports': 'off',

        // eslint-plugin-perfectionist
        // https://github.com/azat-io/eslint-plugin-perfectionist
        'perfectionist/sort-imports': ['error', {
          groups: [
            'type',
            ['builtin', 'external'],
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
          tsconfigRootDir,
          order: 'asc',
          type: 'natural',
        }],
        'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'natural' }],
      },
    },
  ]
}
