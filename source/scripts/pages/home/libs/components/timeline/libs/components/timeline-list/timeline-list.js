import { getTimelineTemplates } from './libs/helpers/helpers.js'

/** @typedef {import('~/packages/timeline/timeline').Timeline} Timeline */

class TimelineList {
	constructor() {
		/** @type {HTMLElement | undefined} */
		this._listNode = undefined
	}

	/** @returns {void} */
	init() {
		this._listNode = /** @type {HTMLElement} */ (
			document.querySelector(`.timeline__list`)
		)
	}

	/**
	 * @param {Timeline[]} timelines
	 * @returns {void}
	 */
	renderTimelines(timelines) {
		let listNode = /** @type {HTMLElement} */ (this._listNode)

		listNode.innerHTML = getTimelineTemplates(timelines)
	}
}

export { TimelineList }
