/* eslint-disable implicit-arrow-linebreak */
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import del from 'del'
import gulpif from 'gulp-if'
import rename from 'gulp-rename'
import yargs from 'yargs'

import sync from 'browser-sync'

import sourcemap from 'gulp-sourcemaps'

import htmlmin from 'gulp-htmlmin'

import postcss from 'gulp-postcss'
import postcssimport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import hexalpha from 'postcss-color-hex-alpha'
import mqpacker from 'css-mqpacker'
import csso from 'gulp-csso'

import rollup from 'gulp-rollup'
import babel from 'gulp-babel'
import terser from 'gulp-terser'

import imagemin from 'gulp-imagemin'
import svgo from 'imagemin-svgo'
import pngquant from 'imagemin-pngquant'
import jpegtran from 'imagemin-jpegtran'
import gulpwebp from 'gulp-webp'
import svgstore from 'gulp-svgstore'

const isDevelopment = Boolean(yargs.argv.development)

export const html = () =>
  gulp
    .src(`source/*.html`)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(gulp.dest(`build`))

export const css = () =>
  gulp
    .src(`source/css/styles.css`)
    .pipe(plumber())
    .pipe(gulpif(isDevelopment, sourcemap.init()))
    .pipe(
      postcss([
        postcssimport(),
        hexalpha(),
        autoprefixer(),
        mqpacker({
          sort: (a, b) => a.localeCompare(b),
        }),
      ])
    )
    .pipe(csso())
    .pipe(rename(`styles.min.css`))
    .pipe(gulpif(isDevelopment, sourcemap.write(`.`)))
    .pipe(gulp.dest(`build/css`))
    .pipe(sync.stream())

export const js = () =>
  gulp
    .src(`./source/js/**/*.js`)
    .pipe(gulpif(isDevelopment, sourcemap.init()))
    .pipe(
      rollup({
        input: `./source/js/main.js`,
        output: {
          format: `iife`,
        },
      })
    )
    .pipe(
      babel({
        presets: [`@babel/preset-env`],
      })
    )
    .pipe(terser())
    .pipe(rename(`main.min.js`))
    .pipe(gulpif(isDevelopment, sourcemap.write(`.`)))
    .pipe(gulp.dest(`build/js`))

export const images = () =>
  gulp
    .src(`source/img/**/*.{png,jpg,svg}`)
    .pipe(
      imagemin([
        jpegtran({
          progressive: true,
        }),
        pngquant(),
        svgo(),
      ])
    )
    .pipe(gulp.dest(`build/img`))

export const webp = () =>
  gulp
    .src(`build/img/**/*.photo.{png,jpg}`)
    .pipe(
      gulpwebp({
        quality: 75,
      })
    )
    .pipe(gulp.dest(`build/img`))

export const sprite = () =>
  gulp
    .src(`build/img/*.icon.svg`)
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename(`sprite.svg`))
    .pipe(gulp.dest(`build/img`))

export const clean = () => del(`build`)

export const copy = () =>
  gulp
    .src(
      [
        `source/fonts/**/*.woff2`,
        `source/files/**/*.pdf`,
        `source/favicon.ico`,
        `source/*.json`,
      ],
      {
        base: `source`,
      }
    )
    .pipe(gulp.dest(`build`))

export const refresh = (done) => {
  sync.reload()

  done()
}

export const server = () => {
  sync.init({
    server: `build/`,
    notify: false,
    open: true,
    cors: true,
    ui: false,
  })

  gulp.watch(`source/*.html`, gulp.series(html, refresh))

  gulp.watch(`source/css/**/*.css`, gulp.series(css))

  gulp.watch(`source/js/**/*.js`, gulp.series(js, refresh))
}

export const build = () =>
  gulp.series(clean, copy, html, css, js, images, webp, sprite)

export const start = () => {
  gulp.series(build, server)
}
