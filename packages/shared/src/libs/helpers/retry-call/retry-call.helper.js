import { setAsyncTimeout } from '../set-async-timeout/set-async-timeout.helper.js'

let MINIMAL_RETRY_COUNT_FOR_CALL = /** @type {const} */ (0)
let RETRY_COUNT_DECREMENT_PER_CALL = /** @type {const} */ (1)

/**
 * @template {unknown} T
 * @param {(...args: unknown[]) => T | Promise<T>} callback
 * @param {{
 * 	retriesCount?: number
 * 	delayMs?: number
 * 	delayFactorCount?: number
 * }} [options]
 * @returns {Promise<T>}
 */
let retryCall = async (
	callback,
	{ delayFactorCount = 3, delayMs = 1000, retriesCount = 3 } = {},
) => {
	try {
		return await callback()
	} catch (error) {
		let hasRetries = retriesCount > MINIMAL_RETRY_COUNT_FOR_CALL

		if (!hasRetries) {
			throw error
		}

		await setAsyncTimeout(undefined, delayMs)

		let updatedDelayMs = delayMs * delayFactorCount
		let updatedTriesCount = retriesCount - RETRY_COUNT_DECREMENT_PER_CALL

		return retryCall(callback, {
			delayFactorCount,
			delayMs: updatedDelayMs,
			retriesCount: updatedTriesCount,
		})
	}
}

export { retryCall }
