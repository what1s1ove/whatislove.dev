import fs from 'fs'
import del from 'del'
import gulp from 'gulp'
import rev from 'gulp-rev'
import paths from 'vinyl-paths'
import rewrite from 'gulp-rev-rewrite'
import { joinPaths } from '../../helpers/helpers.mjs'
import { Config } from '../../config.mjs'

const hashCache = () => {
  return gulp
    .src(
      [
        `${joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_FONTS)}/*.woff2`,
        `${joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_IMG)}/**/*.{svg,png,jpg,webp}`,
        `${joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_JS)}/*.js`,
        `${joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_CSS)}/*.css`,
        `${Config.FOLDER.BUILD}/manifest.webmanifest`,
      ],
      {
        base: Config.FOLDER.BUILD,
      },
    )
    .pipe(paths(del))
    .pipe(rev())
    .pipe(gulp.dest(Config.FOLDER.BUILD))
    .pipe(rev.manifest(`rev.json`))
    .pipe(gulp.dest(Config.FOLDER.BUILD))
}

const replaceCache = () => {
  const manifest = fs.readFileSync(`${Config.FOLDER.BUILD}/rev.json`)

  return gulp
    .src([`${Config.FOLDER.BUILD}/**/*.{html,css}`, `${Config.FOLDER.BUILD}/manifest.webmanifest*`])
    .pipe(
      rewrite({
        manifest,
      }),
    )
    .pipe(gulp.dest(Config.FOLDER.BUILD))
}

const cache = gulp.series(hashCache, replaceCache)

export { cache }
