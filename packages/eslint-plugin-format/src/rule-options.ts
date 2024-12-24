import type { GlobalConfiguration } from '@dprint/formatter'
import type { Options as PrettierOptions } from 'prettier'

export interface DprintOptions extends Record<string, unknown> {
  plugin: string
  globalConfigs?: GlobalConfiguration
}

export interface RuleOptions {
  'format/prettier': [PrettierOptions | undefined]
  'format/dprint': [DprintOptions | undefined]
}

export { type Options as PrettierOptions } from 'prettier'
