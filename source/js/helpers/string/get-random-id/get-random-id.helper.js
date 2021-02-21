import { nanoid } from 'nanoid'

const DEFAULT_ID_LENGTH = 10

const getRandomId = (size = DEFAULT_ID_LENGTH) => nanoid(size)

export { getRandomId }
