import reactPlugin from '@vitejs/plugin-react'
import { join } from 'node:path'
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
				replacement: join(import.meta.dirname, `src`),
			},
		],
	},
})

export default config
