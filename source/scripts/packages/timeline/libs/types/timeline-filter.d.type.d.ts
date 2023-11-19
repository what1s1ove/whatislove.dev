import { type TimelineType, type TimelineSkillType } from '../enums/enums.js'

type TimelineFilter = {
	skillTypes: Record<
		(typeof TimelineSkillType)[keyof typeof TimelineSkillType],
		boolean
	>
	types: Record<(typeof TimelineType)[keyof typeof TimelineType], boolean>
}

export { type TimelineFilter }
