import { getLoaderElement } from './helpers/helpers.js'

class Loader {
  constructor({ containerNode }) {
    this._containerNode = containerNode

    this._loaderNode = undefined
  }

  init() {
    this._loaderNode = getLoaderElement()

    this._containerNode.prepend(this._loaderNode)
  }

  remove() {
    this._loaderNode.remove()
  }
}

export { Loader }
