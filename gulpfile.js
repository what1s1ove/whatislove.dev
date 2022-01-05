import gulp from 'gulp'
import { Config } from './gulp/config.js'
import {
  html,
  css,
  js,
  images,
  webp,
  api,
  clean,
  copy,
  server,
  svg,
  cache,
  cleanup,
} from './gulp/tasks/tasks.js'

const assembly = gulp.series(clean, copy, html, css, js, images, svg, webp, api)

const develop = gulp.series(assembly, server)

const build = gulp.series(assembly, cache, cleanup)

export {
  api,
  html,
  css,
  js,
  images,
  svg,
  webp,
  clean,
  copy,
  cache,
  cleanup,
  assembly,
  develop,
}

export default Config.isDevelopment ? develop : build
