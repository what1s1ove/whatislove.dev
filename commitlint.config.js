import { RuleConfigSeverity } from '@commitlint/types'

let ISSUE_PREFIXES = /** @type {const} */ ([`wd`, `release`])
let DELIMITERS = /** @satisfies {string[]} */ (/** @type {const} */ ([`/`]))
let Scope = /** @type {const} */ ({
	APPS: [
		`careers-whatislove-dev`,
		`certifications-whatislove-dev`,
		`whatislove-dev`,
	],
	DEFAULT: `workspace`,
	PACKAGES: [`shared`],
	RELEASE: `release`,
})

/** @type {import('@commitlint/types').UserConfig} */
let configuration = {
	extends: [`@commitlint/config-conventional`],
	parserPreset: {
		parserOpts: {
			issuePrefixes: ISSUE_PREFIXES.map((prefix) => `${prefix}-`),
		},
	},
	rules: {
		'header-case': [RuleConfigSeverity.Error, `always`, `lower-case`],
		'header-trim': [RuleConfigSeverity.Error, `always`],
		'references-empty': [RuleConfigSeverity.Error, `never`],
		'scope-delimiter-style': [
			RuleConfigSeverity.Error,
			`always`,
			DELIMITERS,
		],
		'scope-empty': [RuleConfigSeverity.Error, `never`],
		'scope-enum': [
			RuleConfigSeverity.Error,
			`always`,
			{
				delimiters: DELIMITERS,
				scopes: [
					Scope.DEFAULT,
					Scope.RELEASE,
					...Scope.APPS,
					...Scope.PACKAGES,
				],
			},
		],
	},
}

export { Scope }
export default configuration
