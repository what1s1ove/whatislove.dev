import lintCommitlint from '@commitlint/lint'
import loadCommitlintConfig from '@commitlint/load'
import { danger, fail, schedule } from 'danger'

import { ProjectPrefix } from './project.config.js'

/** @returns {void} */
let checkPRAssignee = () => {
	let hasAssignee = Boolean(danger.github.pr.assignee)

	if (!hasAssignee) {
		fail(`This pull request should have at least one assignee.`)
	}
}

/** @returns {Promise<void>} */
let checkPRTitle = async () => {
	let commitLintConfig = await loadCommitlintConfig()
	let { errors, valid: isValid } = await lintCommitlint(
		danger.github.pr.title,
		commitLintConfig.rules,
		{ parserOpts: commitLintConfig.parserPreset?.parserOpts ?? {} },
	)

	if (!isValid) {
		let messageDetail = errors
			.map((error) => `${error.name}: ${error.message}`)
			.join(`, `)

		fail(
			`The pull request title should match the following rules: ${messageDetail}.`,
		)
	}
}

/** @returns {void} */
let checkPRBranch = () => {
	let githubDefaultBranchRegExp = new RegExp(/^[0-9]+(?:-[a-z]+)+$/)
	let releaseBranchRegExp = new RegExp(`^${ProjectPrefix.SCOPE.RELEASE}.*`)
	let regExps = [githubDefaultBranchRegExp, releaseBranchRegExp]
	let isValid = regExps.some((regExp) => {
		return regExp.test(danger.github.pr.head.ref)
	})

	if (!isValid) {
		let messageDetail = regExps.join(` or `)

		fail(
			`The pull request branch should match one of the following patterns: ${messageDetail}.`,
		)
	}
}

/** @returns {Promise<void>} */
let checkPR = async () => {
	await checkPRTitle()
	checkPRBranch()
	checkPRAssignee()
}

schedule(checkPR)
