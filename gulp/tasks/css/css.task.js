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
import { joinPaths } from '../../helpers/helpers.js'
import { Config } from '../../config.js'

const css = () => {
  return gulp
    .src(`${joinPaths(Config.FOLDER.SOURCE, Config.FOLDER.SOURCE_CSS, Config.FILE.CSS.STYLES)}.css`)
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
    .pipe(rename(`${joinPaths(Config.FILE.CSS.STYLES)}.min.css`))
    .pipe(gulpif(Config.isDevelopment, sourcemap.write(`.`)))
    .pipe(gulp.dest(`${joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_CSS)}`))
    .pipe(sync.stream())
}

export { css }
