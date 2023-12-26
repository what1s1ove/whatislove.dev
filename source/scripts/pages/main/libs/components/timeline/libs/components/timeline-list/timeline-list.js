import { Timeline } from '~/packages/timeline/timeline.js'

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
			document.querySelector(`.timeline__list`)
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
