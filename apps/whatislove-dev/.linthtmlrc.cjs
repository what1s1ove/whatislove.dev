/** @type {import('@linthtml/linthtml').LinterConfig} */
let config = {
	'attr-name-ignore-regex': false,
	'extends': `linthtml-config-htmlacademy`,
	'id-class-ignore-regex': false,
	'line-max-len-ignore-regex': false,
	'maxerr': false,
	'raw-ignore-regex': false,
	'rules': {
		'doctype-first': false,
	},
	'text-ignore-regex': false,
}

module.exports = config
