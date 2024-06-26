import { CertificationPayload, FC, User } from '~/libs/types/types.js'

import { InitialCertificate } from '../initial-certificate/initial-certificate.jsx'

/**
 * @typedef {{
 * 	user: User
 * }}
 */
let Properties

/** @type {FC<Properties>} */
let Nodejs2022 = ({ user }) => {
	/** @type {CertificationPayload} */
	let certificationPayload = {
		completeDate: user.completeDate,
		manager: `Vladyslav Zubko`,
		mentors: [`Vladyslav Zubko`],
		title: `Node.js. \nDevelopment \nof App Servers \nand API`,
		userName: `${user.firstName} ${user.lastName}`,
	}

	return <InitialCertificate payload={certificationPayload} />
}

export { Nodejs2022 }
