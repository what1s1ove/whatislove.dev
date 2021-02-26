import { HttpError } from '~/exceptions'
import { HttpCode } from '~/common/enums'
import { getErrorMessageResponse } from '../../helpers'
import { AppEvent } from '../../common/enums'

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err instanceof HttpError ? err.status : HttpCode.INTERNAL_SERVER_ERROR

    ctx.body = getErrorMessageResponse(err.message)

    ctx.app.emit(AppEvent.ERROR, err, ctx)
  }
}

export { catchError }
