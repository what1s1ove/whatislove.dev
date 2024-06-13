import { setAsyncTimeout } from '~/libs/helpers/helpers.js'
import { ToastMessagePayload } from '~/libs/types/types.js'

import {
	CLEAN_MESSAGE_DELAY,
	TOAST_DEFAULT_DURATION,
} from './libs/constants/constants.js'

class Toast {
	/** @type {boolean} */
	#isShowingMessage

	/** @type {ToastMessagePayload[]} */
	#messages

	/** @type {HTMLElement | undefined} */
	#toastNode

	constructor() {
		this.#toastNode = undefined
		this.#messages = []
		this.#isShowingMessage = false
	}

	/**
	 * @param {ToastMessagePayload} messagePayload
	 * @returns {Promise<void>}
	 */
	async #displayToastMessage(messagePayload) {
		let toastNode = /** @type {HTMLElement} */ (this.#toastNode)
		let { cb, duration = TOAST_DEFAULT_DURATION, message } = messagePayload

		toastNode.textContent = message

		await setAsyncTimeout(() => {}, duration)

		await setAsyncTimeout(() => {
			toastNode.textContent = ``
		}, CLEAN_MESSAGE_DELAY)

		cb?.()
	}

	/** @returns {Promise<void>} */
	async #initShowingMessages() {
		let messagePayload = /** @type {ToastMessagePayload} */ (
			this.#messages.shift()
		)

		this.#isShowingMessage = true

		await this.#displayToastMessage(messagePayload)

		let hasMessages = this.#messages.length > 0

		if (hasMessages) {
			void this.#initShowingMessages()

			return
		}

		this.#isShowingMessage = false
	}

	/**
	 * @param {HTMLElement} toastNode
	 * @returns {void}
	 */
	init(toastNode) {
		this.#toastNode = toastNode
	}

	/**
	 * @param {ToastMessagePayload} message
	 * @returns {void}
	 */
	pushMessage(message) {
		this.#messages.push(message)

		if (!this.#isShowingMessage) {
			void this.#initShowingMessages()
		}
	}
}

export { Toast }
