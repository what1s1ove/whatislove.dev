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
		},
		'packages/shared': {
			includeEntryExports: true,
		},
	},
}

export default config
