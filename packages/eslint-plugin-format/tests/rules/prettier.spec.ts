import pluginFormat from '@bttin/eslint-plugin-format'
import { fileURLToPath } from 'node:url'

import { ruleTester } from '../../../../tools/eslint-rule-tester.js'

const prettierConfigPath = fileURLToPath(new URL('.prettierrc', import.meta.url))

ruleTester.run('format/prettier', pluginFormat.rules.prettier, {
  valid: [
    {
      name: 'valid format with default options',
      code: 'const x = { y: 1 };\n',
      options: [{ parser: 'babel' }],
    },
    {
      name: 'valid format with option semi: false',
      code: 'const x = { y: 1 }\n',
      options: [{ parser: 'babel', semi: false }],
    },
    {
      name: 'valid format with custom config file',
      code: 'const x = { y: 1 }\n',
      options: [{ parser: 'babel' }],
      settings: { format: { prettierConfigPath } },
    },
    {
      name: 'valid format with options and custom config file',
      code: `const x = { y: 1, foo: 'bar' }\n`,
      options: [{ parser: 'babel', singleQuote: true }],
      settings: { format: { prettierConfigPath } },
    },
  ],
  invalid: [
    {
      name: 'invalid format with default options',
      code: 'const x = {y:1};',
      options: [{ parser: 'babel' }],
      output: 'const x = { y: 1 };\n',
      errors: [
        {
          message: 'Replace `y:1};` with `·y:·1·};⏎`',
          line: 1,
          column: 12,
          endLine: 1,
          endColumn: 17,
        },
      ],
    },
    {
      name: 'invalid format with option semi: false',
      code: 'const x = {y:1};',
      options: [{ parser: 'babel', semi: false }],
      output: 'const x = { y: 1 }\n',
      errors: [
        {
          message: 'Replace `y:1};` with `·y:·1·}⏎`',
          line: 1,
          column: 12,
          endLine: 1,
          endColumn: 17,
        },
      ],
    },
    {
      name: 'invalid format with custom config file',
      code: 'const x = {y:1};',
      options: [{ parser: 'babel' }],
      settings: { format: { prettierConfigPath } },
      output: 'const x = { y: 1 }\n',
      errors: [
        {
          message: 'Replace `y:1};` with `·y:·1·}⏎`',
          line: 1,
          column: 12,
          endLine: 1,
          endColumn: 17,
        },
      ],
    },
    {
      name: 'invalid format with a missing parser',
      code: 'const x = {y:1};',
      errors: [{ messageId: 'failedToFormat' }],
    },
    {
      name: 'invalid format with an invalid configuration file',
      code: 'const x = {y:1};',
      settings: { format: { prettierConfigPath: 1 } },
      errors: [{ messageId: 'invalidSettings' }],
    },
    {
      name: 'invalid format with incorrect code syntax',
      code: '<template><div></template>',
      options: [{ parser: 'vue' }],
      languageOptions: { parser: pluginFormat.parserPlain },
      errors: [{ messageId: 'parsingError' }],
    },
  ],
})
