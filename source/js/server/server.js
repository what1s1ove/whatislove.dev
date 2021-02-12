import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { HttpCode } from '~/common/enums'
import { Database } from './database/database'
import { initModels } from './models/models'
import { initControllers } from './controllers/controllers'
import { initApi } from './api/api'
import { HttpError } from './exceptions'
import { DatabaseName } from './common/enums'
import { getErrorMessageResponse } from './helpers'

const app = new Koa()
app.use(bodyParser())

const database = new Database({
  filename: DatabaseName.DATABASE,
})

const models = initModels({
  database,
})

const controllers = initControllers({
  models,
})

const routes = initApi({
  Router,
  controllers,
})

routes.forEach((router) => {
  app.use(router.routes()).use(router.allowedMethods())
})

app.on(`error`, (err, ctx) => {
  const message = getErrorMessageResponse(err.message)

  if (err instanceof HttpError) {
    ctx.status = err.status
    ctx.body = message

    return
  }

  ctx.status = HttpCode.INTERNAL_SERVER_ERROR
  ctx.body = message
})

app.listen(3001)
