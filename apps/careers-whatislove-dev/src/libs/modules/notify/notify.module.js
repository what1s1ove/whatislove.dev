class Notify {
	/**
	 * @param {string} message
	 * @returns {void}
	 */
	#show(message) {
		alert(message)
	}

	/**
	 * @param {string} message
	 * @returns {void}
	 */
	success(message) {
		this.#show(message)
	}

	/**
	 * @param {string} message
	 * @returns {void}
	 */
	error(message) {
		this.#show(`ERROR: ${message}`)
	}
}

export { Notify }
