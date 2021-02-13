import gulp from 'gulp'

const copy = () => {
  return gulp
    .src(
      [
        `source/fonts/**/*.woff2`,
        `source/files/**/*.pdf`,
        `source/manifest.webmanifest`,
        `source/favicon.ico`,
      ],
      {
        base: `source`,
      },
    )
    .pipe(gulp.dest(`build`))
}

export { copy }
