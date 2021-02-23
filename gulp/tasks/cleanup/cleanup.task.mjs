import del from 'del'
import { Config } from '../../config.mjs'

const cleanup = () => del([`${Config.FOLDER.BUILD}/${Config.FILE.REV}.json`])

export { cleanup }
