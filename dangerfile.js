import { danger, fail } from 'danger'

import { ProjectPrefix } from './project.config.js'

let appsPattern = ProjectPrefix.APPS.join(`|`)
let environmentsPattern = ProjectPrefix.ENVIRONMENTS.join(`|`)

let Config = /** @type {const} */ ({
  BRANCH_PATTERN: new RegExp(
    `^((${appsPattern})-[0-9]{1,6})-[a-zA-Z0-9-]+$|(${environmentsPattern})$`,
  ),
  IS_ASSIGNEE_REQUIRED: true,
  TITLE_PATTERN: new RegExp(
    `^((${appsPattern})-[0-9]{1,6}): (.*\\S)$|(${environmentsPattern}) to (${environmentsPattern})$`,
  ),
})

let isTitleValid = Config.TITLE_PATTERN.test(danger.github.pr.title)

if (!isTitleValid) {
  fail(
    `Pull Request title should match the following pattern – ${Config.TITLE_PATTERN}.`,
  )
}

let isBranchValid = Config.BRANCH_PATTERN.test(danger.github.pr.head.ref)

if (!isBranchValid) {
  fail(
    `Pull Request branch should match the following pattern – ${Config.BRANCH_PATTERN}.`,
  )
}

let hasAssignee = Boolean(danger.github.pr.assignee)

if (Config.IS_ASSIGNEE_REQUIRED && !hasAssignee) {
  fail(`Pull Request should have at least one assignee.`)
}
