import { initializeApp } from 'firebase/app'
import { set as databaseSet, getDatabase, ref } from 'firebase/database'

import { AppConfig } from '~/libs/modules/config/config.js'
import { ValuesOf } from '~/libs/types/types.js'

import { TableNames } from './libs/enums/enums.js'

class AppDatabase {
	/** @type {ReturnType<typeof getDatabase>} */
	#instance

	/** @param {AppConfig} config */
	constructor(config) {
		this.#instance = getDatabase(
			initializeApp({
				apiKey: config.ENV.DB.API_KEY,
				appId: config.ENV.DB.APP_ID,
				authDomain: config.ENV.DB.AUTH_DOMAIN,
				databaseURL: config.ENV.DB.DATABASE_URL,
				messagingSenderId: config.ENV.DB.MESSAGING_SENDER_ID,
				projectId: config.ENV.DB.PROJECT_ID,
				storageBucket: config.ENV.DB.STORAGE_BUCKET,
			}),
		)
	}

	/**
	 * @param {ValuesOf<typeof TableNames>} tableName
	 * @returns {{ set: (payload: Record<string, unknown>) => Promise<void> }}
	 */
	getTableReference(tableName) {
		let reference = ref(this.#instance, `${tableName}/${Date.now()}`)

		return {
			/**
			 * @param {Record<string, unknown>} payload
			 * @returns {Promise<void>}
			 */
			async set(payload) {
				return databaseSet(reference, {
					...payload,
					createdAt: new Date().toISOString(),
				})
			},
		}
	}
}

export { AppDatabase }
