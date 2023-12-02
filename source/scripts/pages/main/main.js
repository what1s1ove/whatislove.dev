import { Toast } from '~/libs/components/components.js'

import {
	EasterEgg,
	Navigation,
	Settings,
	Timeline,
	TimelineForm,
} from './libs/components/components.js'

/** @typedef {import('~/pages/main/libs/types/types').SettingButtonPayload} SettingButtonPayload */
/** @typedef {import('~/libs/types/types').ToastMessagePayload} ToastMessagePayload */
/** @typedef {import('~/libs/packages/storage/storage').Storage} Storage */
/** @typedef {import('~/packages/timeline/timeline').TimelineApi} TimelineApi */

class Main {
	/** @type {EasterEgg} */
	#easterEggComponent

	/** @type {HTMLElement | undefined} */
	#easterEggNode

	/** @type {(message: ToastMessagePayload) => void} */
	#handleNotificationAdd

	/** @type {(settings: SettingButtonPayload) => HTMLButtonElement} */
	#handleSettingButtonAppend

	/** @type {HTMLElement | undefined} */
	#headerNode

	/** @type {Navigation} */
	#navigationComponent

	/** @type {HTMLElement | undefined} */
	#settingListNode

	/** @type {Settings} */
	#settingsComponent

	/** @type {Timeline} */
	#timelineComponent

	/** @type {TimelineForm} */
	#timelineFormComponent

	/** @type {HTMLFormElement | undefined} */
	#timelineFormNode

	/** @type {HTMLElement | undefined} */
	#timelineNode

	/** @type {Toast} */
	#toastComponent

	/** @type {HTMLElement | undefined} */
	#toastNode

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
		this.#timelineFormComponent = new TimelineForm({
			timelineApi,
		})

		this.#toastNode = undefined
		this.#settingListNode = undefined
		this.#headerNode = undefined
		this.#timelineNode = undefined
		this.#easterEggNode = undefined
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
		this.#toastNode = /** @type {HTMLElement | undefined} */ (
			document.querySelector(`.toast`) ?? undefined
		)
		this.#settingListNode = /** @type {HTMLElement | undefined} */ (
			document.querySelector(`.settings`) ?? undefined
		)
		this.#headerNode = /** @type {HTMLElement | undefined} */ (
			document.querySelector(`.header`) ?? undefined
		)
		this.#timelineNode = /** @type {HTMLElement | undefined} */ (
			document.querySelector(`.timeline`) ?? undefined
		)
		this.#easterEggNode = /** @type {HTMLElement | undefined} */ (
			document.querySelector(`.not-easter-egg`) ?? undefined
		)
		this.#timelineFormNode = /** @type {HTMLFormElement | undefined} */ (
			document.querySelector(`form[name="timeline"]`) ?? undefined
		)

		if (this.#toastNode) {
			this.#toastComponent.init(this.#toastNode)
		}

		if (this.#settingListNode) {
			this.#settingsComponent.init(this.#settingListNode)
		}

		if (this.#headerNode) {
			this.#navigationComponent.init(this.#headerNode)
		}

		if (this.#timelineNode) {
			this.#timelineComponent.init(this.#timelineNode)
		}

		if (this.#easterEggNode) {
			this.#easterEggComponent.init(this.#easterEggNode)
		}

		if (this.#timelineFormNode) {
			this.#timelineFormComponent.init(this.#timelineFormNode)
		}
	}
}

export { Main }
