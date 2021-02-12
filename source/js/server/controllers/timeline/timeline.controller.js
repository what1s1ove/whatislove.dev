class Timeline {
  constructor({ timelineModel }) {
    this._timelineModel = timelineModel
  }

  getAll(ctx) {
    const timelines = this._timelineModel.getAll()

    ctx.body = timelines
  }

  getOne(ctx) {
    const timeline = this._timelineModel.getByPk(ctx.params.id)

    ctx.body = timeline
  }

  postOne(ctx) {
    const timeline = this._timelineModel.create(ctx.request.body)

    ctx.body = timeline
  }

  putOne(ctx) {
    const timeline = this._timelineModel.update(ctx.request.body, ctx.params.id)

    ctx.body = timeline
  }

  deleteOne(ctx) {
    const isDeleted = this._timelineModel.delete(ctx.params.id)

    ctx.body = isDeleted
  }
}

export { Timeline }
