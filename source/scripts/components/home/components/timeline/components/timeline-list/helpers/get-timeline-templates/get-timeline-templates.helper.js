import { getTimelineTemplate } from '../get-timeline-template/get-timeline-template.helper.js'

const getTimelineTemplates = (timelines) => {
  let timelineTemplates = ``

  for (const timeline of timelines) {
    timelineTemplates += getTimelineTemplate(timeline)
  }

  return timelineTemplates
}

export { getTimelineTemplates }
