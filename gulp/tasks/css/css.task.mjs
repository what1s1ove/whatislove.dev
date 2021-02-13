import gulp from 'gulp'
import rename from 'gulp-rename'
import plumber from 'gulp-plumber'
import gulpif from 'gulp-if'
import sourcemap from 'gulp-sourcemaps'
import sync from 'browser-sync'
import postcss from 'gulp-postcss'
import postcssimport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import mqpacker from 'css-mqpacker'
import csso from 'gulp-csso'
import { joinPaths } from '../../helpers/helpers.mjs'
import { Config } from '../../config.mjs'

const css = () => {
  return gulp
    .src(`${joinPaths(Config.FOLDER.SOURCE, Config.FOLDER.SOURCE_CSS)}/styles.css`)
    .pipe(plumber())
    .pipe(gulpif(Config.isDevelopment, sourcemap.init()))
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
    .pipe(gulpif(Config.isDevelopment, sourcemap.write(`.`)))
    .pipe(gulp.dest(`${Config.FOLDER.BUILD}/css`))
    .pipe(sync.stream())
}

export { css }
