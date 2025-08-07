import config from './src/index.js'

export default config({
  format: true,
  javascript: true,
  typescript: true,
  json: true,
  react: { enable: true, stylistic: true, typeCheck: true, reactCompiler: true },
  nextjs: true,
  node: true,
  tailwindcss: true,
})
