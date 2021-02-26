import { AppConfig } from '~/common/enums'
import { initTimelineApi } from './timeline/timeline.api'

const apis = [initTimelineApi]

const initApi = ({ Router, controllers }) => {
  const apiRouter = new Router({
    prefix: AppConfig.SERVER_API_PREFIX,
  })

  const routes = apis.map((api) => {
    return api({
      Router,
      controllers,
    })
  })

  routes.forEach((router) => {
    apiRouter.use(router.routes()).use(router.allowedMethods())
  })

  return apiRouter
}

export { initApi }
