let fs = require(`node:fs/promises`)
let process = require(`node:process`)
let esbuild = require(`esbuild`)
let lightningcss = require(`lightningcss`)
let htmlMin = require(`html-minifier-terser`)
let { existsSync } = require(`fs`)
let { mkdir, readFile, writeFile } = require(`fs/promises`)
let browserslist = require(`browserslist`)
let packageJson = require(`./package.json`)
let Image = require(`@11ty/eleventy-img`)
let svgo = require(`svgo`)
let path = require(`node:path`)

let isDevelopment = process.env.NODE_ENV === `development`

let Path = {
	COPY: [
		`./source/fonts`,
		`./source/files`,
		`./source/sounds`,
		`./source/manifest.webmanifest`,
		`./source/favicon.ico`,
		`./source/robots.txt`,
	],
	CSS: `./source/styles/index.css`,
	DB: `./source/database.json`,
	JS: {
		FORM: `./source/scripts/form.js`,
		MAIN: `./source/scripts/index.js`,
	},
}

/**
 * @param {import('@11ty/eleventy').UserConfig} config
 * @returns {ReturnType<typeof import('@11ty/eleventy/src/defaultConfig')>}
 */
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
		/** @type {import('@11ty/eleventy/src/Engines/TemplateEngine')['compile']} */
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
		outputFileExtension: `json`,
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
		/** @type {import('@11ty/eleventy/src/Engines/TemplateEngine')['compile']} */
		compile: async (_content, url) => {
			if (url !== Path.CSS) {
				return
			}

			return async () => {
				let { code, map } = await lightningcss.bundleAsync({
					drafts: {
						customMedia: true,
					},
					filename: url,
					include:
						lightningcss.Features.MediaQueries |
						lightningcss.Features.Nesting,
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
		outputFileExtension: `css`,
	})

	// js
	config.addTemplateFormats(`js`)

	config.addExtension(`js`, {
		/** @type {import('@11ty/eleventy/src/Engines/TemplateEngine')['compile']} */
		compile: async (_content, url) => {
			if (url !== Path.JS.MAIN) {
				return
			}

			if (isDevelopment) {
				let {
					outputFiles: [formOutputFile],
				} = await esbuild.build({
					bundle: true,
					entryPoints: [Path.JS.FORM],
					minify: true,
					sourcemap: isDevelopment,
					target: `es2020`,
					write: false,
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
					bundle: true,
					entryPoints: [url],
					minify: true,
					sourcemap: isDevelopment,
					target: `es2020`,
					write: false,
				})

				return mainOutputFile.text
			}
		},
		outputFileExtension: `js`,
	})

	// png
	config.addTemplateFormats(`png`)

	config.addExtension(`png`, {
		/** @type {import('@11ty/eleventy/src/Engines/TemplateEngine')['compile']} */
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
						/** @type {import('@11ty/eleventy-img').BaseImageOptions['filenameFormat']} */
						filenameFormat: (_id, source, _width, format) => {
							let extension = path.extname(source)
							let name = path.basename(source, extension)

							return `${name}.${format}`
						},
						formats: [`webp`, `avif`],
						outputDir: `build/images`,
					})
				}

				return originalImg.buffer
			}
		},
		outputFileExtension: `png`,
	})

	// svg
	config.addTemplateFormats(`svg`)

	config.addExtension(`svg`, {
		/** @type {import('@11ty/eleventy/src/Engines/TemplateEngine')['compile']} */
		compile: (content, url) => {
			return () => {
				if (url === `./source/images/icons/icon.svg`) {
					return content
				}

				return svgo.optimize(content).data
			}
		},
		outputFileExtension: `svg`,
	})

	return {
		dataTemplateEngine: `njk`,
		dir: {
			data: `data`,
			includes: `includes`,
			input: `source`,
			layouts: `layouts`,
			output: `build`,
		},
		htmlTemplateEngine: `njk`,
		markdownTemplateEngine: `njk`,
		passthroughFileCopy: true,
		templateFormats: [`md`, `njk`],
	}
}

module.exports = init
