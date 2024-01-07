import { default as baseConfig } from '../../lint-staged.config.js'

/** @type {import('lint-staged').Config} */
let config = {
	...baseConfig,
	'**/*.{js,jsx}': [() => `npm run ci:lint:js`, () => `npm run ci:lint:type`],
	'**/*.css': [() => `npm run ci:lint:css`],
}

export default config
