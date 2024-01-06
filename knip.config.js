/** @type {import('knip').KnipConfig} */
let config = {
	workspaces: {
		'packages/whatislove-dev': {
			eleventy: {
				config: `eleventy.config.js`,
				entry: [`src/data/**/*.js`],
			},
			entry: [`src/scripts/index.js`],
		},
	},
}

export default config
