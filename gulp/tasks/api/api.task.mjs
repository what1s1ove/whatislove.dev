import fs from 'fs'
import { joinPaths } from '../../helpers/helpers.mjs'
import { Config } from '../../config.mjs'

const fsPromises = fs.promises

const api = async () => {
  const databases = await fsPromises.readdir(Config.FOLDER.DB)

  if (!fs.existsSync(joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_API))) {
    fsPromises.mkdir(joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_API))
  }

  databases.forEach(async (databaseName) => {
    const databaseBfr = await fsPromises.readFile(`${Config.FOLDER.DB}/${databaseName}`)
    const database = JSON.parse(databaseBfr)

    Object.keys(database).forEach((databaseKey) => {
      const payload = JSON.stringify(database[databaseKey])

      fsPromises.writeFile(
        `${joinPaths(Config.FOLDER.BUILD, Config.FOLDER.BUILD_API)}/${databaseKey}.json`,
        payload,
      )
    })
  })
}

export { api }
