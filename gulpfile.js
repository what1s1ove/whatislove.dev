import del from 'del'
import yargs from 'yargs'
import path from 'path'

import gulp from 'gulp'
import plumber from 'gulp-plumber'
import gulpif from 'gulp-if'
import rename from 'gulp-rename'

import sync from 'browser-sync'

import sourcemap from 'gulp-sourcemaps'

import htmlmin from 'gulp-htmlmin'

import postcss from 'gulp-postcss'
import postcssimport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import hexalpha from 'postcss-color-hex-alpha'
import mqpacker from 'css-mqpacker'
import csso from 'gulp-csso'

import { rollup } from 'rollup'
import babelInstance from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import workboxBuild from 'workbox-build'

import imagemin from 'gulp-imagemin'
import svgo from 'imagemin-svgo'
import pngquant from 'imagemin-pngquant'
import jpegtran from 'imagemin-jpegtran'
import gulpwebp from 'gulp-webp'
import svgstore from 'gulp-svgstore'

const isDevelopment = Boolean(yargs.argv.development)

const html = () =>
  gulp
    .src(`source/*.html`)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(gulp.dest(`build`))

const css = () =>
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

const js = () =>
  rollup({
    input: `./source/js/main.js`,
    plugins: [
      alias({
        entries: [
          {
            find: `~`,
            replacement: path.join(path.resolve(), `source/js`),
            customResolver: resolve({
              extensions: [`.js`],
            }),
          },
        ],
      }),
      resolve(),
      commonjs(),
      babelInstance.babel({
        babelHelpers: `bundled`,
        presets: [`@babel/preset-env`],
        babelrc: false,
        exclude: `node_modules/**`,
      }),
      !isDevelopment && terser(),
    ],
  }).then((bundle) =>
    bundle.write({
      file: `./build/js/main.min.js`,
      format: `iife`,
      sourcemap: Boolean(isDevelopment),
    })
  )

const sw = () =>
  workboxBuild.generateSW({
    globDirectory: `build`,
    globPatterns: [`**/*.{html,json,js,css,svg,webp,woff2}`],
    swDest: `build/sw.js`,
    sourcemap: Boolean(isDevelopment),
  })

const images = () =>
  gulp
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
      ])
    )
    .pipe(gulp.dest(`build/img`))

const webp = () =>
  gulp
    .src(`build/img/**/*.photo.{png,jpg}`)
    .pipe(
      gulpwebp({
        quality: 75,
      })
    )
    .pipe(gulp.dest(`build/img`))

const sprite = () =>
  gulp
    .src(`build/img/*.icon.svg`)
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename(`sprite.svg`))
    .pipe(gulp.dest(`build/img`))

const clean = () => del(`build`)

const copy = () =>
  gulp
    .src(
      [
        `source/fonts/**/*.woff2`,
        `source/files/**/*.pdf`,
        `source/*.json`,
      ],
      {
        base: `source`,
      }
    )
    .pipe(gulp.dest(`build`))

const refresh = (done) => {
  sync.reload()

  done()
}

const server = () => {
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

const build = gulp.series(clean, copy, html, css, js, sw, images, webp, sprite)

const develop = gulp.series(build, server)

export {
  html,
  css,
  js,
  sw,
  images,
  webp,
  sprite,
  clean,
  copy,
  refresh,
  build,
  develop,
}

export default isDevelopment ? develop : build
