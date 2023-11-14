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
    'references-empty': [2, `never`],
  },
}

export default configuration
