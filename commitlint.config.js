import { RuleConfigSeverity } from '@commitlint/types'

import { ProjectPrefix } from './project.config.js'

/** @type {import('@commitlint/types').UserConfig} */
let configuration = {
	extends: [`@commitlint/config-conventional`],
	parserPreset: {
		parserOpts: {
			issuePrefixes: ProjectPrefix.APPS.map((it) => `${it}-`),
		},
	},
	rules: {
		'references-empty': [RuleConfigSeverity.Error, `never`],
	},
}

export default configuration
