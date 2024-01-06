import { ValuesOf } from '~/libs/types/types.js'

import { TimelineSkillType, TimelineType } from '../enums/enums.js'

/**
 * @typedef {{
 * 	skillTypes: Record<ValuesOf<typeof TimelineSkillType>, boolean>
 * 	types: Record<ValuesOf<typeof TimelineType>, boolean>
 * }}
 */
let TimelineFilter

export { TimelineFilter }
