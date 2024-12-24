// @ts-check

/** @type {import('lint-staged').Config} */
const config = {
  '*.?([cm])[jt]s?(x)': ['eslint --flag unstable_ts_config --fix'],
  '*.json?(c|5)': ['eslint --flag unstable_ts_config --fix'],
  '*.{md,htm,html,yml,yaml}': ['eslint --flag unstable_ts_config --fix'],
  '*.{c,le,sc,pc,postc}ss': ['eslint --flag unstable_ts_config --fix'],
}

export default config
