import { boolean, type InferOutput, object, optional, string } from 'valibot'

/**
 * @internal
 */
export const ESLintPluginFormatSettingsSchema = object({
  /**
   * The path to the Prettier configuration file.
   * @description If not provided, Prettier will use its default configuration.
   * You can also override the default configuration by providing custom options.
   * @see https://prettier.io/docs/en/configuration
   * @default undefined
   * @example '.prettierrc'
   */
  prettierConfigPath: optional(string()),
  /**
   * The path to the dprint configuration file.
   * @description If not provided, dprint will use its default configuration.
   * You can also override the default configuration by providing custom options.
   * @see https://dprint.dev/config
   * @default undefined
   * @example 'dprint.json'
   */
  dprintConfigPath: optional(string()),
  /**
   * Whether to cache the configuration data.
   * @default true
   */
  cacheConfigs: optional(boolean(), true),
  /**
   * If set to `true` and an `.editorconfig` file is in your project, the plugin will
   * parse it and convert its properties to the corresponding Prettier/Dprint options.
   * This configuration will be overridden by Prettier/Dprint configuration or custom options.
   * @default false
   */
  editorConfig: optional(boolean(), false),
})

/**
 * @internal
 */
export const ESLintSettingsSchema = optional(
  object({
    /**
     * The settings for the `eslint-plugin-format` plugin.
     */
    format: optional(ESLintPluginFormatSettingsSchema),
  }),
  {},
)

export type FormatSettings = InferOutput<typeof ESLintPluginFormatSettingsSchema>

export type ESLintSettings = InferOutput<typeof ESLintSettingsSchema>
