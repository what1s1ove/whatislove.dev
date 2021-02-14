import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { AppConfig } from '~/common/enums'
import { Database } from './database/database'
import { initModels } from './models/models'
import { initControllers } from './controllers/controllers'
import { initApi } from './api/api'
import { catchError } from './middlewares'
import { AppEvent, DatabaseName } from './common/enums'

const app = new Koa()
const apiRouter = new Router({
  prefix: AppConfig.SERVER_API_PREFIX,
})
app.use(bodyParser())
app.use(catchError)
app.use(cors())

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
  apiRouter.use(router.routes()).use(router.allowedMethods())
})

app.use(apiRouter.routes())

app.on(AppEvent.ERROR, console.error)

app.listen(AppConfig.SERVER_PORT)
