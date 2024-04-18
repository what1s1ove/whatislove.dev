import { Timeline } from '~/modules/timeline/timeline.js'

import { getTimelineTemplates } from './libs/helpers/helpers.js'

class TimelineList {
	/** @type {HTMLElement | undefined} */
	#listNode

	constructor() {
		this.#listNode = undefined
	}

	/** @returns {void} */
	init() {
		this.#listNode = /** @type {HTMLElement} */ (
			document.querySelector(`.experience__timeline`)
		)
	}

	/**
	 * @param {Timeline[]} timelines
	 * @returns {void}
	 */
	renderTimelines(timelines) {
		let listNode = /** @type {HTMLElement} */ (this.#listNode)

		listNode.innerHTML = getTimelineTemplates(timelines)
	}
}

export { TimelineList }
