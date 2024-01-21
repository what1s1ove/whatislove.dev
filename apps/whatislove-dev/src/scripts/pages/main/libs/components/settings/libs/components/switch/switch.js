import { ValuesOf } from '~/libs/types/types.js'
import { SettingName } from '~/pages/main/libs/enums/enums.js'

class Switch {
	/** @type {(event_: Event) => void} */
	#handleSwitchClick

	/** @type {boolean} */
	#isDefaultChecked

	/** @type {ValuesOf<typeof SettingName>} */
	#name

	/**
	 * @type {(
	 * 	name: ValuesOf<typeof SettingName>,
	 * 	isChecked: boolean,
	 * ) => void}
	 */
	#onClick

	/** @type {HTMLButtonElement | undefined} */
	#switchNode

	/**
	 * @param {{
	 * 	isDefaultChecked: boolean
	 * 	name: ValuesOf<typeof SettingName>
	 * 	onClick: (
	 * 		name: ValuesOf<typeof SettingName>,
	 * 		isChecked: boolean,
	 * 	) => void
	 * }} constructor
	 */
	constructor({ isDefaultChecked, name, onClick }) {
		this.#name = name
		this.#isDefaultChecked = isDefaultChecked
		this.#onClick = onClick

		this.#switchNode = undefined

		this.#handleSwitchClick = this.#clickSwitchHandler.bind(this)
	}

	/**
	 * @param {Event} event_
	 * @returns {void}
	 */
	#clickSwitchHandler({ target }) {
		let isChecked =
			/** @type {HTMLElement} */ (target).ariaChecked === `true`

		this.#isChecked = !isChecked

		this.#onClick(this.#name, !isChecked)
	}

	/** @returns {void} */
	#initListeners() {
		let switchNode = /** @type {HTMLElement} */ (this.#switchNode)

		switchNode.addEventListener(`click`, this.#handleSwitchClick)
	}

	/**
	 * @param {boolean} isChecked
	 * @returns {void}
	 */
	set #isChecked(isChecked) {
		let switchNode = /** @type {HTMLElement} */ (this.#switchNode)

		switchNode.ariaChecked = isChecked.toString()
	}

	/**
	 * @param {HTMLButtonElement} switchNode
	 * @returns {HTMLButtonElement}
	 */
	init(switchNode) {
		this.#switchNode = switchNode

		this.#isChecked = this.#isDefaultChecked

		this.#initListeners()

		this.#onClick(this.#name, this.#isDefaultChecked)

		return this.#switchNode
	}
}

export { Switch }
