import type { ESLint, Linter } from 'eslint'

import { parseForESLint } from 'eslint-parser-plain'
import { getPackageInfoSync } from 'local-pkg'

import packagePlugin from '../package.json'
import dprint from './rules/dprint.js'
import prettier from './rules/prettier.js'

interface PluginWithParser extends ESLint.Plugin {
  parserPlain: Linter.Parser
}

const packageParserPlain = getPackageInfoSync('eslint-parser-plain')

const parserPlain: Linter.Parser = {
  meta: {
    name: packageParserPlain?.name,
    version: packageParserPlain?.version,
  },
  parseForESLint,
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
