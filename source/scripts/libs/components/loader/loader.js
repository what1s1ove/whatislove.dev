import { getLoaderElement } from './libs/helpers/helpers.js'

class Loader {
  /**
   * @param {{
   *   containerNode: HTMLElement
   * }} constructor
   */
  constructor({ containerNode }) {
    this._containerNode = containerNode

    /** @type {HTMLElement | undefined} */
    this._loaderNode = undefined
  }

  /** @returns {void} */
  init() {
    this._loaderNode = getLoaderElement()

    this._containerNode.prepend(this._loaderNode)
  }

  /** @returns {void} */
  remove() {
    let loaderNode = /** @type {HTMLElement} */ (this._loaderNode)

    loaderNode.remove()
  }
}

export { Loader }
