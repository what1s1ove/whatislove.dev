/**
 * @param {{
 * 	apiPrefix?: string
 * 	host?: string
 * 	port?: number
 * }} params
 * @returns {string}
 */
let getServerApiUrl = ({ apiPrefix = ``, host = ``, port = 0 } = {}) => {
	return `${host}${port}${apiPrefix}`
}

export { getServerApiUrl }
