/** @typedef {import('~/packages/timeline/timeline').Timeline} Timeline */
/** @typedef {import('~/packages/timeline/timeline').TimelineFilter} TimelineFilter */

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
