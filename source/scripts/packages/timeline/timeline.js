import { AppConfig } from '~/libs/enums/enums.js'
import { getServerApiUrl } from '~/libs/helpers/helpers.js'
import { http } from '~/libs/packages/http/http.js'

import { TimelineApi } from './timeline-api.js'

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
export {
	Timeline,
	TimelineCreatePayload,
	TimelineFilter,
} from './libs/types/types.js'
export { TimelineApi } from './timeline-api.js'
