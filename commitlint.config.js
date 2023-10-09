import { ProjectPrefix } from './project.config.js'

/** @type {import('@commitlint/types').UserConfig} */
const configuration = {
  parserPreset: {
    parserOpts: {
      issuePrefixes: ProjectPrefix.APPS.map((it) => `${it}-`),
    },
  },
  extends: [`@commitlint/config-conventional`],
  rules: {
    'references-empty': [2, `never`],
  },
}

export default configuration
