import type { ConfigNames, RuleOptions } from '#typegen'
import type { Linter } from 'eslint'

/**
 * Copied from antfu/eslint-config
 * Ref: https://github.com/antfu/eslint-config/blob/5d0c2a5ef25a7bc3a2d6d55c1ce157cc47b0bf55/src/types.ts#L9
 */
export type Awaitable<T> = T | Promise<T>

/**
 * Copied from antfu/eslint-config
 * Ref: https://github.com/antfu/eslint-config/blob/5d0c2a5ef25a7bc3a2d6d55c1ce157cc47b0bf55/src/types.ts#L11C1-L11C32
 */
export type Rules = RuleOptions

/**
 * Copied from antfu/eslint-config
 * Ref: https://github.com/antfu/eslint-config/blob/5d0c2a5ef25a7bc3a2d6d55c1ce157cc47b0bf55/src/types.ts#L13C1-L13C28
 */
// eslint-disable-next-line unicorn/prefer-export-from -- A declaration file cannot be imported without 'import type'.
export type { ConfigNames }

/**
 * Copied from antfu/eslint-config
 * Ref: https://github.com/antfu/eslint-config/blob/5d0c2a5ef25a7bc3a2d6d55c1ce157cc47b0bf55/src/types.ts#L15
 */
export type TypedFlatConfigItem = Omit<Linter.Config<Linter.RulesRecord & Rules>, 'plugins'> & {
  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Relax plugins type limitation
  plugins?: Record<string, any>
}
