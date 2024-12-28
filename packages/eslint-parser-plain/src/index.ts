import { name, version } from '../package.json'

export const meta = { name, version }

export function parseForESLint(code: string) {
  return {
    ast: {
      type: 'Program',
      loc: { start: 0, end: code.length },
      range: [0, code.length],
      body: [],
      comments: [],
      tokens: [],
    },
    services: { isPlain: true },
    scopeManager: null,
    visitorKeys: {
      Program: [],
    },
  }
}

export default { meta, parseForESLint }
