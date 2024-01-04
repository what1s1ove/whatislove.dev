import { getCustomAttributeName } from '~/libs/helpers/helpers.js'
import { Storage } from '~/libs/packages/storage/storage.js'
import { ValuesOf } from '~/libs/types/types.js'
import { SettingName } from '~/pages/main/libs/enums/enums.js'
import { SettingsButtonPayload } from '~/pages/main/libs/types/types.js'

import { Control, Switch } from './libs/components/components.js'
import { getSettingItemElement } from './libs/helpers/helpers.js'

let RESULT_VALUE = /** @type {const} */ (`auto`)

class Settings {
	/** @type {(name: ValuesOf<typeof SettingName>, value: string) => void} */
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
	 * @param {ValuesOf<typeof SettingName>} name
	 * @param {string} value
	 * @returns {void}
	 */
	#changeControlHandler(name, value) {
		if (value === RESULT_VALUE) {
			this.#removeSettingAttr(name)

			this.#storage.removeItem(name)
			return
		}

		this.#setSettingAttr(name, value)

		this.#storage.setItem(name, value)
	}

	/**
	 * @param {ValuesOf<typeof SettingName>} name
	 * @returns {void}
	 */
	#initControl(name) {
		let defaultValue = this.#setInitialSettingAttr(name)

		new Control({
			defaultValue,
			name,
			onChange: this.#handleControlChange,
		}).init(
			/** @type {HTMLFieldSetElement} */ (
				document.querySelector(`.settings__item-fieldset--${name}`)
			),
		)
	}

	/**
	 * @param {ValuesOf<typeof SettingName>} name
	 * @returns {void}
	 */
	#removeSettingAttr(name) {
		document.documentElement.removeAttribute(getCustomAttributeName(name))
	}

	/**
	 * @param {ValuesOf<typeof SettingName>} name
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
	 * @param {ValuesOf<typeof SettingName>} name
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
	 * @param {SettingsButtonPayload} settings
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
		}).init(
			/** @type {HTMLButtonElement} */ (
				settingListNode.querySelector(`.settings__item-switch--${name}`)
			),
		)
	}

	/**
	 * @param {HTMLElement} settingListNode
	 * @returns {void}
	 */
	init(settingListNode) {
		this.#settingListNode = settingListNode

		this.#initControl(SettingName.THEME)
		this.#initControl(SettingName.MOTION)
	}
}

export { Settings }
