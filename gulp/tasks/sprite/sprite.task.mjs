import gulp from 'gulp'
import rename from 'gulp-rename'
import svgstore from 'gulp-svgstore'
import { joinPaths } from '../../helpers/helpers.mjs'
import { Config } from '../../config.mjs'

const sprite = () => {
  return gulp
    .src(`${joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_IMG)}/*.icon.svg`)
    .pipe(
      svgstore({
        inlineSvg: true,
      }),
    )
    .pipe(rename(`${Config.FILE.IMG.SPRITE}.svg`))
    .pipe(gulp.dest(joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_IMG)))
}

export { sprite }
