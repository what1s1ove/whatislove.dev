import { default as baseConfig } from '../../lint-staged.config.js'

/** @type {import('lint-staged').Config} */
let config = {
	...baseConfig,
	'**/*.js': [() => `npm run ci:lint:js`, () => `npm run ci:lint:type`],
}

export default config
