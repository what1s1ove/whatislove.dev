/** @type {import('knip').KnipConfig} */
let config = {
	workspaces: {
		'apps/careers-whatislove-dev': {
			entry: [`src/index.js`],
			ignore: [`build/**/*`],
			ignoreDependencies: [`@babel/plugin-proposal-decorators`],
		},
		'apps/certifications-whatislove-dev': {
			entry: [`src/index.jsx`],
			ignore: [`build/**/*`],
		},
		'apps/whatislove-dev': {
			eleventy: {
				config: `eleventy.config.js`,
				entry: [`src/data/**/*.js`],
			},
			entry: [`src/scripts/index.js`],
			ignore: [`build/**/*`],
			linthtml: {
				config: `linthtml.config.js`,
			},
		},
		'packages/shared': {
			entry: [`build/index.d.ts`],
			ignore: [`src/**/*`],
			includeEntryExports: true,
		},
	},
}

export default config
