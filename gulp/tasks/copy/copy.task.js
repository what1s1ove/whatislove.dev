import gulp from 'gulp'
import { joinPaths } from '../../helpers/helpers.js'
import { Config } from '../../config.js'

const copy = () => {
  return gulp
    .src(
      [
        `${joinPaths(Config.FOLDER.SOURCE, Config.FOLDER.SOURCE_FONTS)}/**/*.woff2`,
        `${joinPaths(Config.FOLDER.SOURCE, Config.FOLDER.SOURCE_FILES)}/**/*.pdf`,
        `${joinPaths(Config.FOLDER.SOURCE, Config.FOLDER.SOURCE_SOUND)}/**/*.mp3`,
        `${joinPaths(Config.FOLDER.SOURCE, Config.FILE.MANIFEST)}.webmanifest`,
        `${joinPaths(Config.FOLDER.SOURCE, Config.FILE.FAVICON)}.ico`,
      ],
      {
        base: Config.FOLDER.SOURCE,
      },
    )
    .pipe(gulp.dest(Config.FOLDER.BUILD))
}

export { copy }
