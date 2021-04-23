import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'
import { includeFile, joinPaths } from '../../helpers/helpers.js'
import { Config } from '../../config.js'

const html = () => {
  return gulp
    .src([
      `${joinPaths(Config.FOLDER.SOURCE)}/*.html`,
      includeFile(`${joinPaths(Config.FOLDER.SOURCE, Config.FILE.HTML.FORM)}.html`, Config.isDevelopment),
    ])
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      }),
    )
    .pipe(gulp.dest(Config.FOLDER.BUILD))
}

export { html }
