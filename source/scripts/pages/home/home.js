import { Toast } from '~/libs/components/components.js'

import {
	EasterEgg,
	Navigation,
	Settings,
	Timeline,
} from './libs/components/components.js'

/** @typedef {import('~/pages/home/libs/types/types').SettingButtonPayload} SettingButtonPayload */
/** @typedef {import('~/libs/types/types').ToastMessagePayload} ToastMessagePayload */
/** @typedef {import('~/libs/packages/storage/storage').Storage} Storage */
/** @typedef {import('~/packages/timeline/timeline').TimelineApi} TimelineApi */

class Home {
	/** @type {EasterEgg} */
	#easterEggComponent

	/** @type {(message: ToastMessagePayload) => void} */
	#handleNotificationAdd

	/** @type {(settings: SettingButtonPayload) => HTMLButtonElement} */
	#handleSettingButtonAppend

	/** @type {Navigation} */
	#navigationComponent

	/** @type {Settings} */
	#settingsComponent

	/** @type {Timeline} */
	#timelineComponent

	/** @type {Toast} */
	#toastComponent

	/**
	 * @param {{
	 * 	storage: Storage
	 * 	timelineApi: TimelineApi
	 * }} constructor
	 */
	constructor({ storage, timelineApi }) {
		this.#handleSettingButtonAppend =
			this.#appendSettingButtonHandler.bind(this)
		this.#handleNotificationAdd = this.#addSettingButtonHandler.bind(this)

		this.#settingsComponent = new Settings({
			storage,
		})
		this.#navigationComponent = new Navigation()
		this.#timelineComponent = new Timeline({
			timelineApi,
		})
		this.#easterEggComponent = new EasterEgg({
			onNotificationAdd: this.#handleNotificationAdd,
			onSettingButtonAppend: this.#handleSettingButtonAppend,
		})
		this.#toastComponent = new Toast()
	}

	/**
	 * @param {ToastMessagePayload} message
	 * @returns {void}
	 */
	#addSettingButtonHandler(message) {
		this.#toastComponent.pushMessage(message)
	}

	/**
	 * @param {SettingButtonPayload} settings
	 * @returns {HTMLButtonElement}
	 */
	#appendSettingButtonHandler(settings) {
		return this.#settingsComponent.appendNewButton(settings)
	}

	/** @returns {void} */
	init() {
		this.#toastComponent.init()
		this.#settingsComponent.init()
		this.#navigationComponent.init()
		this.#timelineComponent.init()
		this.#easterEggComponent.init()
	}
}

export { Home }
