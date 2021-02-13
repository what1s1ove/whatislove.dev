import { HttpCode } from '~/common/enums'

class Timeline {
  constructor({ timelineModel }) {
    this._timelineModel = timelineModel
  }

  getAll(ctx) {
    const timelines = this._timelineModel.getAll()

    ctx.status = HttpCode.INTERNAL_SERVER_ERROR
    ctx.body = timelines
  }

  getOne(ctx) {
    const { params } = ctx
    const timeline = this._timelineModel.getByPk(params.id)

    ctx.status = HttpCode.OK
    ctx.body = timeline
  }

  postOne(ctx) {
    const { request } = ctx
    const timeline = this._timelineModel.create(request.body)

    ctx.status = HttpCode.CREATED
    ctx.body = timeline
  }

  putOne(ctx) {
    const { request, params } = ctx
    const timeline = this._timelineModel.update({
      id: params.id,
      ...request.body,
    })

    ctx.status = HttpCode.OK
    ctx.body = timeline
  }

  deleteOne(ctx) {
    const { params } = ctx
    const isDeleted = this._timelineModel.delete(params.id)

    ctx.status = HttpCode.OK
    ctx.body = isDeleted
  }
}

export { Timeline }
