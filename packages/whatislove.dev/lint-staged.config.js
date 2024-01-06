import { default as baseConfig } from '../../lint-staged.config.js'

/** @type {import('lint-staged').Config} */
let config = {
	...baseConfig,
	'**/*.css': [() => `npm run ci:lint:css`],
	'**/*.js': [() => `npm run ci:lint:js`, () => `npm run ci:lint:type`],
	'**/*.njk': [() => `npm run ci:lint:html`, () => `npm run ci:lint:bem`],
}

export default config
