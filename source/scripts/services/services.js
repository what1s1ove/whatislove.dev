import { AppConfig } from '~/common/enums/enums.js'
import { getServerApiUrl } from '~/helpers/helpers.js'

import { Http } from './http/http.service.js'
import { Storage } from './storage/storage.service.js'
import { TimelineApi } from './timeline-api/timeline-api.service.js'

let storage = new Storage({
  storage: localStorage,
})

let http = new Http()

let timelineApi = new TimelineApi({
  http,
  baseUrl: getServerApiUrl({
    host: AppConfig.SERVER_HOST,
    port: AppConfig.SERVER_PORT,
  }),
  filesApiPath: AppConfig.FILES_API_PATH,
})

export { http, storage, timelineApi }
export { WhatisloveMath } from './whatislove-math/whatislove-math.service.js'
