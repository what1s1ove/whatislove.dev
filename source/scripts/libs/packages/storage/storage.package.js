class Storage {
  /**
   * @param {{
   *   storage: globalThis.Storage
   * }} constructor
   */
  constructor({ storage }) {
    /**
     * @private
     * @type {globalThis.Storage}
     */
    this._storage = storage
  }

  /** @returns {void} */
  clear() {
    return this._storage.clear()
  }

  /**
   * @param {string} key
   * @returns {string | null}
   */
  getItem(key) {
    return this._storage.getItem(key)
  }

  /**
   * @param {string} key
   * @returns {void}
   */
  removeItem(key) {
    return this._storage.removeItem(key)
  }

  /**
   * @param {string} key
   * @param {string} value
   * @returns {void}
   */
  setItem(key, value) {
    return this._storage.setItem(key, value)
  }
}

export { Storage }
