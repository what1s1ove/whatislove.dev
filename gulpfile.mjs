import gulp from 'gulp'
import { Config } from './gulp/config.mjs'
import {
  html,
  css,
  js,
  images,
  sprite,
  webp,
  api,
  clean,
  copy,
  server,
  cache,
} from './gulp/tasks/tasks.mjs'

const assembly = gulp.series(
  clean,
  copy,
  html,
  css,
  js,
  images,
  webp,
  sprite,
  api,
)

const develop = gulp.series(assembly, server)

const build = gulp.series(assembly, cache)

export {
  api,
  html,
  css,
  js,
  images,
  webp,
  sprite,
  clean,
  copy,
  cache,
  assembly,
  develop,
}

export default Config.isDevelopment ? develop : build
