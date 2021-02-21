import fs from 'fs'

const fsPromises = fs.promises

const readFile = (path, isSync = false) => {
  return isSync ? fs.readFileSync(path) : fsPromises.readFile(path)
}

export { readFile }
