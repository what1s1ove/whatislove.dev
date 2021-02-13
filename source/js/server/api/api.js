import { initTimelineApi } from './timeline/timeline.api'

const routes = [initTimelineApi]

const initApi = ({ Router, controllers }) => {
  return routes.map((router) => {
    return router({
      Router,
      controllers,
    })
  })
}

export { initApi }
