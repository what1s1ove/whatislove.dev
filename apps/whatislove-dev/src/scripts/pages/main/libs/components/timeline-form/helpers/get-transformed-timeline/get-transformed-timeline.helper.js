import { TimelineCreatePayload } from '~/modules/timeline/timeline.js'

/**
 * @param {TimelineCreatePayload} timeline
 * @returns {TimelineCreatePayload}
 */
let getTransformedTimeline = (timeline) => {
	let transformedTimeline = /** @type {Record<string, unknown>} */ ({
		...timeline,
	})

	for (let key of /** @type {(keyof TimelineCreatePayload)[]} */ (
		Object.keys(timeline)
	)) {
		transformedTimeline[key] = transformedTimeline[key] ?? ``
	}

	return /** @type {TimelineCreatePayload} */ (transformedTimeline)
}

export { getTransformedTimeline }
