import { ValuesOf } from '~/libs/types/types.js'

import { TimelineType } from '../enums/enums.js'

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
 * 	type: ValuesOf<typeof TimelineType>
 * }}
 */
let TimelineCreatePayload

export { TimelineCreatePayload }
