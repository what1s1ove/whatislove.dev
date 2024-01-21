import { ApiPath, ContentType } from '~/libs/enums/enums.js'
import { Http, HttpMethod } from '~/libs/modules/http/http.js'
import { ValuesOf } from '~/libs/types/types.js'

import { TimelineApiPath } from './libs/enums/enums.js'
import { Timeline, TimelineCreatePayload } from './libs/types/types.js'

class TimelineApi {
	/** @type {ValuesOf<typeof ApiPath>} */
	#apiPath

	/** @type {string} */
	#baseUrl

	/** @type {string} */
	#filesApiPath

	/** @type {Http} */
	#http

	/**
	 * @param {{
	 * 	baseUrl: string
	 * 	filesApiPath: string
	 * 	http: Http
	 * }} config
	 */
	constructor({ baseUrl, filesApiPath, http }) {
		this.#http = http
		this.#baseUrl = baseUrl
		this.#filesApiPath = filesApiPath
		this.#apiPath = ApiPath.TIMELINE
	}

	/**
	 * @param {string} path
	 * @returns {string}
	 */
	#getApiUrl(path) {
		return `${this.#baseUrl}${this.#apiPath}${path}`
	}

	/**
	 * @param {string} path
	 * @returns {string}
	 */
	#getFileUrl(path) {
		return `${this.#filesApiPath}${path}.json`
	}

	/** @returns {Promise<Timeline[]>} */
	getTimelines() {
		return this.#http.load(this.#getFileUrl(this.#apiPath), {
			method: HttpMethod.GET,
		})
	}

	/**
	 * @param {TimelineCreatePayload} payload
	 * @returns {Promise<Timeline>}
	 */
	saveTimeline(payload) {
		return this.#http.load(this.#getApiUrl(TimelineApiPath.ROOT), {
			contentType: ContentType.JSON,
			method: HttpMethod.POST,
			payload,
		})
	}
}

export { TimelineApi }
