import 'dotenv/config'
import process from 'node:process'

let { DEVTO_API_KEY, ENVIRONMENT, WEBMENTION_API_KEY } = process.env

let data = {
	API: {
		DEVTO_API_KEY: /** @type {string} */ (DEVTO_API_KEY),
		WEBMENTION_API_KEY: /** @type {string} */ (WEBMENTION_API_KEY),
	},
	APP: {
		ENVIRONMENT: /** @type {string} */ (ENVIRONMENT),
		FLAGS: {
			IS_DEVELOPMENT: ENVIRONMENT === `development`,
			IS_PRODUCTION: ENVIRONMENT !== `development`,
		},
	},
}

export default data
