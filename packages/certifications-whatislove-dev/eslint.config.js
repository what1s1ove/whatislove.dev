import react from 'eslint-plugin-react'

import baseConfig from '../../eslint.config.js'

/** @typedef {import('eslint').Linter.FlatConfig} */
let FlatConfig

/** @type {FlatConfig} */
let ignoresConfig = {
	ignores: [`build`],
}

/** @type {FlatConfig} */
let reactConfig = {
	files: [`**/*.jsx`],
	plugins: {
		react,
	},
	rules: react.configs[`jsx-runtime`].rules,
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
let config = [ignoresConfig, ...baseConfig, reactConfig, ...overridesConfigs]

export default config
