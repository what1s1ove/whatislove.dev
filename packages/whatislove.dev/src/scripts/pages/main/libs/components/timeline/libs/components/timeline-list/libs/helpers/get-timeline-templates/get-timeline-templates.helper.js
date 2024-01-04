import { Timeline } from '~/packages/timeline/timeline.js'

import { getTimelineTemplate } from '../get-timeline-template/get-timeline-template.helper.js'

/**
 * @param {Timeline[]} timelines
 * @returns {string}
 */
let getTimelineTemplates = (timelines) => {
	let timelineTemplates = ``

	for (let timeline of timelines) {
		timelineTemplates += getTimelineTemplate(timeline)
	}

	return timelineTemplates
}

export { getTimelineTemplates }
