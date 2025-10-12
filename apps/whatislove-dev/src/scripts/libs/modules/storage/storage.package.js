class Storage {
	/** @type {localStorage} */
	#storage

	/**
	 * @param {{
	 * 	storage: localStorage
	 * }} constructor
	 */
	constructor({ storage }) {
		this.#storage = storage
	}

	/** @returns {void} */
	clear() {
		this.#storage.clear()
	}

	/**
	 * @param {string} key
	 * @returns {string | null}
	 */
	getItem(key) {
		return this.#storage.getItem(key)
	}

	/**
	 * @param {string} key
	 * @returns {void}
	 */
	removeItem(key) {
		this.#storage.removeItem(key)
	}

	/**
	 * @param {string} key
	 * @param {string} value
	 * @returns {void}
	 */
	setItem(key, value) {
		this.#storage.setItem(key, value)
	}
}

export { Storage }
