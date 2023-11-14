import {
  ApiErrorMessage,
  CustomExceptionName,
  HttpCode,
} from '~/common/enums/enums.js'

class HttpError extends Error {
  constructor({
    message = ApiErrorMessage.NETWORK_ERROR,
    status = HttpCode.INTERNAL_SERVER_ERROR,
  } = {}) {
    super(message)
    this.status = status
    this.name = CustomExceptionName.HTTP_ERROR
  }
}

export { HttpError }
