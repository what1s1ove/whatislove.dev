/** @type {import('stylelint').Config} */
let config = {
	extends: [`stylelint-config-standard`, `stylelint-config-recess-order`],
	plugins: [`stylelint-use-logical-spec`],
	rules: {
		'color-named': `never`,
		'color-no-hex': true,
		'function-disallowed-list': [
			`/^rgba?$/`,
			`/^hsla?$/`,
			`hwb`,
			`lch`,
			`/^ok?lab$/`,
		],
		'liberty/use-logical-spec': `always`,
		'selector-class-pattern': `^([a-z]*)((_|-|__|--)[a-z]+)*$`,
	},
}

export default config
