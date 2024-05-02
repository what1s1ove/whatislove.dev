/** @type {import('stylelint').Config} */
let config = {
	extends: [`stylelint-config-standard`, `stylelint-config-recess-order`],
	plugins: [`stylelint-use-logical-spec`],
	rules: {
		'color-hex-length': `long`,
		'liberty/use-logical-spec': `always`,
		'selector-class-pattern': `^([a-z]*)((_|-|__|--)[a-z]+)*$`,
	},
}

export default config
