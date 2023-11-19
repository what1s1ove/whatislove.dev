import { timelineApi } from '~/packages/timeline/timeline.js'
import { Form } from '~/pages/form/form.js'

let form = new Form({
	timelineApi,
})

form.init()
