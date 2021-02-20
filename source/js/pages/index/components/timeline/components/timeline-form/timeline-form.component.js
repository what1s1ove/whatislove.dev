import { getFormValues, debounce } from '~/helpers'
import { DEBOUNCE_DELAY } from './common/constants'

class TimelineForm {
  constructor({ onChange }) {
    this._onChange = onChange

    this._formNode = null

    this._handleFormChange = this._handleFormChange.bind(this)
  }

  get formValues() {
    return getFormValues(this._formNode.elements)
  }

  init() {
    this._formNode = document.forms.timeline

    this._initListeners()
  }

  _initListeners() {
    this._formNode.addEventListener(
      `change`,
      debounce(this._handleFormChange, DEBOUNCE_DELAY),
    )
  }

  _handleFormChange() {
    this._onChange(this.formValues)
  }
}

export { TimelineForm }
