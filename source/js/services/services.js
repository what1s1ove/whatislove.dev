import { getServerApiUrl } from '~/helpers/helpers.js'
import { AppConfig } from '~/common/enums/enums.js'
import { Http } from './http/http.service.js'
import { WhatisloveMath } from './whatislove-math/whatislove-math.service.js'
import { TimelineApi } from './timeline-api/timeline-api.service.js'
import { Storage } from './storage/storage.service.js'

const storage = new Storage({
  storage: localStorage,
})

const http = new Http()

const timelineApi = new TimelineApi({
  http,
  baseUrl: getServerApiUrl({
    host: AppConfig.SERVER_HOST,
    port: AppConfig.SERVER_PORT,
  }),
  filesApiPath: AppConfig.FILES_API_PATH,
})

export { WhatisloveMath, storage, http, timelineApi }
