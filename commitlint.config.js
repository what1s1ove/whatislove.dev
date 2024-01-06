import { RuleConfigSeverity } from '@commitlint/types'

import { ProjectPrefix } from './project.config.js'

/** @type {import('@commitlint/types').UserConfig} */
let configuration = {
	extends: [`@commitlint/config-conventional`],
	parserPreset: {
		parserOpts: {
			issuePrefixes: ProjectPrefix.ISSUE_PREFIXES.map(
				(prefix) => `${prefix}-`,
			),
		},
	},
	rules: {
		'references-empty': [RuleConfigSeverity.Error, `never`],
		'scope-enum': [
			RuleConfigSeverity.Error,
			`always`,
			[...ProjectPrefix.SCOPES],
		],
	},
}

export default configuration
