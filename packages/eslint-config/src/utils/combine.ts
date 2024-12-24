import type { Awaitable, TypedFlatConfigItem } from '../types.js'

/**
 * Combine array and non-array configs into a single array.
 * Copied from antfu/eslint-config
 * Ref: https://github.com/antfu/eslint-config/blob/e283983d8cb72304424f67090a3e3bdccdf95c0d/src/utils.ts#L32
 */
export async function combine(
  ...configs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]
): Promise<TypedFlatConfigItem[]> {
  const resolved = await Promise.all(configs)
  return resolved.flat()
}
