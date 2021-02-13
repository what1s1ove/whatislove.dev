import gulp from 'gulp'
import gulpwebp from 'gulp-webp'

const webp = () => {
  return gulp
    .src(`build/img/**/*.photo.{png,jpg}`)
    .pipe(
      gulpwebp({
        quality: 75,
      }),
    )
    .pipe(gulp.dest(`build/img`))
}

export { webp }
