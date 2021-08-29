import { getTimelineTemplate } from '../get-timeline-template/get-timeline-template.helper.js'

const getTimelineTemplates = (timelines, iconPath) => {
  return timelines.reduce((acc, timeline) => {
    return acc.concat(getTimelineTemplate(timeline, iconPath))
  }, ``)
}

export { getTimelineTemplates }
