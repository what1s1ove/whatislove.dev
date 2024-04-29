import { default as baseConfig } from '../../lint-staged.config.js'

/** @type {import('lint-staged').Config} */
let config = {
	...baseConfig,
	'**/*.js': [
		() => `npm run ci:lint:js -w apps/careers-whatislove-dev`,
		() => `npm run ci:lint:type -w apps/careers-whatislove-dev`,
	],
}

export default config
