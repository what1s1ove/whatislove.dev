import { getFormValues, initDebounce } from '~/libs/helpers/helpers.js'

import { DEBOUNCE_DELAY } from './libs/constants/constants.js'

/** @typedef {import('~/packages/timeline/timeline.js').TimelineFilter} TimelineFilter */

class TimelineForm {
	/** @type {HTMLFormElement | undefined} */
	#formNode

	/** @type {() => void} */
	#handleFormChange

	/** @type {(formValues: TimelineFilter) => void} */
	#onChange

	/**
	 * @param {{
	 * 	onChange: (formValues: TimelineFilter) => void
	 * }} constructor
	 */
	constructor({ onChange }) {
		this.#onChange = onChange

		this.#formNode = undefined

		this.#handleFormChange = this.#changeFormHandler.bind(this)
	}

	/** @returns {void} */
	#changeFormHandler() {
		this.#onChange(this.formValues)
	}

	/** @returns {void} */
	#initListeners() {
		let formNode = /** @type {HTMLFormElement} */ (this.#formNode)

		formNode.addEventListener(
			`change`,
			initDebounce(this.#handleFormChange, DEBOUNCE_DELAY),
		)
	}

	/** @returns {void} */
	init() {
		this.#formNode = /** @type {HTMLFormElement} */ (
			document.querySelector(`.timeline__filter`)
		)

		this.#initListeners()
	}

	/** @returns {TimelineFilter} */
	get formValues() {
		return getFormValues(/** @type {HTMLFormElement} */ (this.#formNode))
	}
}

export { TimelineForm }
