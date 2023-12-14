/** @typedef {import('~/packages/timeline/timeline.js').Timeline} Timeline */
/** @typedef {import('~/packages/timeline/timeline.js').TimelineFilter} TimelineFilter */

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
