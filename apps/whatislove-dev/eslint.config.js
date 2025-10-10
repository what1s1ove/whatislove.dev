import baseConfig from '../../eslint.config.js'

/** @typedef {import('eslint').Linter.Config} */
let Config

/** @type {Config} */
let ignoresConfig = {
	ignores: [`build`],
}

/** @type {Config[]} */
let overridesConfigs = [
	{
		files: [`src/data/**/*.js`, `eleventy.config.js`, `linthtml.config.js`],
		rules: {
			'import/no-default-export': [`off`],
		},
	},
	{
		files: [`eleventy.config.js`],
		rules: {
			'@typescript-eslint/no-base-to-string': [
				`error`,
				{
					ignoredTypeNames: [`Document`],
				},
			],
			'sonarjs/cognitive-complexity': [`off`],
		},
	},
	{
		files: [
			`src/scripts/libs/modules/whatislove-math/whatislove-math.package.js`,
		],
		rules: {
			'unicorn/no-static-only-class': [`off`],
		},
	},
]

/** @type {Config[]} */
let config = [ignoresConfig, ...baseConfig, ...overridesConfigs]

export default config
