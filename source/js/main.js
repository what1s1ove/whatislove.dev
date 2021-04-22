import { IndexPage } from './pages'
import { timelineApi, storage } from '~/services/services'

const indexPage = new IndexPage({
  timelineApi,
  storage,
})

indexPage.init()
