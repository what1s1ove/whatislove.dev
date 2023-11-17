import { ApiPath, ContentType } from '~/libs/enums/enums.js'
import { HttpMethod } from '~/libs/packages/http/http.js'

import { TimelineApiPath } from './libs/enums/enums.js'

/** @typedef {import('~/libs/packages/http/http').Http} Http */
/** @typedef {import('./libs/types/types').Timeline} Timeline */
/** @typedef {import('./libs/types/types')} TimelineCreatePayload */

class TimelineApi {
  /**
   * @param {{
   *   baseUrl: string
   *   filesApiPath: string
   *   http: Http
   * }} config
   */
  constructor({ baseUrl, filesApiPath, http }) {
    this._http = http
    this._baseUrl = baseUrl
    this._filesApiPath = filesApiPath
    this._apiPath = ApiPath.TIMELINE
  }

  /**
   * @param {string} path
   * @returns {string}
   */
  _getApiUrl(path) {
    return `${this._baseUrl}${this._apiPath}${path}`
  }

  /**
   * @param {string} path
   * @returns {string}
   */
  _getFileUrl(path) {
    return `${this._filesApiPath}${path}.json`
  }

  /** @returns {Promise<Timeline[]>} */
  getTimelines() {
    return this._http.load(this._getFileUrl(this._apiPath), {
      method: HttpMethod.GET,
    })
  }

  /**
   * @param {TimelineCreatePayload} payload
   * @returns {Promise<Timeline>}
   */
  saveTimeline(payload) {
    return this._http.load(this._getApiUrl(TimelineApiPath.ROOT), {
      contentType: ContentType.JSON,
      method: HttpMethod.POST,
      payload,
    })
  }
}

export { TimelineApi }
