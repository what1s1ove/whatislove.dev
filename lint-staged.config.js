/** @type {import('lint-staged').Config} */
let config = {
	'*': [
		() => `npm run ci:lint:editor`,
		() => `npm run ci:lint:fs`,
		() => `npm run ci:lint:trash`,
	],
	'*.{md,json,yml,html,njk,css,js,jsx,cjs,d.ts}': [
		() => `npm run ci:lint:format`,
	],
}

export default config
