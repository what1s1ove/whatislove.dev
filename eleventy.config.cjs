let esbuild = require(`esbuild`)
let lightningcss = require(`lightningcss`)
let htmlMin = require(`html-minifier-terser`)
let { existsSync } = require(`fs`)
let { readFile, writeFile, mkdir } = require(`fs/promises`)
let browserslist = require(`browserslist`)
let packageJson = require(`./package.json`)
let Image = require(`@11ty/eleventy-img`)
let svgo = require(`svgo`)
let path = require(`node:path`)
let fs = require(`node:fs/promises`)

let isDevelopment = process.env.NODE_ENV === `development`

let Path = {
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
let init = (config) => {
  // ignores
  if (!isDevelopment) {
    config.ignores.add(`source/pages/form.njk`)
  }

  // copy
  for (let url of Path.COPY) {
    config.addPassthroughCopy(url)
  }

  // api
  config.addTemplateFormats(`json`)

  config.addExtension(`json`, {
    outputFileExtension: `json`,
    compile: async (_content, url) => {
      if (url !== Path.DB) {
        return
      }

      let database = JSON.parse(await readFile(Path.DB))
      let isFolderExists = existsSync(`build/api`)

      if (!isFolderExists) {
        await mkdir(`build/api`)
      }

      await Promise.all(
        Object.keys(database).map((databaseKey) => {
          let payload = JSON.stringify(database[databaseKey])

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
        let { code, map } = await lightningcss.bundleAsync({
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
        let {
          outputFiles: [formOutputFile],
        } = await esbuild.build({
          entryPoints: [Path.JS.FORM],
          target: `es2020`,
          minify: true,
          bundle: true,
          write: false,
          sourcemap: isDevelopment,
        })

        let isFolderExists = existsSync(`build/scripts`)

        if (!isFolderExists) {
          await mkdir(`build/scripts`)
        }

        await fs.writeFile(`build/scripts/form.js`, formOutputFile.text)
      }

      return async () => {
        let {
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
        let {
          png: [originalImg],
        } = await Image(url, {
          dryRun: true,
          formats: [`png`],
        })

        if (url.includes(`.photo.`)) {
          await Image(url, {
            formats: [`webp`, `avif`],
            outputDir: `build/images`,
            filenameFormat: (_id, source, _width, format) => {
              let extension = path.extname(source)
              let name = path.basename(source, extension)

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
