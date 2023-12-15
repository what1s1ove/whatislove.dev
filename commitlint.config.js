import { RuleConfigSeverity } from '@commitlint/types'

import { ProjectPrefix } from './project.config.js'

/** @typedef {import('@commitlint/types').UserConfig} UserConfig */

/** @type {UserConfig} */
let configuration = {
	extends: [`@commitlint/config-conventional`],
	parserPreset: {
		parserOpts: {
			issuePrefixes: ProjectPrefix.APPS.map((prefix) => `${prefix}-`),
		},
	},
	rules: {
		'references-empty': [RuleConfigSeverity.Error, `never`],
	},
}

export default configuration
