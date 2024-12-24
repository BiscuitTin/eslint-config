import type { FormatRequest } from '@dprint/formatter'
import type { ResolveConfigOptions } from 'prettier'

import type { DprintOptions, PrettierOptions } from './rule-options.js'
import type { FormatSettings } from './schemas/index.js'

export interface PrettierFormatOptions extends Pick<ResolveConfigOptions, 'useCache' | 'editorconfig'> {
  /** Path to Prettier configuration file */
  configPath?: string
}

/**
 * Internal worker for formatting code with Prettier.
 *
 * @param {string} code code to format
 * @param {PrettierOptions | undefined} options Prettier options
 * @param {PrettierFormatOptions | undefined} formatOptions options for formatter internal usage
 * @returns {Promise<string>} formatted code
 */
export type PrettierFormat = (
  code: string,
  options?: PrettierOptions,
  formatOptions?: PrettierFormatOptions,
) => Promise<string>

export interface DprintFormatOptions extends Partial<Pick<FormatSettings, 'cacheConfigs' | 'editorConfig'>> {
  /** Path to dprint configuration file */
  configPath?: string
}

/**
 * Internal worker for formatting code with dprint.
 *
 * @param {FormatRequest} request data to format
 * @param {DprintOptions | undefined} options dprint options
 * @param {DprintFormatOptions | undefined} formatOptions options for formatter internal usage
 * @returns {Promise<string>} formatted code
 */
export type DprintFormat = (
  request: FormatRequest,
  options?: DprintOptions,
  formatOptions?: DprintFormatOptions,
) => Promise<string>
