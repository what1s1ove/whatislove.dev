import {
  HttpMethod,
  TimelineApiPath,
  ApiPath,
  ContentType,
} from '~/common/enums'

class TimelineApi {
  constructor({ http, baseUrl }) {
    this._http = http
    this._baseUrl = baseUrl
    this._apiPath = ApiPath.TIMELINE
  }

  getTimelines() {
    return this._http.load(this._baseUrl(TimelineApiPath.ROOT), {
      method: HttpMethod.GET,
    })
  }

  saveTimeline(payload) {
    return this._http.load(this._getUrl(TimelineApiPath.ROOT), {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload,
    })
  }

  _getUrl(path) {
    return `${this._baseUrl}${this._apiPath}${path}`
  }
}

export { TimelineApi }
