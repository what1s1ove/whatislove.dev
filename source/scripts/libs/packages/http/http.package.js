import { ContentType, ErrorMessage } from '~/libs/enums/enums.js'
import { checkIsOneOf } from '~/libs/helpers/helpers.js'

import { HttpHeader, HttpMethod } from './libs/enums/enums.js'
import { HttpError } from './libs/exceptions/exceptions.js'

class Http {
  /**
   * @param {Response} response
   * @returns {Response | never}
   * @throws {HttpError}
   */
  static checkStatus(response) {
    if (!response.ok) {
      throw new HttpError({
        message:
          /** @type {(typeof ErrorMessage)[keyof typeof ErrorMessage]} */ (
            response.statusText ?? ErrorMessage.NETWORK_ERROR
          ),
      })
    }

    return response
  }

  /**
   * @template T
   * @param {Response} response
   * @returns {Promise<T>}
   */
  static parseJSON(response) {
    return response.json()
  }

  /**
   * @param {Error} error
   * @returns {never}
   * @throws {Error}
   */
  static throwError(error) {
    throw error
  }

  /**
   * @param {{
   *   contentType?: (typeof ContentType)[keyof typeof ContentType] | undefined
   * }} options
   * @returns {Headers}
   */
  _getHeaders({ contentType }) {
    let headers = new Headers()

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType)
    }

    return headers
  }

  /**
   * @template T
   * @param {string} url
   * @param {{
   *   contentType?: (typeof ContentType)[keyof typeof ContentType]
   *   method?: (typeof HttpMethod)[keyof typeof HttpMethod]
   *   payload?: unknown
   * }} [options]
   * @returns {Promise<T>}
   */
  load(url, options = {}) {
    let { contentType, method = HttpMethod.GET, payload } = options
    let headers = this._getHeaders({
      contentType,
    })
    let isJSON = checkIsOneOf(contentType, ContentType.JSON)

    return fetch(url, {
      body: /** @type {BodyInit} */ (
        isJSON ? JSON.stringify(payload) : undefined
      ),
      headers,
      method,
    })
      .then((response) => Http.checkStatus(response))
      .then((response) => Http.parseJSON(response))
      .catch((error) => Http.throwError(error))
  }
}

export { Http }
