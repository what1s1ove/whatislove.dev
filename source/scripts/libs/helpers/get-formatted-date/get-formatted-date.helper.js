/**
 * @param {string | null} date
 * @returns {string}
 */
let getFormattedDate = (date) => {
	if (!date) {
		return ``
	}

	return new Date(date).toLocaleDateString(`en`, {
		month: `short`,
		year: `numeric`,
	})
}

export { getFormattedDate }
