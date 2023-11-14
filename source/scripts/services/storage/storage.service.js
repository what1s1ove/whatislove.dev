class Storage {
  constructor({ storage }) {
    this._storage = storage
  }

  clear() {
    return this._storage.clear()
  }

  getItem(key) {
    return this._storage.getItem(key)
  }

  removeItem(key) {
    return this._storage.removeItem(key)
  }

  setItem(key, value) {
    return this._storage.setItem(key, value)
  }
}

export { Storage }
