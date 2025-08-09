import eslintPluginFormat from 'eslint-plugin-format'

import type { InternalOptionsFormat, OptionsFormat } from '../options.js'
import type { TypedFlatConfigItem } from '../types.js'

import {
  GLOB_HTML,
  GLOB_JSON,
  GLOB_JSON5,
  GLOB_JSONC,
  GLOB_MARKDOWN,
  GLOB_POSTCSS,
  GLOB_SRC,
  GLOB_STYLE,
  GLOB_YAML,
} from '../globs.js'
import parsers from '../parsers.js'
import { getFlatConfigName, loadLocalFile, memo } from '../utils/index.js'

type DPrintFormatterConfig = Record<string, string | number | boolean>

interface DPrintFormatterConfigs {
  typescript?: DPrintFormatterConfig
  json?: DPrintFormatterConfig
  markdown?: DPrintFormatterConfig
  malva?: DPrintFormatterConfig
  markup?: DPrintFormatterConfig
  yaml?: DPrintFormatterConfig
  [key: string]: DPrintFormatterConfig | undefined
}

type DPrintConfig = DPrintFormatterConfigs & {
  excludes: string[]
  plugins: string[]
}

type DPrintQuoteStyle = 'preferDouble' | 'preferSingle'

type DPrintTrailingCommas = 'never' | 'always' | 'onlyMultiLine'

const quoteStyleMap: Record<'single' | 'double', DPrintQuoteStyle> = {
  single: 'preferSingle',
  double: 'preferDouble',
}

const trailingCommasMap: Record<'none' | 'all' | 'multiline', DPrintTrailingCommas> = {
  none: 'never',
  all: 'always',
  multiline: 'onlyMultiLine',
}

const pluginFormat = memo(eslintPluginFormat, 'eslint-plugin-format')

const name = getFlatConfigName('formatters')

export async function formatters(
  options: OptionsFormat & InternalOptionsFormat = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    dprintConfigPath = 'dprint.json',
    printWidth = 120,
    indentWidth = 2,
    useTabs = false,
    semi = false,
    quotes = 'single',
    jsxQuotes = 'double',
    trailingComma = 'multiline',
    endOfLine = 'lf',
    extraJsonFiles = [],
  } = options

  const dprintConfig = await loadLocalFile<DPrintConfig>(dprintConfigPath)

  function hasPlugin(name: string): boolean {
    return dprintConfig?.plugins.some((url) => url.includes(name)) ?? false
  }

  function getPluginUrl(name: string): string {
    return dprintConfig?.plugins.find((url) => url.includes(name)) ?? name
  }

  const lineWidth = printWidth
  const newLineKind = endOfLine
  const lineBreak = newLineKind === 'lf' ? 'lf' : 'crlf'

  return [
    {
      name: name.setup,
      plugins: {
        format: pluginFormat,
      },
    },
    {
      name: `${name.rules}/typescript`,
      files: [GLOB_SRC],
      rules: hasPlugin('typescript')
        ? {
          'format/dprint': ['error', {
            language: getPluginUrl('typescript'),
            languageOptions: {
              lineWidth,
              indentWidth,
              useTabs,
              newLineKind,
              semiColons: semi ? 'always' : 'asi',
              quoteStyle: quoteStyleMap[quotes],
              'jsx.quoteStyle': quoteStyleMap[jsxQuotes],
              trailingCommas: trailingCommasMap[trailingComma],
              ...dprintConfig?.typescript,
            },
          }],
        }
        : {},
    },
    {
      name: `${name.rules}/json`,
      files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC, ...extraJsonFiles],
      rules: hasPlugin('json')
        ? {
          // dprint handles the indent
          'jsonc/indent': 'off',

          'format/dprint': ['error', {
            language: getPluginUrl('json'),
            languageOptions: {
              lineWidth,
              indentWidth,
              useTabs,
              newLineKind,
              ...dprintConfig?.json,
            },
          }],
        }
        : {},
    },
    {
      name: `${name.rules}/markdown`,
      files: [GLOB_MARKDOWN],
      languageOptions: {
        parser: parsers['parserPlain'],
      },
      rules: hasPlugin('markdown')
        ? {
          'format/dprint': ['error', {
            language: getPluginUrl('markdown'),
            languageOptions: {
              lineWidth,
              newLineKind,
              ...dprintConfig?.markdown,
            },
          }],
        }
        : {},
    },
    {
      name: `${name.rules}/malva`,
      files: [GLOB_STYLE, GLOB_POSTCSS],
      languageOptions: {
        parser: parsers['parserPlain'],
      },
      rules: hasPlugin('malva')
        ? {
          'format/dprint': ['error', {
            language: getPluginUrl('malva'),
            languageOptions: {
              printWidth,
              useTabs,
              indentWidth,
              lineBreak,
              trailingComma: trailingComma === 'all' ? true : false,
              ...dprintConfig?.malva,
            },
          }],
        }
        : {},
    },
    {
      name: `${name.rules}/markup`,
      files: [GLOB_HTML],
      languageOptions: {
        parser: parsers['parserPlain'],
      },
      rules: hasPlugin('markup')
        ? {
          'format/dprint': ['error', {
            language: getPluginUrl('markup'),
            languageOptions: {
              printWidth,
              useTabs,
              indentWidth,
              lineBreak,
              ...dprintConfig?.markup,
            },
          }],
        }
        : {},
    },
    {
      name: `${name.rules}/yaml`,
      files: [GLOB_YAML],
      languageOptions: {
        parser: parsers['parserPlain'],
      },
      rules: hasPlugin('yaml')
        ? {
          'format/dprint': ['error', {
            language: getPluginUrl('yaml'),
            languageOptions: {
              printWidth,
              indentWidth,
              lineBreak,
              quotes: quoteStyleMap[quotes],
              trailingComma: trailingComma === 'none' ? false : true,
              ...dprintConfig?.yaml,
            },
          }],
        }
        : {},
    },
  ]
}
