import { checkIsTimelineSuit } from '../check-is-timeline-suit/check-is-timeline-suit.helper.js'

const getSuitTimelines = (timelines, filterValues) => {
  return timelines.filter((timeline) => {
    return checkIsTimelineSuit(timeline, filterValues)
  })
}

export { getSuitTimelines }
