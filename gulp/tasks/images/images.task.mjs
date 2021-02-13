import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import svgo from 'imagemin-svgo'
import pngquant from 'imagemin-pngquant'
import jpegtran from 'imagemin-jpegtran'

const images = () => {
  return gulp
    .src(`source/img/**/*.{png,jpg,svg}`)
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
    .pipe(gulp.dest(`build/img`))
}

export { images }
