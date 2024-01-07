/** @type {import('knip').KnipConfig} */
let config = {
	workspaces: {
		'packages/certifications-whatislove-dev': {
			entry: [`src/index.jsx`],
		},
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
