import { fileURLToPath } from 'node:url'

export default fileURLToPath(new URL('workers', import.meta.url))
