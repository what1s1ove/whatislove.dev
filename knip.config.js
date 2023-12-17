/** @typedef {import('knip/dist').KnipConfig} KnipConfig */

/** @type {KnipConfig} */
let config = {
	entry: [
		`source/scripts/index.js`,
		`eleventy.config.cjs`,
		`.linthtmlrc.cjs`,
	],
	ignore: [`source/data/**/*.cjs`],
	ignoreDependencies: [`linthtml-config-htmlacademy`],
}

export default config
