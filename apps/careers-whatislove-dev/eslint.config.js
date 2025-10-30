import lit, { configs as litConfigs } from 'eslint-plugin-lit'
import litA11y from 'eslint-plugin-lit-a11y'
import wc, { configs as wsConfigs } from 'eslint-plugin-wc'

import baseConfig from '../../eslint.config.js'

/** @typedef {import('eslint').Linter.Config} */
let Config

/** @type {Config} */
let ignoresConfig = {
	ignores: [`build`],
}

/** @type {Config} */
let litConfig = {
	plugins: {
		lit,
	},
	rules: {
		...litConfigs.all.rules,
	},
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
		...wsConfigs[`best-practice`].rules,
	},
}

/** @type {Config[]} */
let overridesConfigs = [
	{
		files: [
			`src/pages/root/libs/components/screen-process/libs/constants/process-phrase-timestamps.constant.js`,
		],
		rules: {
			'@typescript-eslint/no-magic-numbers': [`off`],
		},
	},
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
