import gulp from 'gulp'
import sync from 'browser-sync'
import { html } from '../html/html.task.mjs'
import { css } from '../css/css.task.mjs'
import { js } from '../js/js.task.mjs'

const refresh = (done) => {
  sync.reload()

  done()
}

const server = () => {
  sync.init({
    server: `build/`,
    notify: false,
    open: true,
    cors: true,
    ui: false,
  })

  gulp.watch(`source/*.html`, gulp.series(html, refresh))

  gulp.watch(`source/css/**/*.css`, gulp.series(css))

  gulp.watch(`source/js/**/*.js`, gulp.series(js, refresh))
}

export { server }
