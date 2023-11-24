/** @typedef {typeof import('~/pages/main/libs/enums/enums').SettingName} SettingName */

class Switch {
	/** @type {(event_: Event) => void} */
	#handleSwitchClick

	/** @type {boolean} */
	#isDefaultChecked

	/** @type {SettingName[keyof SettingName]} */
	#name

	/**
	 * @type {(
	 * 	name: SettingName[keyof SettingName],
	 * 	isChecked: boolean,
	 * ) => void}
	 */
	#onClick

	/** @type {HTMLButtonElement | undefined} */
	#switchNode

	/**
	 * @param {{
	 * 	isDefaultChecked: boolean
	 * 	name: SettingName[keyof SettingName]
	 * 	onClick: (
	 * 		name: SettingName[keyof SettingName],
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
