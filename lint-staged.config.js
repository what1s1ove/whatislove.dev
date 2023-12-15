/** @typedef {import('lint-staged').Config} Config */

/** @type {Config} */
let config = {
	'*': `make ci-lint-editor ci-lint-fs`,
	'*.{json,md,yml,njk,css,js,cjs,d.ts}': `prettier --write`,
	'*.css': `make ci-lint-css`,
	'*.js': `make ci-lint-js ci-lint-type`,
	'*.njk': `make ci-lint-html ci-lint-bem`,
}

export default config
