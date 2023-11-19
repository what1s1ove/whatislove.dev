import { type TimelineType, type TimelineSkillType } from '../enums/enums.js'

type Timeline = {
	id: string
	date: string
	desc: string
	endDate: string
	link: string
	linkDesc: string
	origin: string
	originDesc: string
	title: string
	skillType: (typeof TimelineSkillType)[keyof typeof TimelineSkillType]
	type: (typeof TimelineType)[keyof typeof TimelineType]
}

export { type Timeline }
