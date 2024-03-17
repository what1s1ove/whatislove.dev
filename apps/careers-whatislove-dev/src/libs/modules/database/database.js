import { config } from '~/libs/modules/config/config.js'

import { Database } from './database.module.js'

let database = new Database(config)

export { database }
export { TableNames } from './libs/enums/enums.js'
