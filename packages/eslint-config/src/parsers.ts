import type { Linter } from 'eslint'

import pluginFormat from 'eslint-plugin-format'
import parserJsonc from 'jsonc-eslint-parser'
import { parser as parserTypescript } from 'typescript-eslint'

const parsers: Record<string, Linter.Parser> = {
  parserJsonc: parserJsonc,
  parserPlain: pluginFormat.parserPlain,
  parserTypescript: parserTypescript as Linter.Parser,
}

export default parsers
