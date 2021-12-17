import { getTimelineTemplate } from '../get-timeline-template/get-timeline-template.helper.js'

const getTimelineTemplates = (timelines) => {
  return timelines.reduce((acc, timeline) => {
    return acc.concat(getTimelineTemplate(timeline))
  }, ``)
}

export { getTimelineTemplates }
