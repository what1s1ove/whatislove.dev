import { FormPage } from '~/pages/form/form.page'
import { timelineApi } from '~/services/services'

const formPage = new FormPage({
  timelineApi,
})

formPage.init()
