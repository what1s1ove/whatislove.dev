import { Timeline, TimelineFilter } from '~/packages/timeline/timeline.js'

import { checkIsTimelineSuit } from '../check-is-timeline-suit/check-is-timeline-suit.helper.js'

/**
 * @param {Timeline[]} timelines
 * @param {TimelineFilter} filterValues
 * @returns {Timeline[]}
 */
let getSuitTimelines = (timelines, filterValues) => {
	return timelines.filter((timeline) => {
		return checkIsTimelineSuit(timeline, filterValues)
	})
}

export { getSuitTimelines }
