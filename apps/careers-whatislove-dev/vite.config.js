import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'

/** @type {import('vite').UserConfig} */
let config = defineConfig({
	build: {
		outDir: `build`,
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
				replacement: fileURLToPath(new URL(`src`, import.meta.url)),
			},
		],
	},
})

export default config
