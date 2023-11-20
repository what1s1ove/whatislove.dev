import { getCustomAttributeName } from '~/libs/helpers/helpers.js'
import { SettingName } from '~/pages/home/libs/enums/enums.js'

import { Control, Switch } from './libs/components/components.js'
import { getSettingItemElement } from './libs/helpers/helpers.js'

let RESULT_VALUE = /** @type {const} */ (`auto`)

/** @typedef {import('~/pages/home/libs/types/types').SettingButtonPayload} SettingButtonPayload */
/** @typedef {import('~/libs/packages/storage/storage').Storage} Storage */

class Settings {
	/**
	 * @type {(
	 * 	name: (typeof SettingName)[keyof typeof SettingName],
	 * 	value: string,
	 * ) => void}
	 */
	#handleControlChange

	/** @type {HTMLElement | undefined} */
	#settingListNode

	/** @type {Storage} */
	#storage

	/**
	 * @param {{
	 * 	storage: Storage
	 * }} constructor
	 */
	constructor({ storage }) {
		this.#storage = storage

		this.#settingListNode = undefined

		this.#handleControlChange = this.#changeControlHandler.bind(this)
	}

	/**
	 * @param {(typeof SettingName)[keyof typeof SettingName]} name
	 * @param {string} value
	 * @returns {void}
	 */
	#changeControlHandler(name, value) {
		if (value === RESULT_VALUE) {
			this.#removeSettingAttr(name)

			return this.#storage.removeItem(name)
		}

		this.#setSettingAttr(name, value)

		this.#storage.setItem(name, value)
	}

	/**
	 * @param {(typeof SettingName)[keyof typeof SettingName]} name
	 * @returns {void}
	 */
	#initControl(name) {
		let defaultValue = this.#setInitialSettingAttr(name)

		new Control({
			defaultValue,
			name,
			onChange: this.#handleControlChange,
		}).init(`.settings__item-fieldset--${name}`)
	}

	/**
	 * @param {(typeof SettingName)[keyof typeof SettingName]} name
	 * @returns {void}
	 */
	#removeSettingAttr(name) {
		document.documentElement.removeAttribute(getCustomAttributeName(name))
	}

	/**
	 * @param {(typeof SettingName)[keyof typeof SettingName]} name
	 * @returns {string | null}
	 */
	#setInitialSettingAttr(name) {
		let value = this.#storage.getItem(name)
		let hasValue = Boolean(value)

		if (hasValue) {
			this.#setSettingAttr(name, /** @type {string} */ (value))
		}

		return value
	}

	/**
	 * @param {(typeof SettingName)[keyof typeof SettingName]} name
	 * @param {string} value
	 * @returns {void}
	 */
	#setSettingAttr(name, value) {
		document.documentElement.setAttribute(
			getCustomAttributeName(name),
			value,
		)
	}

	/**
	 * @param {SettingButtonPayload} settings
	 * @returns {HTMLButtonElement}
	 */
	appendNewButton(settings) {
		let { isDefaultChecked, label, name, onClick } = settings

		let newSettingItemNode = getSettingItemElement({ label, name })
		let settingListNode = /** @type {HTMLElement} */ (this.#settingListNode)

		settingListNode.prepend(newSettingItemNode)

		return new Switch({
			isDefaultChecked,
			name,
			onClick,
		}).init(`.settings__item-switch--${name}`)
	}

	/** @returns {void} */
	init() {
		this.#settingListNode = /** @type {HTMLElement} */ (
			document.querySelector(`.settings`)
		)

		this.#initControl(SettingName.THEME)
		this.#initControl(SettingName.MOTION)
	}
}

export { Settings }
