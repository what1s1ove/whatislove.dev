import { TimelineForm, TimelineList } from './components'
import { getSuitTimelines } from './helpers'

class Timeline {
  constructor({ timelineApi }) {
    this._timelineApi = timelineApi

    this._timelines = []

    this._handleFormChange = this._handleFormChange.bind(this)

    this._timelineFormComponent = new TimelineForm({
      onChange: this._handleFormChange,
    })
    this._timelineListComponent = new TimelineList()
  }

  async init() {
    this._timelineFormComponent.init()
    this._timelineListComponent.init()

    await this._fetchTimelines()

    this._renderTimelines(this._timelineFormComponent.formValues)
  }

  _renderTimelines(formValues) {
    const timelines = getSuitTimelines(this._timelines, formValues)

    this._timelineListComponent.renderTimelines(timelines)
  }

  _handleFormChange(formValues) {
    this._renderTimelines(formValues)
  }

  async _fetchTimelines() {
    this._timelines = await this._timelineApi.getTimelines()
  }
}

export { Timeline }
