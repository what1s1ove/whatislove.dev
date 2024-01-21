import { ValuesOf } from '~/libs/types/types.js'
import { SettingName } from '~/pages/main/libs/enums/enums.js'

class Control {
	/** @type {HTMLFieldSetElement | undefined} */
	#controlNode

	/** @type {string | null} */
	#defaultValue

	/** @type {(event_: Event) => void} */
	#handleSwitchChange

	/** @type {ValuesOf<typeof SettingName>} */
	#name

	/** @type {(name: ValuesOf<typeof SettingName>, value: string) => void} */
	#onChange

	/**
	 * @param {{
	 * 	defaultValue: string | null
	 * 	name: ValuesOf<typeof SettingName>
	 * 	onChange: (name: ValuesOf<typeof SettingName>, value: string) => void
	 * }} constructor
	 */
	constructor({ defaultValue, name, onChange }) {
		this.#name = name
		this.#onChange = onChange
		this.#defaultValue = defaultValue

		this.#controlNode = undefined

		this.#handleSwitchChange = this.#switchChangeHandler.bind(this)
	}

	/** @returns {void} */
	#initListeners() {
		let controlNode = /** @type {HTMLFieldSetElement} */ (this.#controlNode)

		controlNode.addEventListener(`change`, this.#handleSwitchChange)
	}

	/** @returns {void} */
	#setInitialValue() {
		let controlNode = /** @type {HTMLFieldSetElement} */ (this.#controlNode)

		let inputNodes = /** @type {NodeListOf<HTMLInputElement>} */ (
			controlNode.querySelectorAll(`input[name="${this.#name}"]`)
		)

		for (let it of inputNodes) {
			let isChecked = it.value === this.#defaultValue

			if (isChecked) {
				it.checked = isChecked
			}
		}
	}

	/**
	 * @param {Event} event_
	 * @returns {void}
	 */
	#switchChangeHandler({ target }) {
		this.#onChange(
			this.#name,
			/** @type {HTMLInputElement} */ (target).value,
		)
	}

	/**
	 * @param {HTMLFieldSetElement} controlNode
	 * @returns {void}
	 */
	init(controlNode) {
		this.#controlNode = controlNode

		this.#setInitialValue()

		this.#initListeners()
	}
}

export { Control }
