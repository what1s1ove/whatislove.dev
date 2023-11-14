import { ContentType, HttpHeader, HttpMethod } from '~/common/enums/enums.js'
import { HttpError } from '~/exceptions/exceptions.js'
import { checkIsOneOf } from '~/helpers/helpers.js'

class Http {
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

  _getHeaders({ contentType }) {
    let headers = new Headers()

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType)
    }

    return headers
  }

  load(url, options = {}) {
    let { contentType, method = HttpMethod.GET, payload } = options
    let headers = this._getHeaders({
      contentType,
    })
    let isJSON = checkIsOneOf(contentType, ContentType.JSON)

    return fetch(url, {
      body: isJSON ? JSON.stringify(payload) : payload,
      headers,
      method,
    })
      .then(Http.checkStatus)
      .then(Http.parseJSON)
      .catch(Http.throwError)
  }
}

export { Http }
