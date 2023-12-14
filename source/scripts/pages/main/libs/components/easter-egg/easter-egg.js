import { NotificationMessage } from '~/libs/enums/enums.js'
import { initDebounce } from '~/libs/helpers/helpers.js'
import {
	SettingButtonLabel,
	SettingName,
} from '~/pages/main/libs/enums/enums.js'

import {
	NOTIFICATION_DELAY,
	RESIZE_DELAY,
	SOUND_SRC,
} from './libs/constants/constants.js'
import {
	getNodeRandomCoords,
	getPlayerElement,
} from './libs/helpers/helpers.js'

/** @typedef {import('~/libs/types/types.js').ToastMessagePayload} ToastMessagePayload */
/** @typedef {import('~/pages/main/libs/types/types.js').SettingsButtonPayload} SettingsButtonPayload */

class EasterEgg {
	/** @type {HTMLAudioElement | undefined} */
	#audioNode

	/** @type {HTMLButtonElement | undefined} */
	#easterEggButtonNode

	/** @type {HTMLElement | undefined} */
	#easterEggNode

	/** @type {() => void} */
	#handleEasterEggClick

	/**
	 * @type {(
	 * 	name: (typeof SettingName)[keyof typeof SettingName],
	 * 	isChecked: boolean,
	 * ) => void}
	 */
	#handleSettingButtonClick

	/** @type {() => void} */
	#handleWindowResize

	/** @type {(payload: ToastMessagePayload) => void} */
	#onNotificationAdd

	/** @type {(payload: SettingsButtonPayload) => HTMLButtonElement} */
	#onSettingButtonAppend

	/**
	 * @param {{
	 * 	onNotificationAdd: (payload: ToastMessagePayload) => void
	 * 	onSettingButtonAppend: (
	 * 		payload: SettingsButtonPayload,
	 * 	) => HTMLButtonElement
	 * }} constructor
	 */
	constructor({ onNotificationAdd, onSettingButtonAppend }) {
		this.#onNotificationAdd = onNotificationAdd
		this.#onSettingButtonAppend = onSettingButtonAppend

		this.#easterEggNode = undefined
		this.#easterEggButtonNode = undefined
		this.#audioNode = undefined

		this.#handleEasterEggClick = this.#clickEasterEggClickHandler.bind(this)
		this.#handleSettingButtonClick =
			this.#clickSettingButtonHandler.bind(this)
		this.#handleWindowResize = initDebounce(
			this.#resizeWindowHandler.bind(this),
			RESIZE_DELAY,
		)
	}

	/** @returns {void} */
	#clickEasterEggClickHandler() {
		let easterEggNode = /** @type {HTMLElement} */ (this.#easterEggNode)

		this.#onNotificationAdd({
			/** @returns {void} */
			cb: () => {
				let buttonNode = this.#onSettingButtonAppend({
					isDefaultChecked: true,
					label: SettingButtonLabel.SWITCH_LOVE,
					name: SettingName.WHATISLOVE,
					onClick: this.#handleSettingButtonClick,
				})

				buttonNode.focus()
			},
			duration: NOTIFICATION_DELAY,
			message: NotificationMessage.LOVE,
		})

		this.#renderPlayer()

		this.#removeListeners()

		easterEggNode.remove()
	}

	/**
	 * @param {(typeof SettingName)[keyof typeof SettingName]} _name
	 * @param {boolean} isChecked
	 * @returns {void}
	 */
	#clickSettingButtonHandler(_name, isChecked) {
		let audioNode = /** @type {HTMLAudioElement} */ (this.#audioNode)

		isChecked ? audioNode.play() : audioNode.pause()
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
	#renderPlayer() {
		this.#audioNode = getPlayerElement(SOUND_SRC)

		document.body.append(this.#audioNode)
	}

	/** @returns {void} */
	#resizeWindowHandler() {
		this.#setRandomPosition()
	}

	/** @returns {void} */
	#setRandomPosition() {
		let easterEggNode = /** @type {HTMLElement} */ (this.#easterEggNode)
		let { x, y } = getNodeRandomCoords(easterEggNode)

		easterEggNode.style.top = `${y}px`
		easterEggNode.style.left = `${x}px`
	}

	/**
	 * @param {HTMLElement} easterEggNode
	 * @returns {void}
	 */
	init(easterEggNode) {
		this.#easterEggNode = easterEggNode
		this.#easterEggButtonNode = /** @type {HTMLButtonElement} */ (
			document.querySelector(`.not-easter-egg__button`)
		)

		this.#setRandomPosition()

		this.#initListeners()
	}
}

export { EasterEgg }
