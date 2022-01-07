const isDevelopment = process.env.NODE_ENV === `development`

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
    SOURCE_SOUND: `sound`,
  },
  FILE: {
    HTML: {
      INDEX: `index`,
      FORM: `form`,
    },
    CSS: {
      STYLES: `styles`,
    },
    JS: {
      MAIN: `main`,
      FORM: `form`,
    },
    MANIFEST: `manifest`,
    REV: `rev`,
    FAVICON: `favicon`,
  },
}

export { Config }
