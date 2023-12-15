import { fillSelectOptions, getFormValues } from '~/libs/helpers/helpers.js'
import {
	TimelineSkillType,
	TimelineType,
} from '~/packages/timeline/timeline.js'

import { getTransformedTimeline } from './helpers/helpers.js'

/** @typedef {import('~/packages/timeline/timeline.js').TimelineApi} TimelineApi */
/** @typedef {import('~/packages/timeline/timeline.js').TimelineCreatePayload} TimelineCreatePayload */

let timelineSkillTypes = Object.values(TimelineSkillType)
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
				timelineFormNode.querySelector(`select[name="skillType"]`)
			),
			timelineSkillTypes,
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
			getFormValues(timelineFormNode)
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
