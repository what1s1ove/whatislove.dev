import gulp from 'gulp'
import svgo from 'gulp-svgmin'
import { joinPaths } from '../../helpers/helpers.js'
import { Config } from '../../config.js'

const svg = () => {
  return gulp
    .src(
      `${joinPaths(
        Config.FOLDER.SOURCE,
        Config.FOLDER.BUILD_IMG,
      )}/*.svg`,
    )
    .pipe(svgo())
    .pipe(gulp.dest(joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_IMG)))
}

export { svg }
