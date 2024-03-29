import reactPlugin from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
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
	plugins: [reactPlugin()],
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
