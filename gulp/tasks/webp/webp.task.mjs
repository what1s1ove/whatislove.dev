import gulp from 'gulp'
import gulpwebp from 'gulp-webp'
import { joinPaths } from '../../helpers/helpers.mjs'
import { Config } from '../../config.mjs'

const webp = () => {
  return gulp
    .src(`${joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_IMG)}/**/*.photo.{png,jpg}`)
    .pipe(
      gulpwebp({
        quality: 75,
      }),
    )
    .pipe(gulp.dest(joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_IMG)))
}

export { webp }
