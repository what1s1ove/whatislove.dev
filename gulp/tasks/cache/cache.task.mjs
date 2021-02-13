import fs from 'fs'
import del from 'del'
import gulp from 'gulp'
import rev from 'gulp-rev'
import paths from 'vinyl-paths'
import rewrite from 'gulp-rev-rewrite'

const hashCache = () => {
  return gulp
    .src(
      [
        `build/fonts/*.woff2`,
        `build/img/**/*.{svg,png,jpg,webp}`,
        `build/js/*.js`,
        `build/css/*.css`,
        `build/manifest.webmanifest`,
      ],
      {
        base: `dist`,
      },
    )
    .pipe(paths(del))
    .pipe(rev())
    .pipe(gulp.dest(`build`))
    .pipe(rev.manifest(`rev.json`))
    .pipe(gulp.dest(`build`))
}

const replaceCache = () => {
  const manifest = fs.readFileSync(`build/rev.json`)

  return gulp
    .src([`build/**/*.{html,css}`, `build/manifest.webmanifest*`])
    .pipe(
      rewrite({
        manifest,
      }),
    )
    .pipe(gulp.dest(`build`))
}

const cache = gulp.series(hashCache, replaceCache)

export { cache }
