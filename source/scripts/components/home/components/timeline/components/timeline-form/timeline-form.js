import { debounce, getFormValues } from '~/helpers/helpers.js'

import { DEBOUNCE_DELAY } from './common/constants.js'

class TimelineForm {
  constructor({ onChange }) {
    this._onChange = onChange

    this._formNode = undefined

    this._handleFormChange = this._handleFormChange.bind(this)
  }

  _handleFormChange() {
    this._onChange(this.formValues)
  }

  _initListeners() {
    this._formNode.addEventListener(
      `change`,
      debounce(this._handleFormChange, DEBOUNCE_DELAY),
    )
  }

  init() {
    this._formNode = document.forms.timeline

    this._initListeners()
  }

  get formValues() {
    return getFormValues(this._formNode)
  }
}

export { TimelineForm }
