import { join } from 'node:path'
import process from 'node:process'

process.loadEnvFile(join(import.meta.dirname, `../../`, `.env`))

let { DEVTO_API_KEY, ENVIRONMENT, WEBMENTION_API_KEY } = process.env

let isDevelopment = ENVIRONMENT === `development`

let data = {
	API: {
		DEVTO_API_KEY: /** @type {string} */ (DEVTO_API_KEY),
		WEBMENTION_API_KEY: /** @type {string} */ (WEBMENTION_API_KEY),
	},
	APP: {
		ENVIRONMENT: /** @type {string} */ (ENVIRONMENT),
		FLAGS: {
			IS_DEVELOPMENT: isDevelopment,
			IS_PRODUCTION: !isDevelopment,
		},
	},
}

export default data
