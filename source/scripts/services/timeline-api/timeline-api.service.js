import {
  ApiPath,
  ContentType,
  HttpMethod,
  TimelineApiPath,
} from '~/common/enums/enums.js'

class TimelineApi {
  constructor({ http, baseUrl, filesApiPath }) {
    this._http = http
    this._baseUrl = baseUrl
    this._filesApiPath = filesApiPath
    this._apiPath = ApiPath.TIMELINE
  }

  getTimelines() {
    return this._http.load(this._getFileUrl(this._apiPath), {
      method: HttpMethod.GET,
    })
  }

  saveTimeline(payload) {
    return this._http.load(this._getApiUrl(TimelineApiPath.ROOT), {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload,
    })
  }

  _getApiUrl(path) {
    return `${this._baseUrl}${this._apiPath}${path}`
  }

  _getFileUrl(path) {
    return `${this._filesApiPath}${path}.json`
  }
}

export { TimelineApi }
