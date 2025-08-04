/* eslint @typescript-eslint/no-empty-object-type: ['error', { allowInterfaces: 'with-single-extends' }] -- This is a type definition */

import type { RuleOptions } from './rule-options.js'

// @ts-expect-error -- This is a type definition
declare module 'eslint-define-config' {
  export interface CustomRuleOptions extends RuleOptions {}
}

// eslint-disable-next-line unicorn/require-module-specifiers -- This is a type definition
export {}
