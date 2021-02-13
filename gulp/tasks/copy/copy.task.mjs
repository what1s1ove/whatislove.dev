import gulp from 'gulp'
import { joinPaths } from '../../helpers/helpers.mjs'
import { Config } from '../../config.mjs'

const copy = () => {
  return gulp
    .src(
      [
        `${joinPaths(Config.FOLDER.SOURCE, Config.FOLDER.SOURCE_FONTS)}/**/*.woff2`,
        `${joinPaths(Config.FOLDER.SOURCE, Config.FOLDER.SOURCE_FILES)}/**/*.pdf`,
        `${Config.FOLDER.SOURCE}/manifest.webmanifest`,
        `${Config.FOLDER.SOURCE}/favicon.ico`,
      ],
      {
        base: Config.FOLDER.SOURCE,
      },
    )
    .pipe(gulp.dest(Config.FOLDER.BUILD))
}

export { copy }