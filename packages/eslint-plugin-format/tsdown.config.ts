import { defineConfig } from 'tsdown/config'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'workers/dprint': 'src/workers/dprint.js',
    'workers/prettier': 'src/workers/prettier.js',
    'define-config-support': 'src/define-config-support.ts',
    'rule-options': 'src/rule-options.ts',
  },
  attw: false,
  clean: true,
  tsconfig: '../../tsconfigs/tsconfig.default.json',
  dts: true,
  exports: true,
  publint: true,
  report: true,
})
