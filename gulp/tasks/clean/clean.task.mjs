import del from 'del'
import { Config } from '../../config.mjs'

const clean = () => del(Config.FOLDER.BUILD)

export { clean }
