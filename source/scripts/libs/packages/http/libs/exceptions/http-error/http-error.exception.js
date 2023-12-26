import { CustomExceptionName, ErrorMessage } from '~/libs/enums/enums.js'
import { ValuesOf } from '~/libs/types/types.js'

import { HttpCode } from '../../enums/enums.js'

class HttpError extends Error {
	/**
	 * @param {{
	 * 	message?: ValuesOf<typeof ErrorMessage>
	 * 	status?: ValuesOf<typeof HttpCode>
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
