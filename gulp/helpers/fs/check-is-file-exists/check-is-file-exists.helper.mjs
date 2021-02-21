import fs from 'fs'

const checkIsFileExists = (path) => fs.existsSync(path)

export { checkIsFileExists }
