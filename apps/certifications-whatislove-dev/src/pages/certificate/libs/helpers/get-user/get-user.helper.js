import usersDB from '~/database.json'
import { CertificationType } from '~/libs/enums/enums.js'
import { User, ValuesOf } from '~/libs/types/types.js'

/**
 * @param {ValuesOf<typeof CertificationType>} certificationType
 * @param {string} id
 * @returns {User | undefined}
 */
let getUser = (certificationType, id) => {
	let usersByAcademy = /** @type {User[]} */ (usersDB[certificationType])

	return usersByAcademy.find((it) => it.id === id)
}

export { getUser }
