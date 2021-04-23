import del from 'del'
import { joinPaths } from '../../helpers/helpers.js'
import { Config } from '../../config.js'

const cleanup = () => del([`${joinPaths(Config.FOLDER.BUILD, Config.FILE.REV)}.json`])

export { cleanup }
