import { getTimelineTemplates, getIconPath } from './helpers/helpers.js'

class TimelineList {
  constructor() {
    this._listNode = null
    this._timelineIconPath = ``
  }

  init() {
    this._listNode = document.querySelector(`.timeline__list`)
    this._timelineIconPath = getIconPath()
  }

  renderTimelines(timelines) {
    this._listNode.innerHTML = getTimelineTemplates(timelines, this._timelineIconPath)
  }
}

export { TimelineList }
