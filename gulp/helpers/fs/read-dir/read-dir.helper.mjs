import fs from 'fs'

const fsPromises = fs.promises

const readDir = (path, isSync = false) => {
  return isSync ? fs.readdirSync(path) : fsPromises.readdir(path)
}

export { readDir }
