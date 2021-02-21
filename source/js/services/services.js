import { getServerApiUrl } from '~/helpers'
import { AppConfig } from '~/common/enums'
import { Http } from './http/http.service'
import { TimelineApi } from './timeline-api/timeline-api.server'
import { Storage } from './storage/storage.service'

const storage = new Storage({
  storage: localStorage,
})
const http = new Http()
const timelineApi = new TimelineApi({
  http,
  baseUrl: getServerApiUrl({
    host: AppConfig.SERVER_HOST,
    apiPrefix: AppConfig.SERVER_API_PREFIX,
    port: AppConfig.SERVER_PORT,
  }),
  filesApiPath: AppConfig.FILES_API_PATH,
})

export { storage, http, timelineApi }
