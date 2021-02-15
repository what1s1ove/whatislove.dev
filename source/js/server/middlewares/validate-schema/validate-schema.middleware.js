import { HttpError } from '~/exceptions'
import { ValidationError } from '../../exceptions'
import { HttpCode } from '~/common/enums'

const validateSchema = (schema) => async (ctx, next) => {
  const { body } = ctx.request

  try {
    await schema.validateAsync(body, {
      abortEarly: false,
      convert: false,
    })
  } catch (err) {
    if (err instanceof ValidationError) {
      const { details } = err

      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: details.map((error) => error.message),
      })
    }
  }

  return next()
}

export { validateSchema }
