/** @type {import('knip').KnipConfig} */
let config = {
	eleventy: {
		config: `eleventy.config.js`,
		entry: [`source/data/**/*.js`],
	},
	entry: [`source/scripts/index.js`],
}

export default config
