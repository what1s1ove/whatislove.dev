import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const isDevelopment = Boolean(yargs(hideBin(process.argv)).argv.development)

const Config = {
  isDevelopment,
}

export { Config }
