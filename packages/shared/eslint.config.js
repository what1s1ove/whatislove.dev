import baseConfig from '../../eslint.config.js'

/** @typedef {import('eslint').Linter.Config} */
let Config

/** @type {Config} */
let ignoresConfig = {
	ignores: [`build`],
}

/** @type {Config[]} */
let config = [ignoresConfig, ...baseConfig]

export default config
