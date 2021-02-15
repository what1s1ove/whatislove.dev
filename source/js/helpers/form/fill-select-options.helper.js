import { createSelectOptions } from '~/helpers/form/create-select-options.helper'
import { addSelectOptions } from '~/helpers/form/add-select-options.helper'

const fillSelectOptions = (selectNode, options) => {
  const selectOptions = createSelectOptions(options)

  addSelectOptions(selectNode, selectOptions)
}

export { fillSelectOptions }
