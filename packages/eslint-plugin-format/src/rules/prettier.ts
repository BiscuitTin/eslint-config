import type { AST, Rule } from 'eslint'

import { reportDifferences } from 'eslint-formatting-reporter'
import path from 'node:path'
import { createSyncFn } from 'synckit'
import { isValiError } from 'valibot'

import type { PrettierOptions } from '../rule-options.js'
import type { PrettierFormat, PrettierFormatOptions } from '../types.js'

import { ESLintSettingsSchema } from '../schemas/index.js'
import decodeSettings from '../utils/decode-settings.js'
import messages from '../utils/messages.js'
import loc from '../utils/source-location.js'
import workersDirectory from '../workers-directory.js'

interface ParserError extends SyntaxError {
  codeFrame: string
  loc: AST.SourceLocation
}

const format = createSyncFn<PrettierFormat, string>(
  path.join(workersDirectory, 'prettier.js'),
)

export default {
  meta: {
    docs: {
      description: 'Use Prettier to format code',
      category: 'Stylistic',
    },
    type: 'layout',
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          parser: {
            type: 'string',
            // ESLint say's the supported version of JSON Schemas is Draft-04,
            // the `required` keyword placed here is not supported in Draft-04.
            // required: true,
          },
        },
        required: ['parser'],
        additionalProperties: true,
      },
    ],
    messages: {
      ...messages,
      parsingError: 'Parsing error: {{message}}',
    },
  },
  create(context) {
    return {
      Program() {
        const sourceCode = context.sourceCode.text
        const options = {
          filepath: context.filename,
          ...(context.options[0] as PrettierOptions | undefined),
        }

        try {
          const { prettierConfigPath, cacheConfigs, editorConfig } = decodeSettings(
            context.settings,
          )
          const formatOptions: PrettierFormatOptions = {
            configPath: prettierConfigPath,
            useCache: cacheConfigs,
            editorconfig: editorConfig,
          }

          const formatted = format(sourceCode, options, formatOptions)
          reportDifferences(context, sourceCode, formatted)
        } catch (error) {
          // Report `context.settings` decoding errors.
          if (isValiError<typeof ESLintSettingsSchema>(error)) {
            context.report({
              loc,
              messageId: 'invalidSettings',
              data: { message: error.issues[0].message },
            })
            return
          }

          if (error instanceof SyntaxError) {
            let message = error.message
            const _error = error as ParserError
            message = message.replace(`\n${_error.codeFrame}`, '')
            message = message.replace(/ \(\d+:\d+\)$/, '')
            context.report({
              loc: _error.loc,
              messageId: 'parsingError',
              data: { message },
            })
            return
          }

          context.report({
            loc,
            messageId: 'failedToFormat',
            data: { message: (error as Error).message },
          })
        }
      },
    }
  },
} satisfies Rule.RuleModule
