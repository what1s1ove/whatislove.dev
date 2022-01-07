import gulp from 'gulp'
import squoosh from 'gulp-libsquoosh'
import { joinPaths } from '../../helpers/helpers.js'
import { Config } from '../../config.js'

const webp = () => {
  return gulp
    .src(
      `${joinPaths(
        Config.FOLDER.BUILD,
        Config.FOLDER.BUILD_IMG,
      )}/**/*.photo.{png,jpg}`,
    )
    .pipe(
      squoosh({
        webp: {},
      }),
    )
    .pipe(gulp.dest(joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_IMG)))
}

export { webp }
