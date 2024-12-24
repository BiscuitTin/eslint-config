import { findUp } from 'find-up'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import process from 'node:process'

export async function loadLocalFile<T = unknown>(
  name: string | readonly string[],
  cwd = process.cwd(),
): Promise<T | null> {
  const path = await findUp(name, { cwd })
  if (!path || !fs.existsSync(path)) return null
  return JSON.parse(await fsp.readFile(path, 'utf8')) as T
}
