import { IndexPage } from '~/pages/pages.js'
import { timelineApi, storage } from '~/services/services.js'

const indexPage = new IndexPage({
  timelineApi,
  storage,
})

indexPage.init()
