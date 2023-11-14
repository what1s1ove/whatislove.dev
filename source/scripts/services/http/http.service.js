import { ContentType, HttpHeader, HttpMethod } from '~/common/enums/enums.js'
import { HttpError } from '~/exceptions/exceptions.js'
import { checkIsOneOf } from '~/helpers/helpers.js'

class Http {
  load(url, options = {}) {
    let { method = HttpMethod.GET, payload, contentType } = options
    let headers = this._getHeaders({
      contentType,
    })
    let isJSON = checkIsOneOf(contentType, ContentType.JSON)

    return fetch(url, {
      method,
      headers,
      body: isJSON ? JSON.stringify(payload) : payload,
    })
      .then(Http.checkStatus)
      .then(Http.parseJSON)
      .catch(Http.throwError)
  }

  _getHeaders({ contentType }) {
    let headers = new Headers()

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType)
    }

    return headers
  }

  static checkStatus(response) {
    if (!response.ok) {
      throw new HttpError({
        message: response.statusText,
      })
    }

    return response
  }

  static parseJSON(response) {
    return response.json()
  }

  static throwError(error) {
    throw error
  }
}

export { Http }
