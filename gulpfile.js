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

const rollup = require('gulp-rollup')
const uglify = require('gulp-uglify-es').default

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

gulp.task('js', () =>
  gulp
    .src('./source/js/**/*.js')
    .pipe(sourcemap.init())
    .pipe(
      rollup({
        input: './source/js/main.js',
        output: {
          format: 'iife',
        },
      })
    )
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/js'))
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

  gulp.watch('source/*.html', gulp.series('html', 'refresh'))

  gulp.watch('source/css/**/*.css', gulp.series('css'))

  gulp.watch('source/js/**/*.js', gulp.series('js'))
})

gulp.task('refresh', (done) => {
  server.reload()

  done()
})

gulp.task('build', gulp.series('clean', 'copy', 'html', 'css', 'js'))

gulp.task('start', gulp.series('build', 'server'))
