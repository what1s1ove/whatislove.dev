/** @typedef {import('lint-staged').Config} Config */

/** @type {Config} */
let config = {
	'*': [
		`npm run ci:lint:editor`,
		`npm run ci:lint:fs`,
		`bash -c 'npm run ci:lint:trash'`,
	],
	'*.{json,md,yml,njk,css,js,cjs,d.ts}': [`npm run ci:lint:format`],
	'*.css': [`npm run ci:lint:css`],
	'*.js': [`npm run ci:lint:js`, `bash -c 'npm run ci:lint:type'`],
	'*.njk': [`npm run ci:lint:html`, `npm run ci:lint:bem`],
}

export default config
