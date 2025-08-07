/* eslint-disable import-x/no-relative-packages -- Disable some rules */
/* eslint-disable @typescript-eslint/no-deprecated -- Disable some rules */

/**
 * This script generates the type definitions for the rules of all the configs.
 * Copied from antfu/eslint-config
 * Ref: https://github.com/antfu/eslint-config/blob/a6efa0957a6189001b85d1a1d68a90511dae2022/scripts/typegen.ts
 */

import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import fs from 'node:fs/promises'

import {
  combine,
  comments,
  disables,
  formatters,
  ignores,
  imports,
  javascript,
  json,
  jsx,
  nextJs,
  nodeJs,
  react,
  regexp,
  tailwindcss,
  typescript,
  unicorn,
} from '../packages/eslint-config/src/index.js'

const configs = await combine(
  {
    plugins: {
      '': {
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  comments(),
  disables(),
  formatters(),
  ignores(),
  imports(),
  javascript(),
  json(),
  jsx(),
  nextJs(),
  nodeJs(),
  react({ stylistic: true, typeCheck: true, reactCompiler: true }),
  regexp(),
  tailwindcss(),
  typescript(),
  unicorn(),
)

const configNames = configs.map((index) => index.name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, { includeAugmentation: false })

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map((index) => `'${index}'`).join(' | ')}
`

await fs.writeFile('packages/eslint-config/typegen.d.ts', dts)
