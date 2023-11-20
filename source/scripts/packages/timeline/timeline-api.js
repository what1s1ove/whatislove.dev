import { ApiPath, ContentType } from '~/libs/enums/enums.js'
import { HttpMethod } from '~/libs/packages/http/http.js'

import { TimelineApiPath } from './libs/enums/enums.js'

/** @typedef {import('~/libs/packages/http/http').Http} Http */
/** @typedef {import('./libs/types/types').Timeline} Timeline */
/** @typedef {import('./libs/types/types')} TimelineCreatePayload */

class TimelineApi {
	/** @type {(typeof ApiPath)[keyof typeof ApiPath]} */
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
