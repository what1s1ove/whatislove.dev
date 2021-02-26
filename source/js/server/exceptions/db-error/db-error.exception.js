import { CustomExceptionName } from '~/common/enums'

class DbError extends Error {
  constructor({ message }) {
    super(message)
    this.name = CustomExceptionName.DB_ERROR
  }
}

export { DbError }
