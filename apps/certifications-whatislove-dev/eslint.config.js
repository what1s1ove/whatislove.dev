import react from 'eslint-plugin-react'

import baseConfig from '../../eslint.config.js'

/** @typedef {import('eslint').Linter.Config} */
let Config
/** @typedef {import('eslint').ESLint.Plugin} */
let Plugin
/** @typedef {import('eslint').Linter.RulesRecord} */
let RulesRecord

/** @type {Config} */
let ignoresConfig = {
	ignores: [`build`],
}

/** @type {Config} */
let reactConfig = {
	files: [`**/*.jsx`],
	plugins: {
		react: /** @type {Plugin} */ (react),
	},
	rules: /** @type {RulesRecord} */ (react.configs.flat[`jsx-runtime`].rules),
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
let config = [ignoresConfig, ...baseConfig, reactConfig, ...overridesConfigs]

export default config
