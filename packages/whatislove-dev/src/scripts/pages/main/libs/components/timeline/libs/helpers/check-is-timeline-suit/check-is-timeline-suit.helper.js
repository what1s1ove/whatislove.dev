import { Timeline, TimelineFilter } from '~/modules/timeline/timeline.js'

/**
 * @param {Timeline} timelineItem
 * @param {TimelineFilter} filterValues
 * @returns {boolean}
 */
let checkIsTimelineSuit = (timelineItem, filterValues) => {
	let hasSkillType = filterValues.skillTypes[timelineItem.skillType]
	let hasType = filterValues.types[timelineItem.type]

	return hasSkillType && hasType
}

export { checkIsTimelineSuit }
