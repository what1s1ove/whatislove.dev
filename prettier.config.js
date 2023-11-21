/** @type {import('prettier').Config} */
let config = {
	arrowParens: `always`,
	bracketSpacing: true,
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
				'parser': `html`,
			},
		},
	],
	plugins: [`prettier-plugin-jsdoc`],
	printWidth: 80,
	quoteProps: `preserve`,
	semi: false,
	singleQuote: true,
	trailingComma: `all`,
}

export default config
