import baseConfig from '../../eslint.config.js'

/** @typedef {import('eslint').Linter.FlatConfig} */
let FlatConfig

/** @type {FlatConfig} */
let ignoresConfig = {
	ignores: [`build`],
}

/** @type {FlatConfig[]} */
let config = [ignoresConfig, ...baseConfig]

export default config
