import { Storage } from './storage.package.js'

let storage = new Storage({
	storage: localStorage,
})

export { storage }
export { Storage } from './storage.package.js'
