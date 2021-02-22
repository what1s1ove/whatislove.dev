import del from 'del'
import gulp from 'gulp'
import rev from 'gulp-rev'
import paths from 'vinyl-paths'
import rewrite from 'gulp-rev-rewrite'
import { joinPaths, readFile, includeFile } from '../../helpers/helpers.mjs'
import { Config } from '../../config.mjs'

const hashCache = () => {
  return gulp
    .src(
      [
        `${joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_FONTS)}/*.woff2`,
        `${joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_IMG)}/**/*.{svg,png,jpg,webp}`,
        `${joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_JS)}/*.js`,
        `${joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_CSS)}/*.css`,
        `${joinPaths(Config.FOLDER.BUILD, Config.FILE.MANIFEST)}.webmanifest`,
        `${includeFile(`${joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_IMG)}/sprite.svg`, false)}`,
      ],
      {
        base: Config.FOLDER.BUILD,
      },
    )
    .pipe(paths(del))
    .pipe(rev())
    .pipe(gulp.dest(Config.FOLDER.BUILD))
    .pipe(rev.manifest(`${Config.FILE.REV}.json`))
    .pipe(gulp.dest(Config.FOLDER.BUILD))
}

const replaceCache = () => {
  const manifest = readFile(`${Config.FOLDER.BUILD}/${Config.FILE.REV}.json`, true)

  return gulp
    .src([`${Config.FOLDER.BUILD}/**/*.{html,css}`, `${Config.FOLDER.BUILD}/${Config.FILE.MANIFEST}-*.webmanifest`])
    .pipe(
      rewrite({
        manifest,
      }),
    )
    .pipe(gulp.dest(Config.FOLDER.BUILD))
}

const cache = gulp.series(hashCache, replaceCache)

export { cache }
