/** @typedef {import('knip/dist').KnipConfig} KnipConfig */

/** @type {KnipConfig} */
let config = {
	entry: [`source/scripts/index.js`, `eleventy.config.js`, `.linthtmlrc.cjs`],
	ignore: [`source/data/**/*.js`],
	ignoreDependencies: [`linthtml-config-htmlacademy`],
}

export default config
