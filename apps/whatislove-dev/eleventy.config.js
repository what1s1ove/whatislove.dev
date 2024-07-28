import Image from '@11ty/eleventy-img'
import rss from '@11ty/eleventy-plugin-rss'
import shikiHighlight from '@shikijs/markdown-it'
import {
	getFormattedDate,
	getISODate,
	getShuffledItems,
} from '@whatislove.dev/shared'
import browserslist from 'browserslist'
import ogImage from 'eleventy-plugin-og-image'
import esbuild from 'esbuild'
import htmlMin from 'html-minifier-terser'
import * as lightningcss from 'lightningcss'
import { parseHTML } from 'linkedom'
import markdownIt from 'markdown-it'
import fsSync from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import svgo from 'svgo'

import { default as environment } from './src/data/environment.js'
import {
	addToc,
	changeExternalLinkTarget,
	replaceImgWrapper,
} from './src/transforms/transforms.js'

/** @typedef {import('./package.json')} */
let PackageJson
/** @typedef {import('./src/database.json')} */
let Database

let TRANSFORMS = /** @type {const} */ ([
	addToc,
	changeExternalLinkTarget,
	replaceImgWrapper,
])

let Path = /** @type {const} */ ({
	COPY: [
		`./src/fonts`,
		`./src/files`,
		`./src/sounds`,
		`./src/manifest.webmanifest`,
		`./src/images`,
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

let rawPackageJson = await fs.readFile(new URL(`package.json`, import.meta.url))
let packageJson = /** @type {(text: string) => PackageJson} */ (JSON.parse)(
	rawPackageJson.toString(),
)
let md = markdownIt({
	html: true,
})

md.use(
	await shikiHighlight({
		defaultColor: false,
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
	if (environment.APP.FLAGS.IS_PRODUCTION) {
		config.ignores.add(Path.PAGE.FORM)
	}

	// server
	config.setServerOptions({
		showAllHosts: true,
	})

	// collections
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

	config.addPlugin(ogImage, {
		outputDir: `images/covers`,
		/**
		 * @param {{
		 * 	data: {
		 * 		page: {
		 * 			fileSlug: string
		 * 		}
		 * 	}
		 * }} ogImage
		 * @returns {string}
		 */
		outputFileSlug: (ogImage) => ogImage.data.page.fileSlug,
		satoriOptions: {
			fonts: [400, 700].map((weight) => ({
				data: fsSync.readFileSync(
					new URL(
						`src/fonts/red-hat-display-${weight.toString()}.woff`,
						import.meta.url,
					),
				),
				name: `Red Hat Display`,
				style: `normal`,
				weight,
			})),
		},
		/**
		 * @param {{
		 * 	outputUrl: () => Promise<string>
		 * }} ogImage
		 * @returns {Promise<string>}
		 */
		shortcodeOutput: (ogImage) => ogImage.outputUrl(),
	})

	// filters
	config.addFilter(`dateISO`, (value) => {
		return getISODate(/** @type {Date} */ (value))
	})

	config.addFilter(`dateFormatted`, (value) => {
		return getFormattedDate(/** @type {Date} */ (value), `M_D_YEAR`)
	})

	config.addFilter(`shuffle`, (items) => {
		return getShuffledItems(/** @type {unknown[]} */ (items))
	})

	// shortcodes
	config.addNunjucksAsyncShortcode(
		`inlineImage`,
		/**
		 * @param {string} url
		 * @returns {Promise<string>}
		 */
		async (url) => {
			let extension = path.extname(url).slice(1)
			let imgPath = path.join(config.dir.input, url)
			let base64Image = await fs.readFile(imgPath, `base64`)

			if (extension === `svg`) {
				extension = `svg+xml`
			}

			return `data:image/${extension};base64,${base64Image}`
		},
	)

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

			let rawDatabase = await fs.readFile(Path.DB)
			let database = /** @type {(text: string) => Database} */ (
				JSON.parse
			)(rawDatabase.toString())

			let isFolderExists = fsSync.existsSync(`build/api`)

			if (!isFolderExists) {
				await fs.mkdir(`build/api`)
			}

			await Promise.all(
				Object.keys(database).map((databaseKey) => {
					let payload = JSON.stringify(
						database[/** @type {keyof Database} */ (databaseKey)],
					)

					return fs.writeFile(
						`build/api/${databaseKey}.json`,
						payload,
					)
				}),
			)
		},
		outputFileExtension: `json`,
	})

	// html
	config.addTransform(`html-minify`, async (content, url) => {
		if (url.endsWith(`.html`)) {
			return await htmlMin.minify(content, {
				collapseBooleanAttributes: true,
				collapseWhitespace: true,
				removeComments: true,
			})
		}

		return content
	})

	config.addTransform(`html-transform`, (content, url) => {
		if (url.endsWith(`.html`)) {
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
					sourceMap: environment.APP.FLAGS.IS_DEVELOPMENT,
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
					sourcemap: environment.APP.FLAGS.IS_DEVELOPMENT,
					target: `es2020`,
					write: false,
				})

				return /** @type {esbuild.OutputFile} */ (mainOutputFile).text
			}
		},
		outputFileExtension: `js`,
	})

	// images
	config.addPlugin(Image.eleventyImageTransformPlugin, {
		defaultAttributes: {
			decoding: `async`,
			loading: `lazy`,
			sizes: [`(min-width: 740px) 700px`, `100vw`],
		},
		extensions: `html`,
		/**
		 * @param {string} _id
		 * @param {string} source
		 * @param {number} width
		 * @param {string} format
		 * @returns {string}
		 */
		filenameFormat: (_id, source, width, format) => {
			let extension = path.extname(source)
			let name = path.basename(source, extension)

			return `${name}-${width.toString()}w.${format.toString()}`
		},
		formats: [`avif`, `webp`, `png`],
		widths: [640, 960, 1280, 1920, 2560],
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

	return {
		dir: {
			data: `data`,
			includes: `includes`,
			input: `src`,
			layouts: `layouts`,
			output: `build`,
		},
		htmlTemplateEngine: `njk`,
		markdownTemplateEngine: false,
	}
}

export default init
