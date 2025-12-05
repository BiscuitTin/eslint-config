import { defineConfig } from 'tsdown/config'

export default defineConfig({
  entry: 'src/index.ts',
  attw: false,
  clean: true,
  dts: true,
  tsconfig: '../../tsconfigs/tsconfig.default.json',
  exports: true,
  publint: true,
  report: true,
})
