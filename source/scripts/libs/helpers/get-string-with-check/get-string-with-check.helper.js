/**
 * @param {unknown} checkValue
 * @param {string} payload
 * @returns {string}
 */
let getStringWitCheck = (checkValue, payload) => {
	return checkValue ? payload : ``
}

export { getStringWitCheck }
