import { FormPage } from '~/pages'
import { timelineApi } from '~/services/services'

const formPage = new FormPage({
  timelineApi,
})

formPage.init()
