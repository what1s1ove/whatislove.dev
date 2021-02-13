import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { Database } from './database/database'
import { initModels } from './models/models'
import { initControllers } from './controllers/controllers'
import { initApi } from './api/api'
import { catchError } from './middlewares'
import { AppEvent, AppConfig, DatabaseName } from './common/enums'

const app = new Koa()
app.use(bodyParser())
app.use(catchError)

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

app.on(AppEvent.ERROR, console.error)

app.listen(AppConfig.PORT)
