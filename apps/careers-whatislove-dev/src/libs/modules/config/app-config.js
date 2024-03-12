class AppConfig {
	ENV = {
		DB: {
			API_KEY: import.meta.env.VITE_DB_API_KEY,
			APP_ID: `1:107214599063:web:eb573dae9945753cfc8ad2`,
			AUTH_DOMAIN: `whatislove-dev-51345.firebaseapp.com`,
			DATABASE_URL: `https://whatislove-dev-51345-default-rtdb.europe-west1.firebasedatabase.app`,
			MESSAGING_SENDER_ID: `107214599063`,
			PROJECT_ID: `whatislove-dev-51345`,
			STORAGE_BUCKET: `whatislove-dev-51345.appspot.com`,
		},
	}
}

export { AppConfig }
