import { createElement } from '~/helpers'
import { getLoaderTemplate } from './helpers'

class Loader {
  constructor({ containerNode }) {
    this._containerNode = containerNode

    this._loaderNode = null
  }

  init() {
    this._loaderNode = createElement(getLoaderTemplate())

    this._containerNode.prepend(this._loaderNode)
  }

  remove() {
    this._loaderNode.remove()
  }
}

export { Loader }
