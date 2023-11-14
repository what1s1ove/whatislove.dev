import { Form } from '~/components/form/form.js'
import { timelineApi } from '~/services/services.js'

const form = new Form({
  timelineApi,
})

form.init()
