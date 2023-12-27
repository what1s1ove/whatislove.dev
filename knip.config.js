/** @type {import('knip').KnipConfig} */
let config = {
	eleventy: {
		config: `eleventy.config.cjs`,
		entry: [`source/data/**/*.cjs`],
	},
	entry: [`source/scripts/index.js`],
}

export default config
