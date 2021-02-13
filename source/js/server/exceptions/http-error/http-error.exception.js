import { HttpCode } from '~/common/enums'
import { CustomExceptionName, ApiErrorMessage } from '../../common/enums'

class HttpError extends Error {
  constructor({
    status = HttpCode.INTERNAL_SERVER_ERROR,
    messages = ApiErrorMessage.NETWORK_ERROR,
  }) {
    super(messages)
    this.status = status
    this.name = CustomExceptionName.HTTP_ERROR
  }
}

export { HttpError }
