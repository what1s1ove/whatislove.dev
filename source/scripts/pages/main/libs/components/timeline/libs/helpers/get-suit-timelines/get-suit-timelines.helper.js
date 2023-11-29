import { checkIsTimelineSuit } from '../check-is-timeline-suit/check-is-timeline-suit.helper.js'

/** @typedef {import('~/packages/timeline/timeline').Timeline} Timeline */
/** @typedef {import('~/packages/timeline/timeline').TimelineFilter} TimelineFilter */

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