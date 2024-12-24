declare global {
  // eslint-disable-next-line no-var, @typescript-eslint/naming-convention -- Ignore this rule
  var __ESLINT_PLUGIN_MEMO__: Record<string, unknown> | undefined
}

/**
 * Every package manager has this flaw: Even if a pinned, same version of transitive dependency
 * is depended on by multiple packages, all npm/pnpm/yarn/bun will not dedupe it, some package
 * manager even doesn't have dedupe feature (yes, bun. You are literally wasting my disk space
 * for speed).
 *
 * But if there are multiple copy of the same version of transitive dependency, they will not have
 * the same referential identity, which causes ESLint to panic and throw error.
 *
 * So we have to memoize the plugins and configs to make sure they are the same referential identity.
 *
 * Copied from SukkaW/eslint-config-sukka
 * Ref: https://github.com/SukkaW/eslint-config-sukka/blob/bbca2d568d738a1d287c473804ea8ccbf00d3c86/packages/shared/src/memoize-eslint-plugin.ts#L17
 */
export function memo<T>(function_: NonNullable<T>, key?: string): T {
  let _key = key
  if (_key === undefined || !_key) {
    if (typeof function_.toString !== 'function') throw new TypeError('memo() requires a key!')
    _key = function_.toString()
  }

  globalThis.__ESLINT_PLUGIN_MEMO__ ??= {}
  globalThis.__ESLINT_PLUGIN_MEMO__[_key] ||= function_
  return globalThis.__ESLINT_PLUGIN_MEMO__[_key] as T
}
