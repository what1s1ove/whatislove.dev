import { initTimelineApi } from './timeline/timeline.api'

const apis = [initTimelineApi]

const initApi = ({ Router, controllers }) => {
  return apis.map((api) => {
    return api({
      Router,
      controllers,
    })
  })
}

export { initApi }
