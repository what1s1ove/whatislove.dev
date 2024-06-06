/** @type {import('@linthtml/linthtml').Config} */
let config = {
	extends: `linthtml-config-htmlacademy`,
	rules: {
		'htmlacademy/no-blocking-script': false,
		'no-surrounding-whitespace': false,
		'tag-close': false,
	},
}

export default config
