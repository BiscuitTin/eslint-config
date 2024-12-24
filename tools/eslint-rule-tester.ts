import { RuleTester } from 'eslint'
import { describe, it } from 'vitest'

RuleTester.describe = describe
RuleTester.it = it
RuleTester.itOnly = it.only

export const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 'latest',
    parserOptions: {
      warnOnUnsupportedTypeScriptVersion: false,
    },
  },
})
