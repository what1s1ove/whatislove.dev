import {
  joinPaths,
  readDir,
  checkIsFileExists,
  makeDir,
  writeFile,
  readFile,
} from '../../helpers/helpers.js'
import { Config } from '../../config.js'

const api = async () => {
  const databases = await readDir(Config.FOLDER.DB)
  const isApiFolderExists = checkIsFileExists(joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_API))

  if (!isApiFolderExists) {
    makeDir(joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_API))
  }

  databases.forEach(async (databaseName) => {
    const databaseBfr = await readFile(`${Config.FOLDER.DB}/${databaseName}`)
    const database = JSON.parse(databaseBfr)

    Object.keys(database).forEach((databaseKey) => {
      const payload = JSON.stringify(database[databaseKey])

      writeFile(
        `${joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_API)}/${databaseKey}.json`,
        payload,
      )
    })
  })
}

export { api }
