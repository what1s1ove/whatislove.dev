import { fillSelectOptions, getFormPayload } from '~/libs/helpers/helpers.js'
import {
	TimelineApi,
	TimelineCreatePayload,
	TimelineType,
} from '~/modules/timeline/timeline.js'

import { getTransformedTimeline } from './helpers/helpers.js'

let timelineTypes = Object.values(TimelineType)

class TimelineForm {
	/** @type {(event_: SubmitEvent) => Promise<void>} */
	#handleSubmit

	/** @type {TimelineApi} */
	#timelineApi

	/** @type {HTMLFormElement | undefined} */
	#timelineFormNode

	/**
	 * @param {{
	 * 	timelineApi: TimelineApi
	 * }} constructor
	 */
	constructor({ timelineApi }) {
		this.#timelineApi = timelineApi

		this.#timelineFormNode = undefined

		this.#handleSubmit = this.#submitHandler.bind(this)
	}

	/** @returns {void} */
	#initListeners() {
		let timelineFormNode = /** @type {HTMLFormElement} */ (
			this.#timelineFormNode
		)

		timelineFormNode.addEventListener(`submit`, this.#handleSubmit)
	}

	/** @returns {void} */
	#initSelects() {
		let timelineFormNode = /** @type {HTMLFormElement} */ (
			this.#timelineFormNode
		)

		fillSelectOptions(
			/** @type {HTMLSelectElement} */ (
				timelineFormNode.querySelector(`select[name="type"]`)
			),
			timelineTypes,
		)
	}

	/**
	 * @param {SubmitEvent} event_
	 * @returns {Promise<void>}
	 */
	async #submitHandler(event_) {
		event_.preventDefault()

		let timelineFormNode = /** @type {HTMLFormElement} */ (
			this.#timelineFormNode
		)
		let formValues = /** @type {TimelineCreatePayload} */ (
			getFormPayload(timelineFormNode)
		)

		await this.#timelineApi.saveTimeline(getTransformedTimeline(formValues))

		timelineFormNode.reset()
	}

	/**
	 * @param {HTMLFormElement} timelineFormNode
	 * @returns {void}
	 */
	init(timelineFormNode) {
		this.#timelineFormNode = timelineFormNode

		this.#initSelects()

		this.#initListeners()
	}
}

export { TimelineForm }
