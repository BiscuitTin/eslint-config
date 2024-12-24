import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import workersDirectory from '../src/workers-directory'

describe('workers-directory', () => {
  it('should return the correct path', () => {
    const expectedPath = fileURLToPath(new URL('workers', import.meta.url))
    expect(workersDirectory).toBe(expectedPath.replaceAll('tests', 'src'))
  })
})
