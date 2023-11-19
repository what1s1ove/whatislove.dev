let { danger, fail } = require(`danger`)

let APP_PREFIX = /** @type {const} */ (`wd`)
let ENVIRONMENTS = /** @type {const} */ ([`production`, `development`])

let environmentsPattern = ENVIRONMENTS.join(`|`)

let Config = /** @type {const} */ ({
  BRANCH_PATTERN: new RegExp(
    `^((${APP_PREFIX})-[0-9]{1,6})-[a-zA-Z0-9-]+$|(${environmentsPattern})$`,
  ),
  IS_ASSIGNEE_REQUIRED: true,
  TITLE_PATTERN: new RegExp(
    `^((${APP_PREFIX})-[0-9]{1,6}): (.*\\S)$|(${environmentsPattern}) to (${environmentsPattern})$`,
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
