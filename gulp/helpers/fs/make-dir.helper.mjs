import fs from 'fs'

const fsPromises = fs.promises

const makeDir = (path, isSync = false) => {
  return isSync ? fs.mkdir(path) : fsPromises.mkdir(path)
}

export { makeDir }
