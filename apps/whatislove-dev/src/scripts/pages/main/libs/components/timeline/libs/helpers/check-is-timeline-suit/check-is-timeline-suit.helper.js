import { Timeline, TimelineFilter } from '~/modules/timeline/timeline.js'

/**
 * @param {Timeline} timelineItem
 * @param {TimelineFilter} filterValues
 * @returns {boolean}
 */
let checkIsTimelineSuit = (timelineItem, filterValues) => {
	return timelineItem.type === filterValues.type
}

export { checkIsTimelineSuit }
