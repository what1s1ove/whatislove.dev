import { NotificationMessage } from '~/libs/enums/enums.js'
import { initDebounce } from '~/libs/helpers/helpers.js'
import { ToastMessagePayload } from '~/libs/types/types.js'

import {
	NOTIFICATION_DELAY,
	RESIZE_DELAY,
	SOUND_SRC,
} from './libs/constants/constants.js'
import {
	getEasterEggControl,
	getNodeRandomCoords,
} from './libs/helpers/helpers.js'

class EasterEgg {
	/** @type {HTMLAudioElement | undefined} */
	#audioNode

	/** @type {HTMLButtonElement | undefined} */
	#easterEggAudioControlNode

	/** @type {HTMLButtonElement | undefined} */
	#easterEggButtonNode

	/** @type {HTMLElement | undefined} */
	#easterEggButtonWrapperNode

	/** @type {HTMLElement | undefined} */
	#easterEggNode

	/** @type {() => void} */
	#handleClickSettingButton

	/** @type {() => void} */
	#handleEasterEggClick

	/** @type {() => void} */
	#handleWindowResize

	/** @type {(payload: ToastMessagePayload) => void} */
	#onNotificationAdd

	/** @type {number} */
	#windowWidth

	/**
	 * @param {{
	 * 	onNotificationAdd: (payload: ToastMessagePayload) => void
	 * }} constructor
	 */
	constructor({ onNotificationAdd }) {
		this.#onNotificationAdd = onNotificationAdd

		this.#easterEggNode = undefined
		this.#easterEggButtonWrapperNode = undefined
		this.#easterEggButtonNode = undefined
		this.#easterEggAudioControlNode = undefined
		this.#audioNode = undefined
		this.#windowWidth = window.innerWidth

		this.#handleEasterEggClick = this.#clickEasterEggClickHandler.bind(this)
		this.#handleWindowResize = initDebounce(
			this.#resizeWindowHandler.bind(this),
			RESIZE_DELAY,
		)
		this.#handleClickSettingButton =
			this.#clickSettingButtonHandler.bind(this)
	}

	/** @returns {void} */
	#clickEasterEggClickHandler() {
		let easterEggButtonWrapperNode = /** @type {HTMLElement} */ (
			this.#easterEggButtonWrapperNode
		)

		this.#onNotificationAdd({
			/** @returns {void} */
			cb: () => {
				this.#renderAudio()

				let easterEggAudioControlNode =
					/** @type {HTMLInputElement} */ (
						this.#easterEggAudioControlNode
					)
				let audioNode = /** @type {HTMLAudioElement} */ (
					this.#audioNode
				)

				easterEggAudioControlNode.ariaChecked = `true`

				void audioNode.play()

				easterEggAudioControlNode.focus()
			},
			duration: NOTIFICATION_DELAY,
			message: NotificationMessage.LOVE,
		})

		this.#removeListeners()

		easterEggButtonWrapperNode.remove()
	}

	/** @returns {void} */
	#clickSettingButtonHandler() {
		let audioNode = /** @type {HTMLAudioElement} */ (this.#audioNode)
		let easterEggAudioControlNode = /** @type {HTMLInputElement} */ (
			this.#easterEggAudioControlNode
		)

		let isChecked = easterEggAudioControlNode.ariaChecked === `true`

		if (isChecked) {
			audioNode.pause()
		} else {
			void audioNode.play()
		}

		easterEggAudioControlNode.ariaChecked = (!isChecked).toString()
	}

	/** @returns {void} */
	#initListeners() {
		let easterEggButtonNode = /** @type {HTMLElement} */ (
			this.#easterEggButtonNode
		)

		easterEggButtonNode.addEventListener(
			`click`,
			this.#handleEasterEggClick,
		)
		globalThis.addEventListener(`resize`, this.#handleWindowResize)
	}

	/** @returns {void} */
	#removeListeners() {
		let easterEggButtonNode = /** @type {HTMLElement} */ (
			this.#easterEggButtonNode
		)

		easterEggButtonNode.removeEventListener(
			`click`,
			this.#handleEasterEggClick,
		)
		globalThis.removeEventListener(`resize`, this.#handleWindowResize)
	}

	/** @returns {void} */
	#renderAudio() {
		let easterEggNode = /** @type {HTMLElement} */ (this.#easterEggNode)

		this.#easterEggAudioControlNode = getEasterEggControl()

		this.#easterEggAudioControlNode.addEventListener(
			`click`,
			this.#handleClickSettingButton,
		)

		easterEggNode.append(this.#easterEggAudioControlNode)

		this.#audioNode = new Audio(SOUND_SRC)
	}

	/** @returns {void} */
	#resizeWindowHandler() {
		let hasSameWidth = this.#windowWidth === window.innerWidth

		if (hasSameWidth) {
			return
		}

		this.#windowWidth = window.innerWidth

		this.#setRandomPosition()
	}

	/** @returns {void} */
	#setRandomPosition() {
		let easterEggButtonWrapperNode = /** @type {HTMLElement} */ (
			this.#easterEggButtonWrapperNode
		)
		let { x, y } = getNodeRandomCoords(easterEggButtonWrapperNode)

		easterEggButtonWrapperNode.style.insetBlockStart = `${y}px`
		easterEggButtonWrapperNode.style.insetInlineStart = `${x}px`
	}

	/**
	 * @param {HTMLElement} easterEggNode
	 * @returns {void}
	 */
	init(easterEggNode) {
		this.#easterEggNode = easterEggNode

		this.#easterEggButtonWrapperNode = /** @type {HTMLButtonElement} */ (
			this.#easterEggNode.querySelector(`.not-easter-egg__button-wrapper`)
		)
		this.#easterEggButtonNode = /** @type {HTMLButtonElement} */ (
			this.#easterEggNode.querySelector(`.not-easter-egg__button`)
		)

		this.#setRandomPosition()

		this.#initListeners()
	}
}

export { EasterEgg }
