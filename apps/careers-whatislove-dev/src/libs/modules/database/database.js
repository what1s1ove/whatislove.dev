import { appConfig } from '~/libs/modules/config/config.js'

import { AppDatabase } from './app-database.js'

let appDatabase = new AppDatabase(appConfig)

export { appDatabase }
export { TableNames } from './libs/enums/enums.js'
