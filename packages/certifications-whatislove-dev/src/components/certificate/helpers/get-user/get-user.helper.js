import { CertificationType } from '~/common/enums/enums.js'
import { OneOf, User } from '~/common/types/types.js'
import usersDB from '~/database.json'

/**
 * @param {OneOf<typeof CertificationType>} certificationType
 * @param {string} id
 * @returns {User | undefined}
 */
let getUser = (certificationType, id) => {
	let usersByAcademy = /** @type {User[]} */ (usersDB[certificationType])

	return usersByAcademy.find((it) => it.id === id)
}

export { getUser }
