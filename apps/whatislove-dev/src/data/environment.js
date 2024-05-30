import 'dotenv/config'
import process from 'node:process'

let data = {
	API: {
		DEVTO_API_KEY: /** @type {string} */ (process.env[`DEVTO_API_KEY`]),
		WEBMENTION_API_KEY: /** @type {string} */ (
			process.env[`WEBMENTION_API_KEY`]
		),
	},
	COMMON: {
		ENVIRONMENT: /** @type {string} */ (process.env[`ENVIRONMENT`]),
	},
}

export default data
