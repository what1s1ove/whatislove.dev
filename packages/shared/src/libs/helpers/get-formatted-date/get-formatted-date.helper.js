/** @typedef {'M_YEAR' | 'M_D_YEAR'} */
let DateFormat

/** @type {Record<DateFormat, Intl.DateTimeFormatOptions>} */
let dateFormatToDateFormatOptions = {
	M_D_YEAR: {
		day: `numeric`,
		month: `short`,
		year: `numeric`,
	},
	M_YEAR: {
		month: `short`,
		year: `numeric`,
	},
}

/**
 * @param {Date | string} date
 * @param {DateFormat} dateFormat
 * @returns {string}
 */
let getFormattedDate = (date, dateFormat) => {
	/** @type {Intl.DateTimeFormatOptions} */
	let options = dateFormatToDateFormatOptions[dateFormat]

	return new Date(date).toLocaleDateString(`en-US`, options)
}

export { getFormattedDate }
