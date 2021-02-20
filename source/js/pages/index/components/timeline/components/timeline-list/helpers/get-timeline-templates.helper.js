import { getTimelineTemplate } from './get-timeline-template.helper'

const getTimelineTemplates = (timelines) => {
  return timelines.reduce((acc, timeline) => {
    return acc.concat(getTimelineTemplate(timeline))
  }, ``)
}

export { getTimelineTemplates }
