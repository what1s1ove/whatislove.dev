import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const isDevelopment = Boolean(yargs(hideBin(process.argv)).argv.development)

const Config = {
  isDevelopment,
  FOLDER: {
    DB: `db`,
    BUILD: `build`,
    BUILD_IMG: `img`,
    BUILD_JS: `js`,
    BUILD_CSS: `css`,
    BUILD_FONTS: `fonts`,
    BUILD_API: `api`,
    SOURCE: `source`,
    SOURCE_IMG: `img`,
    SOURCE_JS: `js`,
    SOURCE_CSS: `css`,
    SOURCE_FONTS: `fonts`,
    SOURCE_FILES: `files`,
  },
}

export { Config }