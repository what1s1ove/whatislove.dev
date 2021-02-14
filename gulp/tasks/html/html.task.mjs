import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'
import { includeFile } from '../../helpers/helpers.mjs'
import { Config } from '../../config.mjs'

const html = () => {
  return gulp
    .src([
      `${Config.FOLDER.SOURCE}/*.html`,
      includeFile(`${Config.FOLDER.SOURCE}/${Config.FILE.HTML.FORM}.html`, Config.isDevelopment),
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
