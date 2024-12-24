/**
 * Copied from SukkaW/eslint-config-sukka
 * Ref: https://github.com/SukkaW/eslint-config-sukka/blob/3a04c31727e0b5bab98fda1a6440f9932fe42dd8/packages/shared/src/get-package-json.ts#L1
 */

import type { PackageJson } from '@package-json/types'

import fs from 'node:fs'
import path from 'node:path'

const SKIP_TIME = 20_000

/**
 * The class of cache.
 * The cache will dispose of each value if the value has not been accessed
 * during 20 seconds.
 */
class Cache<T> {
  /**
   * Initialize this cache instance.
   */
  map = new Map<string, { expire: number; value: T }>()

  /**
   * Get the cached value of the given key.
   */
  get(key: string): T | null {
    const entry = this.map.get(key)
    const now = Date.now()

    if (!entry) return null

    if (entry.expire > now) {
      entry.expire = now + SKIP_TIME
      return entry.value
    }

    this.map.delete(key)
    return null
  }

  /**
   * Set the value of the given key.
   */
  set(key: string, value: T): void {
    const entry = this.map.get(key)
    const expire = Date.now() + SKIP_TIME

    if (!entry) {
      this.map.set(key, { value, expire })
      return
    }

    entry.value = value
    entry.expire = expire
  }
}

const cache = new Cache<PackageJson | null>()

/**
 * Reads the `package.json` data in a given path.
 *
 * Don't cache the data.
 *
 * @param directory - The path to a directory to read.
 * @returns The read `package.json` data, or null.
 */
function readPackageJson(directory: string): PackageJson | null {
  const filePath = path.join(directory, 'package.json')
  try {
    const text = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(text) as PackageJson | null | undefined

    if (data && typeof data === 'object') {
      data['filePath'] = filePath
      return data
    }
  } catch {
    // do nothing.
  }

  return null
}

/**
 * Gets a `package.json` data.
 * The data is cached if found, then it's used after.
 *
 * @param startPath - A file path to lookup.
 * @returns A found `package.json` data or `null`.
 *      This object have additional property `filePath`.
 */
export function getPackageJson(startPath = 'a.js'): PackageJson | null {
  const startDirectory = path.dirname(path.resolve(startPath))
  let directory: string = startDirectory
  let previousDirectory = ''
  let data: PackageJson | null = null

  do {
    data = cache.get(directory)
    if (data) {
      if (directory !== startDirectory) {
        cache.set(startDirectory, data)
      }
      return data
    }

    data = readPackageJson(directory)
    if (data) {
      cache.set(directory, data)
      cache.set(startDirectory, data)
      return data
    }

    // Go to next.
    previousDirectory = directory
    directory = path.resolve(directory, '..')
  } while (directory !== previousDirectory)

  cache.set(startDirectory, null)
  return null
}
