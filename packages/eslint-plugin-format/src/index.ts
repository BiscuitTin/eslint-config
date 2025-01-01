import type { ESLint, Linter } from 'eslint'

import parserPlain from '@bttin/eslint-parser-plain'

import packagePlugin from '../package.json'
import dprint from './rules/dprint.js'
import prettier from './rules/prettier.js'

interface PluginWithParser extends ESLint.Plugin {
  parserPlain: Linter.Parser
}

export default {
  parserPlain,
  meta: {
    name: packagePlugin.name,
    version: packagePlugin.version,
  },
  rules: {
    dprint,
    prettier,
  },
} satisfies PluginWithParser
