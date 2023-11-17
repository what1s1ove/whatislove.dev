import { type TimelineType, type SkillType } from '~/common/enums/enums.js'

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
  skillType: (typeof SkillType)[keyof typeof SkillType]
  type: (typeof TimelineType)[keyof typeof TimelineType]
}

export { type Timeline }
