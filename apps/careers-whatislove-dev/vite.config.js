import path from 'node:path'
import { defineConfig } from 'vite'

/** @type {import('vite').UserConfig} */
let config = defineConfig({
	build: {
		cssMinify: `lightningcss`,
		outDir: `build`,
	},
	css: {
		transformer: `lightningcss`,
	},
	esbuild: {
		exclude: [],
		include: /\.js$/,
		target: `es2024`,
	},
	resolve: {
		alias: [
			{
				find: `~`,
				replacement: path.join(import.meta.dirname, `src`),
			},
		],
	},
})

export default config
