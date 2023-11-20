class Storage {
	/** @type {globalThis.Storage} */
	#storage

	/**
	 * @param {{
	 * 	storage: globalThis.Storage
	 * }} constructor
	 */
	constructor({ storage }) {
		this.#storage = storage
	}

	/** @returns {void} */
	clear() {
		return this.#storage.clear()
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
		return this.#storage.removeItem(key)
	}

	/**
	 * @param {string} key
	 * @param {string} value
	 * @returns {void}
	 */
	setItem(key, value) {
		return this.#storage.setItem(key, value)
	}
}

export { Storage }
