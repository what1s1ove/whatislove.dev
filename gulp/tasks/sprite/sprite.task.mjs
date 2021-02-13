import gulp from 'gulp'
import rename from 'gulp-rename'
import svgstore from 'gulp-svgstore'

const sprite = () => {
  return gulp
    .src(`build/img/*.icon.svg`)
    .pipe(
      svgstore({
        inlineSvg: true,
      }),
    )
    .pipe(rename(`sprite.svg`))
    .pipe(gulp.dest(`build/img`))
}

export { sprite }
