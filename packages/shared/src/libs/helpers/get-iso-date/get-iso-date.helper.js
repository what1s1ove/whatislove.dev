/**
 * @param {Date | string} date
 * @returns {string}
 */
let getISODate = (date) => {
	let [isoDate] = new Date(date).toISOString().split(`T`)

	return /** @type {string} */ (isoDate)
}

export { getISODate }
