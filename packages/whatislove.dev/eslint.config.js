import baseConfig from '../../eslint.config.js'

/** @typedef {import('eslint').Linter.FlatConfig} */
let FlatConfig

/** @type {FlatConfig[]} */
let overridesConfigs = [
	{
		files: [
			`src/data/**/*.js`,
			`eslint.config.js`,
			`eleventy.config.js`,
		],
		rules: {
			'import/no-default-export': [`off`],
		},
	},
	{
		files: [`eleventy.config.js`],
		rules: {
			'sonarjs/cognitive-complexity': [`off`],
		},
	},
	{
		files: [
			`src/scripts/libs/packages/whatislove-math/whatislove-math.package.js`,
		],
		rules: {
			'unicorn/no-static-only-class': [`off`],
		},
	},
]

/** @type {FlatConfig[]} */
let config = [
	...baseConfig,
	...overridesConfigs,
]

export default config
