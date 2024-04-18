import { ValuesOf } from '~/libs/types/types.js'

import { TimelineType } from '../enums/enums.js'

/**
 * @typedef {{
 * 	type: ValuesOf<typeof TimelineType>
 * }}
 */
let TimelineFilter

export { TimelineFilter }
