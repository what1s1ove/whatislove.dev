/**
 * @param {((...args: unknown[]) => unknown) | undefined} callback
 * @param {number} [timeout]
 * @returns {Promise<void>}
 */
let setAsyncTimeout = (callback, timeout = 0) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			callback?.()
			resolve()
		}, timeout)
	})
}

export { setAsyncTimeout }
