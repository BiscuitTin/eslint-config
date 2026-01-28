import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'

import type { TypedFlatConfigItem } from '../types.js'

import { GLOB_ALL_SRC, GLOB_SRC } from '../globs.js'
import { getFlatConfigName, memo } from '../utils/index.js'

const pluginUnicorn = memo(eslintPluginUnicorn, 'eslint-plugin-unicorn')

const name = getFlatConfigName('unicorn')
const files: string[] = [GLOB_SRC]
const allFiles: string[] = [...GLOB_ALL_SRC]

export function unicorn(): TypedFlatConfigItem[] {
  return [
    {
      name: `${name.setup}/all-src`,
      files: allFiles,
      plugins: {
        unicorn: pluginUnicorn,
      },
    },
    {
      name: `${name.setup}/src`,
      files,
      languageOptions: {
        globals: {
          ...globals.builtin,
        },
      },
    },
    {
      name: `${name.rules}/all-src`,
      files: allFiles,
      rules: {
        // Let all files use kebab-case for filenames.
        // kebab-case forces filenames to be lowercase and hyphen-separated,
        // some file systems are case-insensitive, so this rule can help prevent
        // issues with importing files on case-sensitive file systems.
        'unicorn/filename-case': ['error', {
          cases: { kebabCase: true },
          // Ignore case for specific files
          ignore: ['README.md', 'LICENSE.md', 'CHANGELOG.md', 'CODE_OF_CONDUCT.md'],
        }],
      },
    },
    {
      name: `${name.rules}/agent-skills`,
      files: ['AGENTS.md', 'SKILL.md', '.*/skills/**'],
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
    {
      name: `${name.rules}/src`,
      files,
      rules: {
        // eslint-plugin-unicorn
        // https://github.com/sindresorhus/eslint-plugin-unicorn
        ...pluginUnicorn.configs.recommended.rules,
      },
    },
  ]
}
