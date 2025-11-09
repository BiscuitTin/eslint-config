import memoize from 'micro-memoize'
import { parse } from 'valibot'

import { ESLintSettingsSchema, type FormatSettings } from '../schemas/index.js'

/**
 * Decodes the plugin settings from the ESLint `context.settings` object.
 * @internal
 * @param data - The ESLint settings data.
 * @returns The decoded plugin settings.
 */
const decodeSettings = memoize(
  function decodeSettings(data: unknown): FormatSettings {
    return {
      cacheConfigs: true,
      editorConfig: false,
      ...parse(ESLintSettingsSchema, data).format,
    }
  },
  { isEqual: (a, b) => a === b },
)

export default decodeSettings
