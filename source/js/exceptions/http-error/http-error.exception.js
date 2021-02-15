import { HttpCode, CustomExceptionName, ApiErrorMessage } from '~/common/enums'
import { getTransformedErrorMessage } from '~/server/helpers'

class HttpError extends Error {
  constructor({
    status = HttpCode.INTERNAL_SERVER_ERROR,
    message = ApiErrorMessage.NETWORK_ERROR,
  } = {}) {
    super(getTransformedErrorMessage(message))
    this.status = status
    this.name = CustomExceptionName.HTTP_ERROR
  }
}

export { HttpError }
