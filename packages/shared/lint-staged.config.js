import { default as baseConfig } from '../../lint-staged.config.js'

/** @type {import('lint-staged').Config} */
let config = {
	...baseConfig,
	'**/*.js': [
		() => `npm run ci:lint:js -w packages/shared`,
		() => `npm run ci:lint:type -w packages/shared`,
	],
}

export default config
