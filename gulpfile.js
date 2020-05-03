const gulp = require('gulp')
const plumber = require('gulp-plumber')
const del = require('del')
const rename = require('gulp-rename')

const server = require('browser-sync').create()

const sourcemap = require('gulp-sourcemaps')

const htmlmin = require('gulp-htmlmin')

const postcss = require('gulp-postcss')
const postcssimport = require('postcss-import')
const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')
const csso = require('gulp-csso')

gulp.task('html', () =>
  gulp
    .src('source/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest('build'))
)

gulp.task('css', () =>
  gulp
    .src('source/css/styles.css')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(postcss([postcssimport(), autoprefixer(), mqpacker()]))
    .pipe(csso())
    .pipe(rename('styles.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream())
)

gulp.task('clean', () => del('build'))

gulp.task('copy', () =>
  gulp
    .src(['source/fonts/**/*.woff2'], {
      base: 'source',
    })
    .pipe(gulp.dest('build'))
)

gulp.task('server', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  })

  gulp.watch('source/css/**/*.css', gulp.series('css'))

  gulp.watch('source/*.html', gulp.series('html', 'refresh'))
})

gulp.task('refresh', (done) => {
  server.reload()

  done()
})

gulp.task('build', gulp.series('clean', 'copy', 'css', 'html'))

gulp.task('start', gulp.series('build', 'server'))
