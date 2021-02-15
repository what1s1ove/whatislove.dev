import { ERROR_MESSAGES_SEPARATOR } from '~/common/constants'

const getTransformedErrorMessage = (message) => {
  return Array.isArray(message)
    ? message.join(ERROR_MESSAGES_SEPARATOR)
    : message
}

export { getTransformedErrorMessage }
