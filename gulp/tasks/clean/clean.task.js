import del from 'del'
import { Config } from '../../config.js'

const clean = () => del([Config.FOLDER.BUILD])

export { clean }
