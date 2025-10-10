/** @type {Record<string, import('lint-staged').GenerateTask[]>} */
let config = {
	'*': [
		() => `npm run ci:lint:format`,
		() => `npm run ci:lint:editor`,
		() => `npm run ci:lint:fs`,
		() => `npm run ci:lint:trash`,
	],
}

export default config
