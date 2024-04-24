import { NotificationMessage } from '~/libs/enums/enums.js'
import { ToastMessagePayload } from '~/libs/types/types.js'

import { NOTIFICATION_DELAY } from './libs/constants/constants.js'

class Paw {
	/** @type {() => void} */
	#handlePawButtonClick

	/** @type {(payload: ToastMessagePayload) => void} */
	#onNotificationAdd

	/** @type {HTMLButtonElement | undefined} */
	#pawButtonNode

	/**
	 * @param {{
	 * 	onNotificationAdd: (payload: ToastMessagePayload) => void
	 * }} constructor
	 */
	constructor({ onNotificationAdd }) {
		this.#onNotificationAdd = onNotificationAdd

		this.#pawButtonNode = undefined

		this.#handlePawButtonClick = this.#clickPawButtonHandler.bind(this)
	}

	/** @returns {void} */
	#clickPawButtonHandler() {
		this.#onNotificationAdd({
			duration: NOTIFICATION_DELAY,
			message: NotificationMessage.PAW,
		})
	}

	/** @returns {void} */
	#initListeners() {
		let pawButtonNode = /** @type {HTMLElement} */ (this.#pawButtonNode)

		pawButtonNode.addEventListener(`click`, this.#handlePawButtonClick)
	}

	/**
	 * @param {HTMLButtonElement} pawButtonNode
	 * @returns {void}
	 */
	init(pawButtonNode) {
		this.#pawButtonNode = pawButtonNode

		this.#initListeners()
	}
}

export { Paw }
