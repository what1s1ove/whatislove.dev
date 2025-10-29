import { getFormPayload, initDebounce } from '~/libs/helpers/helpers.js'
import { TimelineFilter } from '~/modules/timeline/timeline.js'

import { DEBOUNCE_DELAY } from './libs/constants/constants.js'

class TimelineForm {
	/** @returns {TimelineFilter} */
	get formValues() {
		return getFormPayload(/** @type {HTMLFormElement} */ (this.#formNode))
	}

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
	init() {
		this.#formNode = /** @type {HTMLFormElement} */ (
			document.querySelector(`.experience__form`)
		)

		this.#initListeners()
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
}

export { TimelineForm }
