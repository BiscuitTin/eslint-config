export function getFlatConfigName<T extends string>(module: T) {
  return {
    base: `@bttin/eslint-config/${module}`,
    setup: `@bttin/eslint-config/${module}/setup`,
    rules: `@bttin/eslint-config/${module}/rules`,
    stylistic: `@bttin/eslint-config/${module}/stylistic`,
    commonjs: `@bttin/eslint-config/${module}/commonjs`,
    module: `@bttin/eslint-config/${module}/module`,
    script: `@bttin/eslint-config/${module}/script`,
  } as const
}
