import lit from 'eslint-plugin-lit'
import wc from 'eslint-plugin-wc'

import baseConfig from '../../eslint.config.js'

/** @typedef {import('eslint').Linter.FlatConfig} */
let FlatConfig

/** @type {FlatConfig} */
let ignoresConfig = {
	ignores: [`build`],
}

/** @type {FlatConfig} */
let typescriptPlugin = {
	rules: {
		'@typescript-eslint/no-unused-vars': [
			`error`,
			{
				varsIgnorePattern: `^_`,
			},
		],
	},
}

/** @type {FlatConfig} */
let litConfig = {
	plugins: {
		lit,
	},
	rules: lit.configs.all.rules,
}

/** @type {FlatConfig} */
let wcConfig = {
	plugins: {
		wc,
	},
	rules: {
		...wc.configs[`best-practice`].rules,
		'wc/guard-super-call': [`off`],
	},
}

/** @type {FlatConfig[]} */
let overridesConfigs = [
	{
		files: [`vite.config.js`],
		rules: {
			'import/no-default-export': [`off`],
		},
	},
]

/** @type {FlatConfig[]} */
let config = [
	ignoresConfig,
	...baseConfig,
	typescriptPlugin,
	litConfig,
	wcConfig,
	...overridesConfigs,
]

export default config
