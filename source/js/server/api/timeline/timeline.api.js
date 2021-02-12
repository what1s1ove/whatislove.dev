import { ApiPath } from '../../common/enums'

const initTimelineApi = ({ Router, controllers }) => {
  const { timeline } = controllers
  const router = new Router({
    prefix: ApiPath.TIMELINE,
  })

  router.get(`/`, (ctx) => timeline.getAll(ctx))

  router.get(`/:id`, (ctx) => timeline.getOne(ctx))

  router.post(`/`, (ctx) => timeline.postOne(ctx))

  router.put(`/:id`, (ctx) => timeline.putOne(ctx))

  router.delete(`/:id`, (ctx) => timeline.deleteOne(ctx))

  return router
}

export { initTimelineApi }
