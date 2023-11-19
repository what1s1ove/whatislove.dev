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
	/**
	 * @param {{
	 * 	timelineApi: TimelineApi
	 * }} constructor
	 */
	constructor({ timelineApi }) {
		this._timelineApi = timelineApi

		/** @type {HTMLFormElement | undefined} */
		this._formNode = undefined

		this._handleSubmit = this._handleSubmit.bind(this)
	}

	/**
	 * @param {SubmitEvent} event_
	 * @returns {Promise<void>}
	 */
	async _handleSubmit(event_) {
		event_.preventDefault()

		let formNode = /** @type {HTMLFormElement} */ (this._formNode)
		let formValues = /** @type {TimelineCreatePayload} */ (
			getFormValues(formNode)
		)

		await this._timelineApi.saveTimeline(getTransformedTimeline(formValues))

		formNode.reset()
	}

	/** @returns {void} */
	_initListeners() {
		let formNode = /** @type {HTMLFormElement} */ (this._formNode)

		formNode.addEventListener(`submit`, this._handleSubmit)
	}

	/** @returns {void} */
	_initSelects() {
		let formNode = /** @type {HTMLFormElement} */ (this._formNode)

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

	/** @returns {void} */
	init() {
		this._formNode = /** @type {HTMLFormElement} */ (
			document.querySelector(`form[name="timeline"]`)
		)

		this._initSelects()

		this._initListeners()
	}
}

export { Form }
