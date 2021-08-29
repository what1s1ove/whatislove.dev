import { Home } from '~/components/home/home.js'
import { timelineApi, storage } from '~/services/services.js'

const home = new Home({
  timelineApi,
  storage,
})

home.init()
