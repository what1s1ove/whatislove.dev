import { setAsyncTimeout } from '~/libs/helpers/helpers.js'

import {
	CLEAN_MESSAGE_DELAY,
	TOAST_DEFAULT_DURATION,
	TOAST_SHOW_CLASS_NAME,
} from './libs/constants/constants.js'

/** @typedef {import('~/libs/types/types').ToastMessagePayload} ToastMessagePayload */

class Toast {
	constructor() {
		/** @type {HTMLElement | undefined} */
		this._toastNode = undefined
		/** @type {ToastMessagePayload[]} */
		this._messages = []
		/** @type {boolean} */
		this._isShowingMessage = false
	}

	/**
	 * @param {ToastMessagePayload} messagePayload
	 * @returns {Promise<void>}
	 */
	async _displayToastMessage(messagePayload) {
		let toastNode = /** @type {HTMLElement} */ (this._toastNode)
		let { cb, duration = TOAST_DEFAULT_DURATION, message } = messagePayload

		toastNode.classList.add(TOAST_SHOW_CLASS_NAME)
		toastNode.textContent = message

		await setAsyncTimeout(() => {
			toastNode.classList.remove(TOAST_SHOW_CLASS_NAME)
		}, duration)

		await setAsyncTimeout(() => {
			toastNode.textContent = ``
		}, CLEAN_MESSAGE_DELAY)

		cb?.()
	}

	/** @returns {Promise<void>} */
	async _initShowingMessages() {
		let messagePayload = /** @type {ToastMessagePayload} */ (
			this._messages.shift()
		)

		this._isShowingMessage = true

		await this._displayToastMessage(messagePayload)

		let hasMessages = this._messages.length > 0

		if (hasMessages) {
			this._initShowingMessages()

			return
		}

		this._isShowingMessage = false
	}

	/** @returns {void} */
	init() {
		this._toastNode = /** @type {HTMLElement} */ (
			document.querySelector(`.toast`)
		)
	}

	/**
	 * @param {ToastMessagePayload} message
	 * @returns {void}
	 */
	pushMessage(message) {
		this._messages.push(message)

		if (!this._isShowingMessage) {
			this._initShowingMessages()
		}
	}
}

export { Toast }
