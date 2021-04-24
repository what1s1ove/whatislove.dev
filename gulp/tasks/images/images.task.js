import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import svgo from 'imagemin-svgo'
import pngquant from 'imagemin-pngquant'
import jpegtran from 'imagemin-jpegtran'
import { joinPaths } from '../../helpers/helpers.js'
import { Config } from '../../config.js'

const images = () => {
  return gulp
    .src(`${joinPaths(Config.FOLDER.SOURCE, Config.FOLDER.BUILD_IMG)}/**/*.{png,jpg,svg}`)
    .pipe(
      imagemin([
        jpegtran({
          progressive: true,
        }),
        pngquant(),
        svgo({
          floatPrecision: 1,
        }),
      ]),
    )
    .pipe(gulp.dest(joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_IMG)))
}

export { images }
