class Notify {
	/**
	 * @param {string} message
	 * @returns {void}
	 */
	error(message) {
		this.#show(`ERROR: ${message}`)
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
	#show(message) {
		alert(message)
	}
}

export { Notify }
