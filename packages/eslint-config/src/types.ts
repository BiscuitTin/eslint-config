/* eslint-disable @typescript-eslint/no-explicit-any -- Relax plugins type limitation */

import type { ConfigNames, RuleOptions } from '#typegen'
import type { Linter } from 'eslint'

/**
 * Copied from antfu/eslint-config
 * Ref: https://github.com/antfu/eslint-config/blob/5d0c2a5ef25a7bc3a2d6d55c1ce157cc47b0bf55/src/types.ts#L9
 */
export type Awaitable<T> = T | Promise<T>

/**
 * Copied from antfu/eslint-config
 * Ref: https://github.com/antfu/eslint-config/blob/367445630f0aad2192fe81501d43149d48f5b119/src/types.ts#L11
 */
export type Rules = Record<string, Linter.RuleEntry<any> | undefined> & RuleOptions

/**
 * Copied from antfu/eslint-config
 * Ref: https://github.com/antfu/eslint-config/blob/367445630f0aad2192fe81501d43149d48f5b119/src/types.ts#L13
 */
// eslint-disable-next-line unicorn/prefer-export-from -- A declaration file cannot be imported without 'import type'.
export type { ConfigNames }

/**
 * Copied from antfu/eslint-config
 * Ref: https://github.com/antfu/eslint-config/blob/367445630f0aad2192fe81501d43149d48f5b119/src/types.ts#L15-L34
 */
/**
 * An updated version of ESLint's `Linter.Config`, which provides autocompletion
 * for `rules` and relaxes type limitations for `plugins` and `rules`, because
 * many plugins still lack proper type definitions.
 */
export type TypedFlatConfigItem = Omit<Linter.Config, 'plugins' | 'rules'> & {
  /**
   * An object containing a name-value mapping of plugin names to plugin objects.
   * When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>

  /**
   * An object containing the configured rules. When `files` or `ignores` are
   * specified, these rule configurations are only available to the matching files.
   */
  rules?: Rules
}
