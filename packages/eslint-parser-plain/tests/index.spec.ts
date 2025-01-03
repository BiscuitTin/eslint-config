import { parseForESLint } from '@biscuittin/eslint-parser-plain'
import { describe, expect, it } from 'vitest'

describe('should', () => {
  it('work', () => {
    expect(parseForESLint('{ "a": 1 }')).toMatchInlineSnapshot(`
      {
        "ast": {
          "body": [],
          "comments": [],
          "loc": {
            "end": 10,
            "start": 0,
          },
          "range": [
            0,
            10,
          ],
          "tokens": [],
          "type": "Program",
        },
        "scopeManager": null,
        "services": {
          "isPlain": true,
        },
        "visitorKeys": {
          "Program": [],
        },
      }
    `)
  })
})
