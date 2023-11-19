/** @typedef {typeof import('~/pages/home/libs/enums/enums').SettingName} SettingName */

class Control {
	/**
	 * @param {{
	 * 	defaultValue: string | null
	 * 	name: SettingName[keyof SettingName]
	 * 	onChange: (
	 * 		name: SettingName[keyof SettingName],
	 * 		value: string,
	 * 	) => void
	 * }} constructor
	 */
	constructor({ defaultValue, name, onChange }) {
		this._name = name
		this._onChange = onChange
		this._defaultValue = defaultValue

		/** @type {HTMLFieldSetElement | undefined} */
		this._controlNode = undefined

		this._handleSwitchChange = this._handleSwitchChange.bind(this)
	}

	/**
	 * @param {Event} event_
	 * @returns {void}
	 */
	_handleSwitchChange({ target }) {
		this._onChange(
			this._name,
			/** @type {HTMLInputElement} */ (target).value,
		)
	}

	/** @returns {void} */
	_initListeners() {
		let controlNode = /** @type {HTMLFieldSetElement} */ (this._controlNode)

		controlNode.addEventListener(`change`, this._handleSwitchChange)
	}

	/** @returns {void} */
	_setInitialValue() {
		let controlNode = /** @type {HTMLFieldSetElement} */ (this._controlNode)

		let inputNodes = /** @type {NodeListOf<HTMLInputElement>} */ (
			controlNode.querySelectorAll(`input[name="${this._name}"]`)
		)

		for (let it of inputNodes) {
			let isChecked = it.value === this._defaultValue

			if (isChecked) {
				it.checked = isChecked
			}
		}
	}

	/**
	 * @param {string} selector
	 * @returns {void}
	 */
	init(selector) {
		this._controlNode = /** @type {HTMLFieldSetElement} */ (
			document.querySelector(selector)
		)

		this._setInitialValue()

		this._initListeners()
	}
}

export { Control }
