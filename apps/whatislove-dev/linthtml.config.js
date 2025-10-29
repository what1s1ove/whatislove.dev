/** @type {import('@linthtml/linthtml').Config} */
let config = {
	extends: `linthtml-config-htmlacademy`,
	rules: {
		'htmlacademy/no-blocking-script': false,
		'htmlacademy/req-source-width-height': false,
		'no-surrounding-whitespace': false,
		'tag-close': false,
	},
}

export default config
