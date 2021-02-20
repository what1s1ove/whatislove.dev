import { checkIsTimelineSuit } from './check-is-timeline-suit.helper'

const getSuitTimelines = (timelines, filterValues) => {
  return timelines.filter((timeline) => {
    return checkIsTimelineSuit(timeline, filterValues)
  })
}

export { getSuitTimelines }
