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
		files: [
			`src/libs/helpers/get-random-number/get-random-number.helper.js`,
			`src/libs/helpers/get-shuffled-items/get-shuffled-items.helper.js`,
		],
		rules: {
			'sonarjs/pseudo-random': [`off`],
		},
	},
]

/** @type {Config[]} */
let config = [ignoresConfig, ...baseConfig, ...overridesConfigs]

export default config
