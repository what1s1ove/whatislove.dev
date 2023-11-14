import { Loader } from '~/components/common/common.js'
import { checkIsBeforeElement } from '~/helpers/helpers.js'

import { TimelineForm, TimelineList } from './components/components.js'
import { getSuitTimelines } from './helpers/helpers.js'

class Timeline {
  constructor({ timelineApi }) {
    this._timelineApi = timelineApi

    this._containerNode = null
    this._timelines = []
    this._isLoading = false

    this._handleFormChange = this._handleFormChange.bind(this)
    this._handleTimelineShow = this._handleTimelineShow.bind(this)

    this._timelineFormComponent = new TimelineForm({
      onChange: this._handleFormChange,
    })
    this._loaderComponent = new Loader({
      containerNode: document.querySelector(`.timeline__list-wrapper`),
    })
    this._timelineListComponent = new TimelineList()
  }

  async init() {
    this._containerNode = document.querySelector(`.timeline`)

    this._loaderComponent.init()
    this._timelineFormComponent.init()
    this._timelineListComponent.init()

    this._initListeners()
  }

  _renderTimelines(formValues) {
    const timelines = getSuitTimelines(this._timelines, formValues)

    this._timelineListComponent.renderTimelines(timelines)
  }

  _initListeners() {
    document.addEventListener(`scroll`, this._handleTimelineShow)
  }

  async _fetchTimelines() {
    this._timelines = await this._timelineApi.getTimelines()
  }

  _handleFormChange(formValues) {
    this._renderTimelines(formValues)
  }

  async _handleTimelineShow() {
    const shouldLoadTimelines = checkIsBeforeElement(
      this._containerNode.offsetTop,
    )

    if (shouldLoadTimelines && !this._isLoading) {
      this._isLoading = true

      await this._fetchTimelines()

      this._loaderComponent.remove()

      this._renderTimelines(this._timelineFormComponent.formValues)

      document.removeEventListener(`scroll`, this._handleTimelineShow)
    }
  }
}

export { Timeline }
