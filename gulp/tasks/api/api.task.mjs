import fs from 'fs'

const fsPromises = fs.promises

const api = async () => {
  const databases = await fsPromises.readdir(`./db`)

  if (!fsPromises.existsSync) {
    fsPromises.mkdir(`./build/api`)
  }

  databases.forEach(async (databaseName) => {
    const databaseBfr = await fsPromises.readFile(`./db/${databaseName}`)
    const database = JSON.parse(databaseBfr)

    Object.keys(database).forEach((databaseKey) => {
      const payload = database[databaseKey]

      fsPromises.writeFile(
        `./build/api/${databaseKey}.json`,
        JSON.stringify(payload),
      )
    })
  })
}

export { api }
