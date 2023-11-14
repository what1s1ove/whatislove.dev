const esbuild = require(`esbuild`)
const lightningcss = require(`lightningcss`)
const htmlMin = require(`html-minifier-terser`)
const { existsSync } = require(`fs`)
const { readFile, writeFile, mkdir } = require(`fs/promises`)
const browserslist = require(`browserslist`)
const packageJson = require(`./package.json`)
const Image = require(`@11ty/eleventy-img`)
const svgo = require(`svgo`)
const path = require(`node:path`)
const fs = require(`node:fs/promises`)

const isDevelopment = process.env.NODE_ENV === `development`

const Path = {
  CSS: `./source/styles/index.css`,
  JS: {
    MAIN: `./source/scripts/index.js`,
    FORM: `./source/scripts/form.js`,
  },
  DB: `./source/database.json`,
  COPY: [
    `./source/fonts`,
    `./source/files`,
    `./source/sounds`,
    `./source/manifest.webmanifest`,
    `./source/favicon.ico`,
  ],
}

/** @param {import("@11ty/eleventy").UserConfig} config */
const init = (config) => {
  // ignores
  if (!isDevelopment) {
    config.ignores.add(`source/pages/form.njk`)
  }

  // copy
  Path.COPY.forEach((url) => config.addPassthroughCopy(url))

  // api
  config.addTemplateFormats(`json`)

  config.addExtension(`json`, {
    outputFileExtension: `json`,
    compile: async (_content, url) => {
      if (url !== Path.DB) {
        return
      }

      const database = JSON.parse(await readFile(Path.DB))
      const isFolderExists = existsSync(`build/api`)

      if (!isFolderExists) {
        await mkdir(`build/api`)
      }

      await Promise.all(
        Object.keys(database).map((databaseKey) => {
          const payload = JSON.stringify(database[databaseKey])

          return writeFile(`build/api/${databaseKey}.json`, payload)
        }),
      )
    },
  })

  // html
  config.addTransform(`html-minify`, async (content, path) => {
    if (path.endsWith(`.html`)) {
      return await htmlMin.minify(content, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeComments: true,
      })
    }

    return content
  })

  // css
  config.addTemplateFormats(`css`)

  config.addExtension(`css`, {
    outputFileExtension: `css`,
    compile: async (_content, url) => {
      if (url !== Path.CSS) {
        return
      }

      return async () => {
        const { code, map } = await lightningcss.bundleAsync({
          filename: url,
          minify: true,
          sourceMap: isDevelopment,
          targets: lightningcss.browserslistToTargets(
            browserslist(packageJson.browserslist),
          ),
        })

        return isDevelopment
          ? code +
              `\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,${map.toString(
                `base64`,
              )}*/`
          : code
      }
    },
  })

  // js
  config.addTemplateFormats(`js`)

  config.addExtension(`js`, {
    outputFileExtension: `js`,
    compile: async (_content, url) => {
      if (url !== Path.JS.MAIN) {
        return
      }

      if (isDevelopment) {
        const {
          outputFiles: [formOutputFile],
        } = await esbuild.build({
          entryPoints: [Path.JS.FORM],
          target: `es2020`,
          minify: true,
          bundle: true,
          write: false,
          sourcemap: isDevelopment,
        })

        const isFolderExists = existsSync(`build/scripts`)

        if (!isFolderExists) {
          await mkdir(`build/scripts`)
        }

        await fs.writeFile(`build/scripts/form.js`, formOutputFile.text)
      }

      return async () => {
        const {
          outputFiles: [mainOutputFile],
        } = await esbuild.build({
          entryPoints: [url],
          target: `es2020`,
          minify: true,
          bundle: true,
          write: false,
          sourcemap: isDevelopment,
        })

        return mainOutputFile.text
      }
    },
  })

  // png
  config.addTemplateFormats(`png`)

  config.addExtension(`png`, {
    outputFileExtension: `png`,
    compile: async (_content, url) => {
      return async () => {
        const {
          png: [originalImg],
        } = await Image(url, {
          dryRun: true,
          formats: [`png`],
        })

        if (url.includes(`.photo.`)) {
          await Image(url, {
            formats: [`webp`, `avif`],
            outputDir: `build/images`,
            filenameFormat: (_id, src, _width, format) => {
              const extension = path.extname(src)
              const name = path.basename(src, extension)

              return `${name}.${format}`
            },
          })
        }

        return originalImg.buffer
      }
    },
  })

  // svg
  config.addTemplateFormats(`svg`)

  config.addExtension(`svg`, {
    outputFileExtension: `svg`,
    compile: (content, url) => {
      return () => {
        if (url === `./source/images/icons/icon.svg`) {
          return content
        }

        return svgo.optimize(content).data
      }
    },
  })

  return {
    dir: {
      input: `source`,
      output: `build`,
    },
    dataTemplateEngine: `njk`,
    markdownTemplateEngine: `njk`,
    htmlTemplateEngine: `njk`,
    passthroughFileCopy: true,
    templateFormats: [`md`, `njk`],
  }
}

module.exports = init
