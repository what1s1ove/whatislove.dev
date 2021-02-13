import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'
import { Config } from '../../config.mjs'


const html = () => {
  return gulp
    .src(`${Config.FOLDER.SOURCE}/*.html`)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      }),
    )
    .pipe(gulp.dest(Config.FOLDER.BUILD))
}

export { html }
