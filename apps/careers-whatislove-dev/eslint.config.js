import lit from 'eslint-plugin-lit'
import litA11y from 'eslint-plugin-lit-a11y'
import wc from 'eslint-plugin-wc'

import baseConfig from '../../eslint.config.js'

/** @typedef {import('eslint').Linter.Config} */
let Config
/** @typedef {import('eslint').Linter.RulesRecord} */
let RulesRecord

/** @type {Config} */
let ignoresConfig = {
	ignores: [`build`],
}

/** @type {Config} */
let litConfig = {
	plugins: {
		lit,
	},
	rules: /** @type {RulesRecord} */ (lit.configs.all.rules),
}

let litA11yConfig = {
	plugins: {
		'lit-a11y': litA11y,
	},
	rules: litA11y.configs.recommended.rules,
}

/** @type {Config} */
let wcConfig = {
	plugins: {
		wc,
	},
	rules: {
		...wc.configs[`best-practice`].rules,
		'wc/guard-super-call': [`off`],
	},
}

/** @type {Config[]} */
let overridesConfigs = [
	{
		files: [`vite.config.js`],
		rules: {
			'import/no-default-export': [`off`],
		},
	},
]

/** @type {Config[]} */
let config = [
	ignoresConfig,
	...baseConfig,
	litConfig,
	litA11yConfig,
	wcConfig,
	...overridesConfigs,
]

export default config
