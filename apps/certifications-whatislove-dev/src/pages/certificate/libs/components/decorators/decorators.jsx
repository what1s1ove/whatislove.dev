import { CertificationPayload, FC, User } from '~/libs/types/types.js'

import { InitialCertificate } from '../initial-certificate/initial-certificate.jsx'

/**
 * @typedef {{
 * 	user: User
 * }}
 */
let Properties

/** @type {FC<Properties>} */
let Decorators = ({ user }) => {
	/** @type {CertificationPayload} */
	let certificationPayload = {
		completeDate: user.completeDate,
		manager: `Vladyslav Zubko`,
		mentors: [`Vladyslav Zubko`],
		title: `ECMAScript \nDecor@tors. \nthe Ones \nthat are Real`,
		userName: `${user.firstName} ${user.lastName}`,
	}

	return <InitialCertificate payload={certificationPayload} />
}

export { Decorators }
