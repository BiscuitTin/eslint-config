/* eslint-disable import-x/no-relative-packages -- Disable this rule */

import config from './packages/eslint-config/src/index.js'

export default config(
  {
    javascript: {
      env: {
        browser: false,
      },
    },
    typescript: {
      allowDefaultProject: [
        'commitlint.config.mjs',
        'lint-staged.config.js',
        'packages/eslint-plugin-format/src/workers/*.js',
      ],
    },
    node: {
      extraFiles: ['packages/eslint-config/src/**/*.ts'],
    },
  },
  {
    files: ['.vscode/*.json'],
    rules: {
      'jsonc/no-comments': 'off',
    },
  },
  {
    files: ['packages/eslint-config/src/**/*.ts'],
    rules: {
      'unicorn/prefer-module': 'off',
      'unicorn/prevent-abbreviations': ['error', {
        allowList: { env: true, Env: true, tsconfigRootDir: true },
      }],
    },
  },
  {
    files: [
      'packages/eslint-config/src/utils/get-package-json.ts',
      'packages/eslint-config/src/utils/load-local-file.ts',
      'packages/eslint-parser-plain/src/index.ts',
    ],
    rules: {
      'unicorn/no-null': 'off',
    },
  },
  {
    files: ['packages/*/tests/**/*.spec.ts'],
    rules: {
      'unicorn/no-null': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      'import/no-relative-packages': 'off',
    },
  },
)
