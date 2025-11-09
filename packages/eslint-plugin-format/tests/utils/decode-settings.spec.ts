import { describe, expect, it } from 'vitest'

import decodeSettings from '../../src/utils/decode-settings'

describe('decodeSettings', () => {
  it('should be an empty object when the data is an empty object', () => {
    const data = {}
    const result = decodeSettings(data)
    expect(result).toEqual({ cacheConfigs: true, editorConfig: false })
  })

  it('should be an empty object when the data is undefined', () => {
    const data = undefined
    const result = decodeSettings(data)
    expect(result).toEqual({ cacheConfigs: true, editorConfig: false })
  })

  it('should throw an error when data is null', () => {
    const data = null
    expect(() => decodeSettings(data)).toThrow(
      'Invalid type: Expected Object but received null',
    )
  })

  it('should be an empty object when data does not contain the format', () => {
    const data = { foo: 'bar' }
    const result = decodeSettings(data)
    expect(result).toEqual({ cacheConfigs: true, editorConfig: false })
  })

  it('should be an empty object when data.format is an empty object', () => {
    const data = { format: {} }
    const result = decodeSettings(data)
    const expected = { cacheConfigs: true, editorConfig: false }
    expect(result).toEqual(expected)
  })

  it('should be an empty object when data.format is undefined', () => {
    const data = { format: undefined }
    const result = decodeSettings(data)
    expect(result).toEqual({ cacheConfigs: true, editorConfig: false })
  })

  it('should throw an error when data.format is null', () => {
    const data = { format: null }
    expect(() => decodeSettings(data)).toThrow(
      'Invalid type: Expected Object but received null',
    )
  })

  it('should match the result when data.format is a valid object', () => {
    const data = { format: { prettierConfigPath: '.prettierrc' } }
    const result = decodeSettings(data)
    const expected = {
      cacheConfigs: true,
      editorConfig: false,
      prettierConfigPath: '.prettierrc',
    }
    expect(result).toEqual(expected)
  })

  it('should throw an error when data.format is an invalid object', () => {
    const data = { format: { prettierConfigPath: 0 } }
    expect(() => decodeSettings(data)).toThrow(
      'Invalid type: Expected string but received 0',
    )
  })
})
