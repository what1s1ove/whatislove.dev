import baseConfig from '../../lint-staged.config.js'

/** @type {import('lint-staged').Configuration} */
let config = {
	...baseConfig,
	'**/*.js': [
		() => `npm run ci:lint:js -w packages/shared`,
		() => `npm run ci:lint:type -w packages/shared`,
	],
}

export default config
