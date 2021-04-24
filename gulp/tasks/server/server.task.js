import gulp from 'gulp'
import sync from 'browser-sync'
import { html } from '../html/html.task.js'
import { css } from '../css/css.task.js'
import { js } from '../js/js.task.js'
import { api } from '../api/api.task.js'
import { joinPaths } from '../../helpers/helpers.js'
import { Config } from '../../config.js'

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
