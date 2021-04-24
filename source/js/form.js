import { FormPage } from '~/pages/pages.js'
import { timelineApi } from '~/services/services.js'

const formPage = new FormPage({
  timelineApi,
})

formPage.init()
