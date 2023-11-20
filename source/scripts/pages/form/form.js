import { fillSelectOptions, getFormValues } from '~/libs/helpers/helpers.js'
import {
	TimelineSkillType,
	TimelineType,
} from '~/packages/timeline/timeline.js'

import { getTransformedTimeline } from './helpers/helpers.js'

/** @typedef {import('~/packages/timeline/timeline').TimelineApi} TimelineApi */
/** @typedef {import('~/packages/timeline/timeline').TimelineCreatePayload} TimelineCreatePayload */

let timelineSkillTypes = Object.values(TimelineSkillType)
let timelineTypes = Object.values(TimelineType)

class Form {
	/** @type {HTMLFormElement | undefined} */
	#formNode

	/** @type {(event_: SubmitEvent) => Promise<void>} */
	#handleSubmit

	/** @type {TimelineApi} */
	#timelineApi

	/**
	 * @param {{
	 * 	timelineApi: TimelineApi
	 * }} constructor
	 */
	constructor({ timelineApi }) {
		this.#timelineApi = timelineApi

		this.#formNode = undefined

		this.#handleSubmit = this.#submitHandler.bind(this)
	}

	/** @type {() => void} */
	#initListeners() {
		let formNode = /** @type {HTMLFormElement} */ (this.#formNode)

		formNode.addEventListener(`submit`, this.#handleSubmit)
	}

	/** @returns {void} */
	#initSelects() {
		let formNode = /** @type {HTMLFormElement} */ (this.#formNode)

		fillSelectOptions(
			/** @type {HTMLSelectElement} */ (
				formNode.querySelector(`select[name="skillType"]`)
			),
			timelineSkillTypes,
		)
		fillSelectOptions(
			/** @type {HTMLSelectElement} */ (
				formNode.querySelector(`select[name="type"]`)
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

		let formNode = /** @type {HTMLFormElement} */ (this.#formNode)
		let formValues = /** @type {TimelineCreatePayload} */ (
			getFormValues(formNode)
		)

		await this.#timelineApi.saveTimeline(getTransformedTimeline(formValues))

		formNode.reset()
	}

	/** @returns {void} */
	init() {
		this.#formNode = /** @type {HTMLFormElement} */ (
			document.querySelector(`form[name="timeline"]`)
		)

		this.#initSelects()

		this.#initListeners()
	}
}

export { Form }
