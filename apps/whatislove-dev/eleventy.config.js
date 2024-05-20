import Image from '@11ty/eleventy-img'
import rss from '@11ty/eleventy-plugin-rss'
import shikiHighlight from '@shikijs/markdown-it'
import { getISODate } from '@whatislove.dev/shared'
import browserslist from 'browserslist'
import esbuild from 'esbuild'
import htmlMin from 'html-minifier-terser'
import * as lightningcss from 'lightningcss'
import { parseHTML } from 'linkedom'
import markdownIt from 'markdown-it'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import svgo from 'svgo'

import { addToc } from './src/transforms/transforms.js'

/** @typedef {import('11ty__eleventy-img').ImageFormatWithAliases} */
let ImageFormatWithAliases
/** @typedef {import('./package.json')} */
let PackageJson
/** @typedef {import('./src/database.json')} */
let Database

let TRANSFORMS = /** @type {const} */ ([addToc])

let Path = /** @type {const} */ ({
	COPY: [
		`./src/fonts`,
		`./src/files`,
		`./src/sounds`,
		`./src/manifest.webmanifest`,
		`./src/images/favicons`,
		`./src/robots.txt`,
		`src/articles/**/*.!(md)`,
	],
	CSS: `./src/styles/index.css`,
	DB: `./src/database.json`,
	JS: `./src/scripts/index.js`,
	PAGE: {
		FORM: `./src/pages/form`,
	},
})

let CollectionPath = /** @type {const} */ ({
	ARTICLES: `src/articles/*/index.md`,
	PAGES: `src/pages/!(404)/index.njk`,
})

let isDevelopment = process.env[`NODE_ENV`] === `development`
let rawPackageJson = await readFile(new URL(`package.json`, import.meta.url))
let packageJson = /** @type {(text: string) => PackageJson} */ (JSON.parse)(
	rawPackageJson.toString(),
)
let md = markdownIt({
	html: true,
})

md.use(
	await shikiHighlight({
		themes: {
			dark: `github-dark`,
			light: `github-light`,
		},
	}),
)

/**
 * @param {import('@11ty/eleventy').UserConfig} config
 * @returns {Record<string, unknown>}
 */
let init = (config) => {
	// ignores
	if (!isDevelopment) {
		config.ignores.add(Path.PAGE.FORM)
	}

	config.addCollection(`articles`, (collections) => {
		return collections.getFilteredByGlob(CollectionPath.ARTICLES)
	})
	config.addCollection(`sitemap`, (collectionApi) => {
		return collectionApi.getFilteredByGlob([
			CollectionPath.ARTICLES,
			CollectionPath.PAGES,
		])
	})

	// libraries
	config.setLibrary(`md`, md)

	// plugins
	config.addPlugin(rss)

	// copy
	for (let url of Path.COPY) {
		config.addPassthroughCopy(url)
	}

	// api
	config.addTemplateFormats(`json`)

	config.addExtension(`json`, {
		/**
		 * @param {string} _content
		 * @param {string} url
		 */
		compile: async (_content, url) => {
			if (url !== Path.DB) {
				return
			}

			let rawDatabase = await readFile(Path.DB)
			let database = /** @type {(text: string) => Database} */ (
				JSON.parse
			)(rawDatabase.toString())

			let isFolderExists = existsSync(`build/api`)

			if (!isFolderExists) {
				await mkdir(`build/api`)
			}

			await Promise.all(
				Object.keys(database).map((databaseKey) => {
					let payload = JSON.stringify(
						database[/** @type {keyof Database} */ (databaseKey)],
					)

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

	config.addTransform(`html-transform`, (content, path) => {
		if (path.endsWith(`.html`)) {
			let window = parseHTML(content)

			for (let transform of TRANSFORMS) {
				transform(window)
			}

			return String(window.document)
		}

		return content
	})

	// css
	config.addTemplateFormats(`css`)

	config.addExtension(`css`, {
		/**
		 * @param {string} _content
		 * @param {string} url
		 * @returns {void | (() => Promise<string>)}
		 */
		compile: (_content, url) => {
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

				if (map) {
					return `${code.toString()}\n/*# sourceMappingURL=data:application/json;base64,${btoa(
						map.toString(),
					)}*/`
				}

				return code.toString()
			}
		},
		outputFileExtension: `css`,
	})

	// js
	config.addTemplateFormats(`js`)

	config.addExtension(`js`, {
		/**
		 * @param {string} _content
		 * @param {string} url
		 * @returns {void | (() => Promise<string>)}
		 */
		compile: (_content, url) => {
			if (url !== Path.JS) {
				return
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

				return /** @type {esbuild.OutputFile} */ (mainOutputFile).text
			}
		},
		outputFileExtension: `js`,
	})

	// png
	config.addTemplateFormats(`png`)

	config.addExtension(`png`, {
		/**
		 * @param {string} _content
		 * @param {string} url
		 * @returns {Promise<void>}
		 */
		compile: async (_content, url) => {
			let isPhoto = url.includes(`.photo.`)
			let formats = /** @type {ImageFormatWithAliases[]} */ ([`png`])

			if (isPhoto) {
				formats.push(`webp`, `avif`)
			}

			await Image(url, {
				/**
				 * @param {string} _id
				 * @param {string} source
				 * @param {number} _width
				 * @param {string} format
				 * @returns {string}
				 */
				filenameFormat: (_id, source, _width, format) => {
					let extension = path.extname(source)
					let name = path.basename(source, extension)

					return `${name}.${format}`
				},
				formats,
				outputDir: `build/images`,
			})
		},
		outputFileExtension: `png`,
	})

	// jpg
	config.addTemplateFormats(`jpg`)

	config.addExtension(`jpg`, {
		/**
		 * @param {string} _content
		 * @param {string} url
		 * @returns {Promise<void>}
		 */
		compile: async (_content, url) => {
			let isPhoto = url.includes(`.photo.`)
			let formats = /** @type {ImageFormatWithAliases[]} */ ([`jpg`])

			if (isPhoto) {
				formats.push(`webp`, `avif`)
			}

			await Image(url, {
				/**
				 * @param {string} _id
				 * @param {string} source
				 * @param {number} _width
				 * @param {string} format
				 * @returns {string}
				 */
				filenameFormat: (_id, source, _width, format) => {
					let extension = path.extname(source)
					let name = path.basename(source, extension)

					return `${name}.${format}`
				},
				formats,
				outputDir: `build/images`,
			})
		},
		outputFileExtension: `jpg`,
	})

	// svg
	config.addTemplateFormats(`svg`)

	config.addExtension(`svg`, {
		/**
		 * @param {string} content
		 * @returns {() => string}
		 */
		compile: (content) => {
			return () => {
				return svgo.optimize(content).data
			}
		},
		outputFileExtension: `svg`,
	})

	// filters

	config.addFilter(`dateISO`, (value) => {
		return getISODate(/** @type {Date} */ (value))
	})

	config.addFilter(`dateFormatted`, (value) => {
		return /** @type {Date} */ (value).toLocaleString(`en-US`, {
			day: `numeric`,
			month: `short`,
			year: `numeric`,
		})
	})

	return {
		dir: {
			data: `data`,
			includes: `includes`,
			input: `src`,
			layouts: `layouts`,
			output: `build`,
		},
		htmlTemplateEngine: `njk`,
		markdownTemplateEngine: `njk`,
	}
}

export default init
