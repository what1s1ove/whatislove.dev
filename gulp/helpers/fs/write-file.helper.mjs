import fs from 'fs'

const fsPromises = fs.promises

const writeFile = (path, payload, isSync = false) => {
  return isSync
    ? fs.writeFileSync(path, payload)
    : fsPromises.writeFile(path, payload)
}

export { writeFile }
