import { default as baseConfig } from '../../lint-staged.config.js'

/** @type {import('lint-staged').Config} */
let config = {
	...baseConfig,
	'**/*.{js,jsx}': [
		() => `npm run ci:lint:js -w apps/certifications-whatislove-dev`,
		() => `npm run ci:lint:type -w apps/certifications-whatislove-dev`,
	],
	'**/*.css': [
		() => `npm run ci:lint:css -w apps/certifications-whatislove-dev`,
	],
}

export default config
