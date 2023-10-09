import { getTimelineTemplates } from './helpers/helpers.js'

class TimelineList {
  constructor() {
    this._listNode = null
  }

  init() {
    this._listNode = document.querySelector(`.timeline__list`)
  }

  renderTimelines(timelines) {
    this._listNode.innerHTML = getTimelineTemplates(timelines)
  }
}

export { TimelineList }
