import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

import baseConfig from '../../eslint.config.js'

/** @typedef {import('eslint').Linter.Config} */
let Config
/** @typedef {import('eslint').ESLint.Plugin} */
let Plugin

/** @type {Config} */
let ignoresConfig = {
	ignores: [`build`],
}

/** @type {Config} */
let reactConfig = {
	files: [`**/*.jsx`],
	plugins: {
		react,
	},
	rules: {
		...react.configs.recommended.rules,
		...react.configs[`jsx-runtime`].rules,
		'react/prop-types': [`off`],
	},
	settings: {
		react: {
			version: `detect`,
		},
	},
}

/** @type {Config} */
let reactHooksConfig = {
	files: [`**/*.jsx`],
	plugins: {
		'react-hooks': /** @type {Plugin} */ (reactHooks),
	},
	rules: reactHooks.configs[`recommended-latest`].rules,
}

/** @type {Config} */
let jsxA11yConfig = {
	files: [`**/*.jsx`],
	plugins: {
		'jsx-a11y': jsxA11y,
	},
	rules: {
		...jsxA11y.flatConfigs.strict.rules,
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
	reactConfig,
	reactHooksConfig,
	jsxA11yConfig,
	...overridesConfigs,
]

export default config
