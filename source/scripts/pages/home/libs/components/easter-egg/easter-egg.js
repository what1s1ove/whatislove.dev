import { NotificationMessage } from '~/libs/enums/enums.js'
import { initDebounce } from '~/libs/helpers/helpers.js'
import {
	SettingButtonLabel,
	SettingName,
} from '~/pages/home/libs/enums/enums.js'

import {
	NOTIFICATION_DELAY,
	RESIZE_DELAY,
	SOUND_SRC,
} from './libs/constants/constants.js'
import {
	getNodeRandomCoords,
	getPlayerElement,
} from './libs/helpers/helpers.js'

/** @typedef {import('~/libs/types/types').ToastMessagePayload} ToastMessagePayload */
/** @typedef {import('~/pages/home/libs/types/types').SettingButtonPayload} SettingButtonPayload */

class EasterEgg {
	/** @type {HTMLAudioElement | undefined} */
	#audioNode

	/** @type {HTMLButtonElement | undefined} */
	#easterEggButtonNode

	/** @type {HTMLElement | undefined} */
	#easterEggContainerNode

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

	/** @type {(payload: SettingButtonPayload) => HTMLButtonElement} */
	#onSettingButtonAppend

	/**
	 * @param {{
	 * 	onNotificationAdd: (payload: ToastMessagePayload) => void
	 * 	onSettingButtonAppend: (
	 * 		payload: SettingButtonPayload,
	 * 	) => HTMLButtonElement
	 * }} constructor
	 */
	constructor({ onNotificationAdd, onSettingButtonAppend }) {
		this.#onNotificationAdd = onNotificationAdd
		this.#onSettingButtonAppend = onSettingButtonAppend

		this.#easterEggContainerNode = undefined
		this.#easterEggButtonNode = undefined
		this.#audioNode = undefined

		this.#handleEasterEggClick = this.#clickEasterEggClickHandler.bind(this)
		this.#handleSettingButtonClick =
			this.#clickSettingButtonHandler.bind(this)
		this.#handleWindowResize = initDebounce(
			this.#resizeWindowHandler,
			RESIZE_DELAY,
		)
	}

	/** @returns {void} */
	#clickEasterEggClickHandler() {
		let easterEggContainerNode = /** @type {HTMLElement} */ (
			this.#easterEggContainerNode
		)

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

		easterEggContainerNode.remove()
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
		let easterEggContainerNode = /** @type {HTMLElement} */ (
			this.#easterEggContainerNode
		)
		let { x, y } = getNodeRandomCoords(easterEggContainerNode)

		easterEggContainerNode.style.top = `${y}px`
		easterEggContainerNode.style.left = `${x}px`
	}

	/** @returns {void} */
	init() {
		this.#easterEggContainerNode = /** @type {HTMLElement} */ (
			document.querySelector(`.not-easter-egg`)
		)
		this.#easterEggButtonNode = /** @type {HTMLButtonElement} */ (
			document.querySelector(`.not-easter-egg__button`)
		)

		this.#setRandomPosition()

		this.#initListeners()
	}
}

export { EasterEgg }
