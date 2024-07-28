import { Loader } from '~/libs/components/components.js'
import { checkIsBeforeElement } from '~/libs/helpers/helpers.js'
import {
	TimelineApi,
	TimelineFilter,
	Timeline as TTimeline,
} from '~/modules/timeline/timeline.js'

import { TimelineForm, TimelineList } from './libs/components/components.js'
import { getSuitTimelines } from './libs/helpers/helpers.js'

class Timeline {
	/** @type {(formValues: TimelineFilter) => void} */
	#handleFormChange

	/** @type {() => Promise<void>} */
	#handleTimelineShow

	/** @type {boolean} */
	#isLoading

	/** @type {Loader} */
	#loaderComponent

	/** @type {TimelineApi} */
	#timelineApi

	/** @type {TimelineForm} */
	#timelineFormComponent

	/** @type {TimelineList} */
	#timelineListComponent

	/** @type {HTMLElement | undefined} */
	#timelineNode

	/** @type {TTimeline[]} */
	#timelines

	/**
	 * @param {{
	 * 	timelineApi: TimelineApi
	 * }} constructor
	 */
	constructor({ timelineApi }) {
		this.#timelineApi = timelineApi

		this.#timelineNode = undefined
		this.#timelines = []
		this.#isLoading = false

		this.#handleFormChange = this.#changeFormHandler.bind(this)
		this.#handleTimelineShow = this.#showTimelineHandler.bind(this)

		this.#timelineFormComponent = new TimelineForm({
			onChange: this.#handleFormChange,
		})
		this.#loaderComponent = new Loader({
			containerNode: /** @type {HTMLElement} */ (
				document.querySelector(`.experience__timeline-wrapper`)
			),
		})
		this.#timelineListComponent = new TimelineList()
	}

	/**
	 * @param {TimelineFilter} formValues
	 * @returns {void}
	 */
	#changeFormHandler(formValues) {
		this.#renderTimelines(formValues)
	}

	/** @returns {Promise<void>} */
	async #fetchTimelines() {
		let timelines = await this.#timelineApi.getTimelines()

		this.#timelines = timelines.toReversed()
	}

	/** @returns {void} */
	#initListeners() {
		document.addEventListener(`scroll`, this.#handleTimelineShow)
	}

	/**
	 * @param {TimelineFilter} formValues
	 * @returns {void}
	 */
	#renderTimelines(formValues) {
		let timelines = getSuitTimelines(this.#timelines, formValues)

		this.#timelineListComponent.renderTimelines(timelines)
	}

	/** @returns {Promise<void>} */
	async #showTimelineHandler() {
		let shouldLoadTimelines = checkIsBeforeElement(
			/** @type {HTMLElement} */ (this.#timelineNode).offsetTop,
		)

		if (shouldLoadTimelines && !this.#isLoading) {
			this.#isLoading = true

			await this.#fetchTimelines()

			this.#loaderComponent.remove()

			this.#renderTimelines(this.#timelineFormComponent.formValues)

			document.removeEventListener(`scroll`, this.#handleTimelineShow)
		}
	}

	/**
	 * @param {HTMLElement} timelineNode
	 * @returns {void}
	 */
	init(timelineNode) {
		this.#timelineNode = timelineNode

		this.#loaderComponent.init()
		this.#timelineFormComponent.init()
		this.#timelineListComponent.init()

		this.#initListeners()

		void this.#showTimelineHandler()
	}
}

export { Timeline }
