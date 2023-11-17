import { getTimelineTemplate } from '../get-timeline-template/get-timeline-template.helper.js'

/** @typedef {import('~/common/types/timeline/timeline').Timeline} Timeline */

/**
 * @param {Timeline[]} timelines
 * @returns {string}
 */
let getTimelineTemplates = (timelines) => {
  let timelineTemplates = ``

  for (let timeline of timelines) {
    timelineTemplates += getTimelineTemplate(timeline)
  }

  return timelineTemplates
}

export { getTimelineTemplates }
