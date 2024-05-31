import { default as baseConfig } from '../../lint-staged.config.js'

/** @type {import('lint-staged').Config} */
let config = {
	...baseConfig,
	'**/*.css': [() => `npm run ci:lint:css -w apps/whatislove-dev`],
	'**/*.js': [
		() => `npm run ci:lint:js -w apps/whatislove-dev`,
		() => `npm run ci:lint:type -w apps/whatislove-dev`,
	],
	'**/*.njk': [
		() => `npm run ci:lint:bem -w apps/whatislove-dev`,
		() => `npm run ci:lint:html -w apps/whatislove-dev`,
		() => `npm run ci:lint:markup -w apps/whatislove-dev`,
	],
}

export default config
