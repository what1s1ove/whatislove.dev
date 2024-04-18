import { Storage } from '~/libs/modules/storage/storage.js'
import { ValuesOf } from '~/libs/types/types.js'
import { SettingName } from '~/pages/main/libs/enums/enums.js'

import { Control } from './libs/components/components.js'

let RESET_VALUE = /** @type {const} */ (`auto`)

class Settings {
	/** @type {(name: ValuesOf<typeof SettingName>, value: string) => void} */
	#handleControlChange

	/** @type {Storage} */
	#storage

	/**
	 * @param {{
	 * 	storage: Storage
	 * }} constructor
	 */
	constructor({ storage }) {
		this.#storage = storage

		this.#handleControlChange = this.#changeControlHandler.bind(this)
	}

	/**
	 * @param {ValuesOf<typeof SettingName>} name
	 * @param {string} value
	 * @returns {void}
	 */
	#changeControlHandler(name, value) {
		if (value === RESET_VALUE) {
			this.#storage.removeItem(name)
			return
		}

		this.#storage.setItem(name, value)
	}

	/**
	 * @param {ValuesOf<typeof SettingName>} name
	 * @returns {void}
	 */
	#initControl(name) {
		let defaultValue = this.#storage.getItem(name)

		new Control({
			defaultValue,
			name,
			onChange: this.#handleControlChange,
		}).init(
			/** @type {HTMLFieldSetElement} */ (
				document.querySelector(`.settings--${name}`)
			),
		)
	}

	/** @returns {void} */
	init() {
		this.#initControl(SettingName.THEME)
	}
}

export { Settings }
