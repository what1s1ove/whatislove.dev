import del from 'del'
import { joinPaths } from '../../helpers/helpers.mjs'
import { Config } from '../../config.mjs'

const cleanup = () => del([`${joinPaths(Config.FOLDER.BUILD, Config.FILE.REV)}.json`])

export { cleanup }
