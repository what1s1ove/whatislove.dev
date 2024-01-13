/** @type {import('stylelint').Config} */
let config = {
	extends: [`stylelint-config-standard`, `stylelint-config-recess-order`],
	rules: {
		'color-hex-length': `long`,
		'selector-class-pattern': `^([a-z]*)((_|-|__|--)[a-z]+)*$`,
	},
}

export default config
