/** @type {import('prettier').Config & Record<string, unknown>} */
let config = {
	arrowParens: `always`,
	bracketSpacing: true,
	jsdocAddDefaultToDescription: false,
	overrides: [
		{
			files: `*.css`,
			options: {
				singleQuote: false,
			},
		},
		{
			files: `*.njk`,
			options: {
				parser: `jinja-template`,
				printWidth: 9999,
			},
		},
	],
	plugins: [`prettier-plugin-jsdoc`, `prettier-plugin-jinja-template`],
	printWidth: 80,
	quoteProps: `consistent`,
	semi: false,
	singleQuote: true,
	trailingComma: `all`,
}

export default config
