export function getFlatConfigName<T extends string>(module: T) {
  return {
    base: `@biscuittin/eslint-config/${module}`,
    setup: `@biscuittin/eslint-config/${module}/setup`,
    rules: `@biscuittin/eslint-config/${module}/rules`,
    stylistic: `@biscuittin/eslint-config/${module}/stylistic`,
    commonjs: `@biscuittin/eslint-config/${module}/commonjs`,
    module: `@biscuittin/eslint-config/${module}/module`,
    script: `@biscuittin/eslint-config/${module}/script`,
  } as const
}
