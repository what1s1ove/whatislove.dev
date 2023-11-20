import { getLoaderElement } from './libs/helpers/helpers.js'

class Loader {
	/** @type {HTMLElement} */
	#containerNode

	/** @type {HTMLElement | undefined} */
	#loaderNode

	/**
	 * @param {{
	 * 	containerNode: HTMLElement
	 * }} constructor
	 */
	constructor({ containerNode }) {
		this.#containerNode = containerNode

		this.#loaderNode = undefined
	}

	/** @returns {void} */
	init() {
		this.#loaderNode = getLoaderElement()

		this.#containerNode.prepend(this.#loaderNode)
	}

	/** @returns {void} */
	remove() {
		let loaderNode = /** @type {HTMLElement} */ (this.#loaderNode)

		loaderNode.remove()
	}
}

export { Loader }
