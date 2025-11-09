import type { FormatRequest } from '@dprint/formatter'
import type { Rule } from 'eslint'

import { reportDifferences } from 'eslint-formatting-reporter'
import path from 'node:path'
import { createSyncFn } from 'synckit'
import { isValiError } from 'valibot'

import type { DprintOptions } from '../rule-options.js'
import type { ESLintSettingsSchema } from '../schemas/index.js'
import type { DprintFormat } from '../types.js'

import decodeSettings from '../utils/decode-settings.js'
import messages from '../utils/messages.js'
import loc from '../utils/source-location.js'
import workersDirectory from '../workers-directory.js'

const format = createSyncFn<DprintFormat>(
  path.join(workersDirectory, 'dprint.mjs'),
)

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'Use dprint to format code',
      category: 'Stylistic',
    },
    type: 'layout',
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          plugin: {
            type: 'string',
          },
          globalConfigs: {
            type: 'object',
          },
        },
        required: ['plugin'],
        additionalProperties: true,
      },
    ],
    messages,
  },
  create(context) {
    return {
      Program() {
        const sourceCode = context.sourceCode.text
        const request: FormatRequest = { filePath: context.filename, fileText: sourceCode }
        const options = context.options[0] as DprintOptions | undefined

        try {
          const formatOptions = decodeSettings(context.settings)
          const formatted = format(request, options, formatOptions)
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

          context.report({
            loc,
            messageId: 'failedToFormat',
            data: { message: (error as Error).message },
          })
        }
      },
    }
  },
}

export default rule
