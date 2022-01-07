import gulp from 'gulp'
import squoosh from 'gulp-libsquoosh'
import { joinPaths } from '../../helpers/helpers.js'
import { Config } from '../../config.js'

const images = () => {
  return gulp
    .src(
      `${joinPaths(
        Config.FOLDER.SOURCE,
        Config.FOLDER.BUILD_IMG,
      )}/**/*.{png,jpg}`,
    )
    .pipe(squoosh())
    .pipe(gulp.dest(joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_IMG)))
}

export { images }
