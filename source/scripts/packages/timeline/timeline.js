import { AppConfig } from '~/libs/enums/enums.js'
import { getServerApiUrl } from '~/libs/helpers/helpers.js'
import { http } from '~/libs/packages/http/http.js'

import { TimelineApi } from './timeline-api.js'

/** @typedef {import('./libs/types/types').Timeline} Timeline */
/** @typedef {import('./libs/types/types').TimelineCreatePayload} TimelineCreatePayload */
/** @typedef {import('./libs/types/types').TimelineFilter} TimelineFilter */

let timelineApi = new TimelineApi({
	baseUrl: getServerApiUrl({
		host: AppConfig.SERVER_HOST,
		port: AppConfig.SERVER_PORT,
	}),
	filesApiPath: AppConfig.FILES_API_PATH,
	http,
})

export { timelineApi }
export { TimelineSkillType, TimelineType } from './libs/enums/enums.js'
export { TimelineApi } from './timeline-api.js'
