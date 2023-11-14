import { addSelectOptions } from '~/helpers/form/add-select-options/add-select-options.helper.js'
import { createSelectOptions } from '~/helpers/form/create-select-options/create-select-options.helper.js'

let fillSelectOptions = (selectNode, options) => {
  let selectOptions = createSelectOptions(options)

  addSelectOptions(selectNode, selectOptions)
}

export { fillSelectOptions }
