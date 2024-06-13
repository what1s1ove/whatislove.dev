import lit from 'eslint-plugin-lit'
import litA11y from 'eslint-plugin-lit-a11y'
import wc from 'eslint-plugin-wc'

import baseConfig from '../../eslint.config.js'

/** @typedef {import('eslint').Linter.FlatConfig} */
let FlatConfig

/** @type {FlatConfig} */
let ignoresConfig = {
	ignores: [`build`],
}

/** @type {FlatConfig} */
let litConfig = {
	plugins: {
		lit,
	},
	rules: lit.configs.all.rules,
}

let litA11yConfig = {
	plugins: {
		'lit-a11y': litA11y,
	},
	rules: litA11y.configs.recommended.rules,
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
	litConfig,
	litA11yConfig,
	wcConfig,
	...overridesConfigs,
]

export default config
