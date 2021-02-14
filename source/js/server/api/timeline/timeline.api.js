import { ApiPath, TimelineApiPath } from '~/common/enums'

const initTimelineApi = ({ Router, controllers }) => {
  const { timeline } = controllers
  const router = new Router({
    prefix: ApiPath.TIMELINE,
  })

  router.get(TimelineApiPath.ROOT, (ctx) => timeline.getAll(ctx))

  router.get(TimelineApiPath.$ID, (ctx) => timeline.getOne(ctx))

  router.post(TimelineApiPath.ROOT, (ctx) => timeline.postOne(ctx))

  router.put(TimelineApiPath.$ID, (ctx) => timeline.putOne(ctx))

  router.delete(TimelineApiPath.$ID, (ctx) => timeline.deleteOne(ctx))

  return router
}

export { initTimelineApi }
