/**
 * @param {string} date
 * @returns {string}
 */
let getFormattedDate = (date) => {
	return new Date(date)
		.toLocaleString(`en-US`, {
			day: `numeric`,
			month: `short`,
			year: `numeric`,
		})
		.replace(`.`, ``)
}

export { getFormattedDate }
