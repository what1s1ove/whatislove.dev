let process = require(`node:process`)

let isDevelopmentMode = process.env.NODE_ENV === `development`

module.exports = {
	description: `Interface Developer`,
	domain: `https://whatislove.dev`,
	isDevelopmentMode,
	title: `Vladyslav Zubko`,
}
