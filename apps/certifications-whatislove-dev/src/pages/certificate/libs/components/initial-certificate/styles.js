import aeroport400 from '~/assets/fonts/aeroport-400.ttf'
import aeroport500 from '~/assets/fonts/aeroport-500.ttf'
import aeroport700 from '~/assets/fonts/aeroport-700.ttf'
import { createPdfStyles, registerFonts } from '~/libs/helpers/helpers.js'

registerFonts({
	family: `Aeroport`,
	fonts: [
		{
			fontWeight: 400,
			src: aeroport400,
		},
		{
			fontWeight: 500,
			src: aeroport500,
		},
		{
			fontWeight: 700,
			src: aeroport700,
		},
	],
})

let styles = createPdfStyles({
	background: {
		height: `100%`,
		left: 0,
		minHeight: `100%`,
		minWidth: `100%`,
		position: `absolute`,
		top: 0,
		width: `100%`,
	},
	bodyDate: {
		fontSize: 25,
	},
	bodyIntro: {
		fontSize: 25,
	},
	bodyName: {
		color: `#FD290D`,
		fontSize: 50,
		fontWeight: 700,
		lineHeight: 1.1,
		marginBottom: 15,
	},
	bodyWrapper: {
		marginBottom: 30,
	},
	footerName: {
		fontSize: 18,
		fontWeight: 500,
		marginBottom: 2,
	},
	footerWrapper: {
		flexDirection: `row`,
	},
	logo: {
		marginRight: 15,
		width: 65,
	},
	logoText: {
		fontSize: 35,
		fontWeight: 500,
	},
	logoWrapper: {
		alignItems: `center`,
		flexDirection: `row`,
		marginBottom: 30,
	},
	manager: {},
	managerName: {
		fontSize: 28,
		fontWeight: 500,
	},
	managerTitle: {
		fontSize: 25,
	},
	mentors: {
		width: `50%`,
	},
	mentorsTitle: {
		fontSize: 25,
		marginBottom: 10,
	},
	page: {
		color: `#1F1A19`,
		flexGrow: 1,
		fontFamily: `Aeroport`,
		fontWeight: 400,
	},
	seal: {
		left: 55,
		position: `absolute`,
		top: 30,
		transform: `rotate(14.75deg)`,
		width: 165,
	},
	signature: {
		left: 0,
		position: `absolute`,
		top: 80,
		width: 110,
	},
	userName: {
		color: `#FD290D`,
		fontSize: 50,
		fontWeight: 700,
		width: 10_000,
	},
	userNameIntro: {
		fontSize: 25,
	},
	userNameWrapper: {
		marginBottom: 25,
	},
	wrapper: {
		padding: `55px 65px 10px`,
	},
})

export { styles }
