import { Loader } from '~/libs/components/components.js'
import { checkIsBeforeElement } from '~/libs/helpers/helpers.js'

import { TimelineForm, TimelineList } from './libs/components/components.js'
import { getSuitTimelines } from './libs/helpers/helpers.js'

/** @typedef {import('~/packages/timeline/timeline').Timeline} TTimeline */
/** @typedef {import('~/packages/timeline/timeline').TimelineFilter} TimelineFilter */
/** @typedef {import('~/packages/timeline/timeline').TimelineApi} TimelineApi */

class Timeline {
  /**
   * @param {{
   *   timelineApi: TimelineApi
   * }} constructor
   */
  constructor({ timelineApi }) {
    this._timelineApi = timelineApi

    /** @type {HTMLElement | undefined} */
    this._containerNode = undefined
    /** @type {TTimeline[]} */
    this._timelines = []
    /** @type {boolean} */
    this._isLoading = false

    this._handleFormChange = this._handleFormChange.bind(this)
    this._handleTimelineShow = this._handleTimelineShow.bind(this)

    this._timelineFormComponent = new TimelineForm({
      onChange: this._handleFormChange,
    })
    this._loaderComponent = new Loader({
      containerNode: /** @type {HTMLElement} */ (
        document.querySelector(`.timeline__list-wrapper`)
      ),
    })
    this._timelineListComponent = new TimelineList()
  }

  /** @returns {Promise<void>} */
  async _fetchTimelines() {
    this._timelines = await this._timelineApi.getTimelines()
  }

  /**
   * @param {TimelineFilter} formValues
   * @returns {void}
   */
  _handleFormChange(formValues) {
    this._renderTimelines(formValues)
  }

  /** @returns {Promise<void>} */
  async _handleTimelineShow() {
    let shouldLoadTimelines = checkIsBeforeElement(
      /** @type {HTMLElement} */ (this._containerNode).offsetTop,
    )

    if (shouldLoadTimelines && !this._isLoading) {
      this._isLoading = true

      await this._fetchTimelines()

      this._loaderComponent.remove()

      this._renderTimelines(this._timelineFormComponent.formValues)

      document.removeEventListener(`scroll`, this._handleTimelineShow)
    }
  }

  /** @returns {void} */
  _initListeners() {
    document.addEventListener(`scroll`, this._handleTimelineShow)
  }

  /**
   * @param {TimelineFilter} formValues
   * @returns {void}
   */
  _renderTimelines(formValues) {
    let timelines = getSuitTimelines(this._timelines, formValues)

    this._timelineListComponent.renderTimelines(timelines)
  }

  /** @returns {void} */
  init() {
    this._containerNode = /** @type {HTMLElement} */ (
      document.querySelector(`.timeline`)
    )

    this._loaderComponent.init()
    this._timelineFormComponent.init()
    this._timelineListComponent.init()

    this._initListeners()
  }
}

export { Timeline }
