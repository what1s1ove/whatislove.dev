import { type TimelineType, type SkillType } from '~/common/enums/enums.js'

type TimelineFilter = {
  skillTypes: Record<(typeof SkillType)[keyof typeof SkillType], boolean>
  types: Record<(typeof TimelineType)[keyof typeof TimelineType], boolean>
}

export { type TimelineFilter }
