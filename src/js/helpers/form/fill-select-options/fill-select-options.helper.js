import { createSelectOptions } from '~/helpers/form/create-select-options/create-select-options.helper.js'
import { addSelectOptions } from '~/helpers/form/add-select-options/add-select-options.helper.js'

const fillSelectOptions = (selectNode, options) => {
  const selectOptions = createSelectOptions(options)

  addSelectOptions(selectNode, selectOptions)
}

export { fillSelectOptions }
