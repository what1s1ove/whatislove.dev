import gulp from 'gulp'
import sync from 'browser-sync'
import { html } from '../html/html.task.mjs'
import { css } from '../css/css.task.mjs'
import { js } from '../js/js.task.mjs'
import { api } from '../api/api.task.mjs'
import { joinPaths } from '../../helpers/helpers.mjs'
import { Config } from '../../config.mjs'

const refresh = (done) => {
  sync.reload()

  done()
}

const server = () => {
  sync.init({
    server: Config.FOLDER.BUILD,
    notify: false,
    open: true,
    cors: true,
    ui: false,
  })

  gulp.watch(`${Config.FOLDER.SOURCE}/*.html`, gulp.series(html, refresh))

  gulp.watch(`${joinPaths(Config.FOLDER.SOURCE, Config.FOLDER.SOURCE_CSS)}/**/*.css`, gulp.series(css))

  gulp.watch(`${joinPaths(Config.FOLDER.SOURCE, Config.FOLDER.SOURCE_JS)}/**/*.js`, gulp.series(js, refresh))

  gulp.watch(`${Config.FOLDER.DB}/*.json`, gulp.series(api, refresh))
}

export { server }
