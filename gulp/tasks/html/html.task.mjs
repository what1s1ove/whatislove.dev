import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'

const html = () => {
  return gulp
    .src(`source/*.html`)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      }),
    )
    .pipe(gulp.dest(`build`))
}

export { html }
