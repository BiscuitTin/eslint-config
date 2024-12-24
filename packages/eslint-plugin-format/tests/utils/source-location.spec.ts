import { describe, expect, it } from 'vitest'

import sourceLocation from '../../src/utils/source-location'

describe('sourceLocation', () => {
  it('should have correct start and end positions', () => {
    expect(sourceLocation.start).toEqual({ line: 1, column: 0 })
    expect(sourceLocation.end).toEqual({ line: 1, column: 0 })
  })
})
