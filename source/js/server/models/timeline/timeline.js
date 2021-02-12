class Timeline {
  constructor({ database, column }) {
    this._database = database
    this._column = column
  }

  getAll() {
    return this._database.getAll({
      column: this._column,
    })
  }

  getByPk(id) {
    return this._database.getByPk({
      id,
      column: this._column,
    })
  }

  create(payload) {
    return this._database.create({
      payload,
      column: this._column,
    })
  }

  update(id, payload) {
    return this._database.update({
      id,
      payload,
      column: this._column,
    })
  }

  delete(id) {
    return this._database.delete({
      id,
      column: this._column,
    })
  }
}

export { Timeline }
