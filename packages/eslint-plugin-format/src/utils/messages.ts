import type { Rule } from 'eslint'

import { messages } from 'eslint-formatting-reporter'

export default {
  ...messages,
  failedToFormat: 'Failed to format the code, {{message}}',
  invalidSettings: 'Invalid plugin settings, {{message}}',
} satisfies Rule.RuleMetaData['messages']
