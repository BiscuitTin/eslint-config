import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_SRC, GLOB_SRC_EXT } from '../globs.js'
import { getFlatConfigName } from '../utils/index.js'

const name = getFlatConfigName('disables')

export function disables(): TypedFlatConfigItem[] {
  return [
    {
      name: name.script,
      files: [`**/scripts/${GLOB_SRC}`],
      rules: {
        'antfu/no-top-level-await': 'off',
        'no-console': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    {
      name: `${name.base}/cli`,
      files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
      rules: {
        'antfu/no-top-level-await': 'off',
        'no-console': 'off',
      },
    },
    {
      name: `${name.base}/bin`,
      files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
      rules: {
        'antfu/no-import-dist': 'off',
        'antfu/no-import-node-modules-by-path': 'off',
      },
    },
    {
      name: `${name.base}/dts`,
      files: ['**/*.d.?([cm])ts'],
      rules: {
        '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
        '@eslint-community/eslint-comments/no-unlimited-disable': 'off',
        'import-x/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
    {
      name: name.commonjs,
      files: ['**/*.js', '**/*.cjs'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
    {
      name: `${name.base}/config-files`,
      files: [`**/*.config.${GLOB_SRC_EXT}`, `**/*.config.*.${GLOB_SRC_EXT}`],
      rules: {
        'antfu/no-top-level-await': 'off',
        'no-console': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ]
}
