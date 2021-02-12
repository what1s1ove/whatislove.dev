import path from 'path'
import fs from 'fs'
import del from 'del'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import gulp from 'gulp'
import plumber from 'gulp-plumber'
import gulpif from 'gulp-if'
import rename from 'gulp-rename'
import rev from 'gulp-rev'
import rewrite from 'gulp-rev-rewrite'
import paths from 'vinyl-paths'

import sync from 'browser-sync'

import sourcemap from 'gulp-sourcemaps'

import htmlmin from 'gulp-htmlmin'

import postcss from 'gulp-postcss'
import postcssimport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import mqpacker from 'css-mqpacker'
import csso from 'gulp-csso'

import { rollup } from 'rollup'
import babelInstance from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

import imagemin from 'gulp-imagemin'
import svgo from 'imagemin-svgo'
import pngquant from 'imagemin-pngquant'
import jpegtran from 'imagemin-jpegtran'
import gulpwebp from 'gulp-webp'
import svgstore from 'gulp-svgstore'

const isDevelopment = Boolean(yargs(hideBin(process.argv)).argv.development)

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

const css = () => {
  return gulp
    .src(`source/css/styles.css`)
    .pipe(plumber())
    .pipe(gulpif(isDevelopment, sourcemap.init()))
    .pipe(
      postcss([
        postcssimport(),
        autoprefixer(),
        mqpacker({
          sort: (a, b) => a.localeCompare(b),
        }),
      ]),
    )
    .pipe(csso())
    .pipe(rename(`styles.min.css`))
    .pipe(gulpif(isDevelopment, sourcemap.write(`.`)))
    .pipe(gulp.dest(`build/css`))
    .pipe(sync.stream())
}

const js = () => {
  return rollup({
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
  }).then((bundle) => {
    return bundle.write({
      file: `./build/js/main.min.js`,
      format: `iife`,
      sourcemap: Boolean(isDevelopment),
    })
  })
}

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

const clean = () => {
  return del(`build`)
}

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
  const manifest = fs.readFileSync('build/rev.json');

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

const assembly = gulp.series(clean, copy, html, css, js, images, webp, sprite)

const develop = gulp.series(assembly, server)

const build = gulp.series(assembly, cache)

export {
  html,
  css,
  js,
  images,
  webp,
  sprite,
  clean,
  copy,
  refresh,
  hashCache,
  replaceCache,
  cache,
  assembly,
  develop,
}

export default isDevelopment ? develop : build
