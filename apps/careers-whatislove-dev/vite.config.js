import { join } from 'node:path'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'

/** @type {import('vite').UserConfig} */
let config = defineConfig({
	build: {
		cssMinify: `lightningcss`,
		outDir: `build`,
	},
	css: {
		transformer: `lightningcss`,
	},
	plugins: [
		babel({
			babelConfig: {
				plugins: [
					[
						`@babel/plugin-proposal-decorators`,
						{
							version: `2023-05`,
						},
					],
				],
			},
		}),
	],
	resolve: {
		alias: [
			{
				find: `~`,
				replacement: join(import.meta.dirname, `src`),
			},
		],
	},
})

export default config
