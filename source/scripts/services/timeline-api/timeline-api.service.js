import {
  ApiPath,
  ContentType,
  HttpMethod,
  TimelineApiPath,
} from '~/common/enums/enums.js'

class TimelineApi {
  constructor({ baseUrl, filesApiPath, http }) {
    this._http = http
    this._baseUrl = baseUrl
    this._filesApiPath = filesApiPath
    this._apiPath = ApiPath.TIMELINE
  }

  _getApiUrl(path) {
    return `${this._baseUrl}${this._apiPath}${path}`
  }

  _getFileUrl(path) {
    return `${this._filesApiPath}${path}.json`
  }

  getTimelines() {
    return this._http.load(this._getFileUrl(this._apiPath), {
      method: HttpMethod.GET,
    })
  }

  saveTimeline(payload) {
    return this._http.load(this._getApiUrl(TimelineApiPath.ROOT), {
      contentType: ContentType.JSON,
      method: HttpMethod.POST,
      payload,
    })
  }
}

export { TimelineApi }
