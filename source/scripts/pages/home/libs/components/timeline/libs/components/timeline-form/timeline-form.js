import { getFormValues, initDebounce } from '~/libs/helpers/helpers.js'

import { DEBOUNCE_DELAY } from './libs/constants/constants.js'

/** @typedef {import('~/packages/timeline/timeline').TimelineFilter} TimelineFilter */

class TimelineForm {
  /**
   * @param {{
   *   onChange: (formValues: TimelineFilter) => void
   * }} constructor
   */
  constructor({ onChange }) {
    this._onChange = onChange

    /** @type {HTMLFormElement | undefined} */
    this._formNode = undefined

    this._handleFormChange = this._handleFormChange.bind(this)
  }

  /** @returns {void} */
  _handleFormChange() {
    this._onChange(this.formValues)
  }

  /** @returns {void} */
  _initListeners() {
    let formNode = /** @type {HTMLFormElement} */ (this._formNode)

    formNode.addEventListener(
      `change`,
      initDebounce(this._handleFormChange, DEBOUNCE_DELAY),
    )
  }

  /** @returns {void} */
  init() {
    this._formNode = /** @type {HTMLFormElement} */ (
      document.querySelector(`.timeline__filter`)
    )

    this._initListeners()
  }

  /** @returns {TimelineFilter} */
  get formValues() {
    return getFormValues(/** @type {HTMLFormElement} */ (this._formNode))
  }
}

export { TimelineForm }
