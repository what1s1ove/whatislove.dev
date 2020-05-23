/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
const gulp = require(`gulp`)
const plumber = require(`gulp-plumber`)
const del = require(`del`)
const rename = require(`gulp-rename`)

const server = require(`browser-sync`).create()

const sourcemap = require(`gulp-sourcemaps`)

const htmlmin = require(`gulp-htmlmin`)

const postcss = require(`gulp-postcss`)
const postcssimport = require(`postcss-import`)
const autoprefixer = require(`autoprefixer`)
const hexalpha = require(`postcss-color-hex-alpha`)
const mqpacker = require(`css-mqpacker`)
const csso = require(`gulp-csso`)

const rollup = require(`gulp-rollup`)
const babel = require(`gulp-babel`)
const terser = require(`gulp-terser`)

const imagemin = require(`gulp-imagemin`)
const svgo = require(`imagemin-svgo`)
const pngquant = require(`imagemin-pngquant`)
const jpegtran = require(`imagemin-jpegtran`)
const webp = require(`gulp-webp`)
const svgstore = require(`gulp-svgstore`)

gulp.task(`html`, () =>
  gulp
    .src(`source/*.html`)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(gulp.dest(`build`))
)

gulp.task(`css`, () =>
  gulp
    .src(`source/css/styles.css`)
    .pipe(plumber())
    .pipe(sourcemap.init())
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
    .pipe(sourcemap.write(`.`))
    .pipe(gulp.dest(`build/css`))
    .pipe(server.stream())
)

gulp.task(`js`, () =>
  gulp
    .src(`./source/js/**/*.js`)
    .pipe(sourcemap.init())
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
    .pipe(sourcemap.write(`.`))
    .pipe(gulp.dest(`build/js`))
    .pipe(server.stream())
)

gulp.task(`images`, () =>
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
)

gulp.task(`webp`, () =>
  gulp
    .src(`build/img/**/*.photo.{png,jpg}`)
    .pipe(
      webp({
        quality: 75,
      })
    )
    .pipe(gulp.dest(`build/img`))
)

gulp.task(`sprite`, () =>
  gulp
    .src(`build/img/*.icon.svg`)
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename(`sprite.svg`))
    .pipe(gulp.dest(`build/img`))
)

gulp.task(`clean`, () => del(`build`))

gulp.task(`copy`, () =>
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
)

gulp.task(`server`, () => {
  server.init({
    server: `build/`,
    notify: false,
    open: true,
    cors: true,
    ui: false,
  })

  gulp.watch(`source/*.html`, gulp.series(`html`, `refresh`))

  gulp.watch(`source/css/**/*.css`, gulp.series(`css`))

  gulp.watch(`source/js/**/*.js`, gulp.series(`js`))
})

gulp.task(`refresh`, (done) => {
  server.reload()

  done()
})

gulp.task(
  `build`,
  gulp.series(`clean`, `copy`, `html`, `css`, `js`, `images`, `webp`, `sprite`)
)

gulp.task(`start`, gulp.series(`build`, `server`))
