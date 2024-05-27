let domain = `https://whatislove.dev`
let host = new URL(domain).host

let data = {
	author: `Vladyslav Zubko`,
	channelUrl: `https://t.me/whatislove_dev`,
	currentYear: new Date().getFullYear(),
	description: `Avid explorer of the World, enamored with digital tech, especially the Web, passionate about learning, mentoring, and connecting with others`,
	domain,
	email: `hello@${host}`,
	host,
	lang: `en`,
	repo: `https://github.com/what1s1ove/whatislove.dev`,
	socials: [
		{
			key: `github`,
			name: `GitHub`,
			url: `https://github.com/what1s1ove`,
		},
		{
			key: `linkedin`,
			name: `LinkedIn`,
			url: `https://www.linkedin.com/in/what1s1ove`,
		},
		{
			key: `telegram`,
			name: `Telegram`,
			url: `https://t.me/dugga`,
		},
		{
			key: `twitter`,
			name: `Twitter`,
			url: `https://twitter.com/what1s1oveee`,
		},
	],
}

export default data
