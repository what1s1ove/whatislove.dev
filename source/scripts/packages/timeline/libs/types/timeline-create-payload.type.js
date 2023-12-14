/** @typedef {typeof import('../enums/enums.js').TimelineSkillType} TimelineSkillType */
/** @typedef {typeof import('../enums/enums.js').TimelineType} TimelineType */

/**
 * @typedef {{
 * 	date: string
 * 	desc: string
 * 	endDate: string
 * 	link: string
 * 	linkDesc: string
 * 	origin: string
 * 	originDesc: string
 * 	title: string
 * 	skillType: TimelineSkillType[keyof TimelineSkillType]
 * 	type: TimelineType[keyof TimelineType]
 * }} TimelineCreatePayload
 */

export {}
