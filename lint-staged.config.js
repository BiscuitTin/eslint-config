// @ts-check

/** @type {import('lint-staged').Configuration} */
const config = {
  '*.?([cm])[jt]s?(x)': ['eslint --fix'],
  '*.json?(c|5)': ['eslint --fix'],
  '*.{md,htm,html,yml,yaml}': ['eslint --fix'],
  '*.{c,le,sc,pc,postc}ss': ['eslint --fix'],
}

export default config
