/** @type {import('lint-staged').Config} */
let config = {
	'*': `make lint_editor lint_fs`,
	'*.{json,yml,njk,css,js,cjs,d.ts,}': `prettier --write`,
	'*.css': `make lint_css`,
	'*.js': `make lint_js lint_type`,
}

export default config
