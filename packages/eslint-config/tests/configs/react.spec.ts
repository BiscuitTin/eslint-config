import { expect, it } from 'vitest'

import { react } from '../../src/configs/react.js'
import { GLOB_SRC, GLOB_TS, GLOB_TSX } from '../../src/globs.js'

it('enables no-implicit-key only for type-checked files', () => {
  const configs = react({ stylistic: false, typeCheck: true })
  const [commonConfig, typeCheckConfig] = configs.filter(
    config => config.rules?.['@eslint-react/no-implicit-key'] !== undefined,
  )

  expect(commonConfig?.files).toEqual([GLOB_SRC])
  expect(commonConfig?.rules?.['@eslint-react/no-implicit-key']).toBe('off')
  expect(typeCheckConfig?.files).toEqual([GLOB_TS, GLOB_TSX])
  expect(typeCheckConfig?.rules?.['@eslint-react/no-implicit-key']).toBe('error')
})
