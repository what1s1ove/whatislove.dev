import { CertificationPayload, FC, User } from '~/libs/types/types.js'

import { InitialCertificate } from '../initial-certificate/initial-certificate.jsx'

/**
 * @typedef {{
 * 	user: User
 * }}
 */
let Properties

/** @type {FC<Properties>} */
let Bsa2022 = ({ user }) => {
	/** @type {CertificationPayload} */
	let certificationPayload = {
		completeDate: user.completeDate,
		manager: `Vladyslav Zubko`,
		mentors: [
			`Vladyslav Zubko`,
			`Andrii Fedorchenko`,
			`Pavlo Sukhinin`,
			`Yelyzaveta Veis`,
			`Volodymyr Minchenko`,
			`Yurii Ohorodnikov`,
		],
		title: `BSA2022. \nProfessional \nProject \nDevelopment`,
		userName: `${user.firstName} ${user.lastName}`,
	}

	return <InitialCertificate payload={certificationPayload} />
}

export { Bsa2022 }
