/** @type {import('knip').KnipConfig} */
let config = {
	workspaces: {
		'apps/careers-whatislove-dev': {
			entry: [`src/index.js`],
			ignoreDependencies: [`@babel/plugin-proposal-decorators`],
		},
		'apps/certifications-whatislove-dev': {
			entry: [`src/index.jsx`],
		},
		'apps/whatislove-dev': {
			eleventy: {
				config: `eleventy.config.js`,
				entry: [`src/data/**/*.js`],
			},
			entry: [`src/scripts/index.js`],
			linthtml: {
				config: `linthtml.config.js`,
			},
		},
		'packages/shared': {
			entry: [`src/index.js`],
		},
	},
}

export default config
