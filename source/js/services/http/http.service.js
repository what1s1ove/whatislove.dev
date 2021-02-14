import { HttpError } from '~/exceptions'
import { ContentType, HttpHeader, HttpMethod } from '~/common/enums'
import { checkIsOneOf } from '~/helpers'

class Http {
  _load(url, options) {
    const { method = HttpMethod.GET, payload = null, contentType } = options
    const headers = this._getHeaders({
      contentType,
    })
    const isJSON = checkIsOneOf(contentType, ContentType.JSON)

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
    const headers = new Headers()

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType)
    }

    return headers
  }

  static checkStatus(response) {
    if (!response.ok) {
      throw new HttpError({})
    }

    return response
  }

  static parseJSON(response) {
    return response.json()
  }

  static throwError(err) {
    throw err
  }
}

export { Http }
