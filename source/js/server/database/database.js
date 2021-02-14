import { JsonDB } from 'node-json-db'
import { checkIsOneOf } from '~/helpers'
import { DbError } from '~/exceptions'
import { ARRAY_IDX_NOT_FOUND } from '~/common/constants'
import { DbErrorMessage } from '../common/enums'
import { getEntityWithId } from './helpers'
import { DEFAULT_DB_SEPARATOR, DATA_BASE_PATH } from './common/constants'

class Database {
  constructor({
    isHumanReadable = true,
    separator = DEFAULT_DB_SEPARATOR,
    filename,
    isSaveOnPush,
  }) {
    this._instance = new JsonDB(
      `${DATA_BASE_PATH}${filename}`,
      isSaveOnPush,
      isHumanReadable,
      separator,
    )

    this._separator = separator
  }

  getByPk({ column, id }) {
    const entityIdx = this._getIdx({ column, id })

    if (this._checkIsNotFoundIdx(entityIdx)) {
      return null
    }

    return this._instance.getData(this._getPathWithIdx(entityIdx, column))
  }

  getAll({ column }) {
    return this._instance.getData(this._getPath(column))
  }

  create({ column, payload, isGenerateId = true }) {
    const entity = isGenerateId ? getEntityWithId(payload) : payload

    this._instance.push(this._getPathWithIdx(``, column), entity)

    return entity
  }

  update({ payload, column }) {
    const entityIdx = this._getIdx({
      id: payload.id,
      column,
    })

    if (this._checkIsNotFoundIdx(entityIdx)) {
      throw new DbError({
        message: DbErrorMessage.ENTITY_NOT_FOUND,
      })
    }

    this._instance.push(this._getPathWithIdx(entityIdx, column), payload)

    return payload
  }

  delete({ column, id }) {
    const entityIdx = this._getIdx({ column, id })

    if (this._checkIsNotFoundIdx(entityIdx)) {
      throw new DbError({
        message: DbErrorMessage.ENTITY_NOT_FOUND,
      })
    }

    this._instance.delete(this._getPathWithIdx(entityIdx, column))

    return true
  }

  _getIdx({ column, id }) {
    return this._instance.getIndex(this._getPath(column), id)
  }

  _getPath(...paths) {
    return `${this._separator}${paths.join(this._separator)}`
  }

  _getPathWithIdx(idx, ...paths) {
    return `${this._getPath(paths)}[${idx}]`
  }

  _checkIsNotFoundIdx(idx) {
    return checkIsOneOf(idx, ARRAY_IDX_NOT_FOUND)
  }
}

export { Database }
