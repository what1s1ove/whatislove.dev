import { ContentType, ErrorMessage } from '~/libs/enums/enums.js'
import { checkIsOneOf } from '~/libs/helpers/helpers.js'
import { ValuesOf } from '~/libs/types/types.js'

import { HttpCode, HttpHeader, HttpMethod } from './libs/enums/enums.js'
import { HttpError } from './libs/exceptions/exceptions.js'

class Http {
	/**
	 * @param {Response} response
	 * @returns {Response | never}
	 * @throws {HttpError}
	 */
	static checkStatus(response) {
		if (!response.ok) {
			throw new HttpError({
				message: /** @type {ValuesOf<typeof ErrorMessage>} */ (
					response.statusText
				),
				status: /** @type {ValuesOf<typeof HttpCode>} */ (
					response.status
				),
			})
		}

		return response
	}

	/**
	 * @template T
	 * @param {Response} response
	 * @returns {Promise<T>}
	 */
	static parseJSON(response) {
		return /** @type {() => Promise<T>} */ (response.json)()
	}

	/**
	 * @param {unknown} error
	 * @returns {never}
	 * @throws {Error}
	 */
	static throwError(error) {
		throw error
	}

	/**
	 * @param {{
	 * 	contentType?: ValuesOf<typeof ContentType> | undefined
	 * }} options
	 * @returns {Headers}
	 */
	#getHeaders({ contentType }) {
		let headers = new Headers()

		if (contentType) {
			headers.append(HttpHeader.CONTENT_TYPE, contentType)
		}

		return headers
	}

	/**
	 * @template T
	 * @param {string} url
	 * @param {{
	 * 	contentType?: ValuesOf<typeof ContentType>
	 * 	method?: ValuesOf<typeof HttpMethod>
	 * 	payload?: unknown
	 * }} [options]
	 * @returns {Promise<T>}
	 */
	load(url, options = {}) {
		let { contentType, method = HttpMethod.GET, payload } = options
		let headers = this.#getHeaders({
			contentType,
		})
		let isJSON = checkIsOneOf(contentType, ContentType.JSON)

		return fetch(url, {
			body: /** @type {BodyInit} */ (
				isJSON ? JSON.stringify(payload) : undefined
			),
			headers,
			method,
		})
			.then((response) => Http.checkStatus(response))
			.then((response) => /** @type {T} */ (Http.parseJSON(response)))
			.catch(
				/**
				 * @param {unknown} error
				 * @returns {ReturnType<typeof Http.throwError>}
				 */
				(error) => Http.throwError(error),
			)
	}
}

export { Http }
