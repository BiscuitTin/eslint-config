// @ts-check

/** @import { PrettierOptions } from '../rule-options.js' */
/** @import { PrettierFormat } from '../types.js' */

import { runAsWorker } from 'synckit'

/** @type {import('prettier')} */
let prettier

runAsWorker(
  /** @type {PrettierFormat} */
  (async function prettierWorker(code, options = {}, formatOptions = {}) {
    if (typeof prettier !== 'object') {
      prettier = await import('prettier')
    }

    /** @type {PrettierOptions | undefined} */
    let resolvedOptions

    const { configPath, ...resolveConfigOptions } = formatOptions

    if (configPath) {
      const options = await prettier.resolveConfig(configPath, resolveConfigOptions)
      if (options === null) {
        throw new Error(`Prettier config file not found: ${configPath}`)
      }

      resolvedOptions = options
    }

    const _options = { ...resolvedOptions, ...options }

    return await prettier.format(code, _options)
  }),
)
