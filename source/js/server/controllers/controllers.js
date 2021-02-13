import { Timeline } from './timeline/timeline.controller'

const initControllers = ({ models }) => {
  const { timeline: timelineModel } = models

  const timeline = new Timeline({
    timelineModel,
  })

  return {
    timeline,
  }
}

export { initControllers }
