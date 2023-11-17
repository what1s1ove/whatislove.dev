import { CustomExceptionName, ErrorMessage } from '~/libs/enums/enums.js'

import { HttpCode } from '../../enums/enums.js'

class HttpError extends Error {
  /**
   * @param {{
   *   message?: (typeof ErrorMessage)[keyof typeof ErrorMessage]
   *   status?: (typeof HttpCode)[keyof typeof HttpCode]
   * }} [properties]
   */
  constructor({
    message = ErrorMessage.NETWORK_ERROR,
    status = HttpCode.INTERNAL_SERVER_ERROR,
  } = {}) {
    super(message)
    this.status = status
    this.name = CustomExceptionName.HTTP_ERROR
  }
}

export { HttpError }
