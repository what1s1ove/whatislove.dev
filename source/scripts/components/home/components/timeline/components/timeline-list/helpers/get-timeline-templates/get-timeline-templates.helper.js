import { getTimelineTemplate } from '../get-timeline-template/get-timeline-template.helper.js'

let getTimelineTemplates = (timelines) => {
  let timelineTemplates = ``

  for (let timeline of timelines) {
    timelineTemplates += getTimelineTemplate(timeline)
  }

  return timelineTemplates
}

export { getTimelineTemplates }
