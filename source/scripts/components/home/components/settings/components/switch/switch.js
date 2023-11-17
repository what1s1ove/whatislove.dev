import { CHECKED_ATTR } from './common/constants.js'
import { checkIsChecked } from './helpers/helpers.js'

/** @typedef {typeof import('~/common/enums/enums.js').SettingName} SettingName */

class Switch {
  /**
   * @param {{
   *   isDefaultChecked: boolean
   *   name: SettingName[keyof SettingName]
   *   onClick: (
   *     name: SettingName[keyof SettingName],
   *     isChecked: boolean,
   *   ) => void
   * }} constructor
   */
  constructor({ isDefaultChecked, name, onClick }) {
    this._name = name
    this._isDefaultChecked = isDefaultChecked
    this._onClick = onClick

    this._switchNode = undefined

    this._handleSwitchClick = this._handleSwitchClick.bind(this)
  }

  /**
   * @param {Event} event_
   * @returns {void}
   */
  _handleSwitchClick({ target }) {
    let isChecked = !checkIsChecked(/** @type {HTMLElement} */ (target))

    this._isChecked = isChecked

    this._onClick(this._name, isChecked)
  }

  /** @returns {void} */
  _initListeners() {
    let switchNode = /** @type {HTMLElement} */ (this._switchNode)

    switchNode.addEventListener(`click`, this._handleSwitchClick)
  }

  /**
   * @param {boolean} isChecked
   * @returns {void}
   */
  set _isChecked(isChecked) {
    let switchNode = /** @type {HTMLElement} */ (this._switchNode)

    switchNode.setAttribute(CHECKED_ATTR, isChecked.toString())
  }

  /**
   * @param {string} selector
   * @returns {HTMLButtonElement}
   */
  init(selector) {
    this._switchNode = /** @type {HTMLButtonElement} */ (
      document.querySelector(selector)
    )

    this._isChecked = this._isDefaultChecked

    this._initListeners()

    this._onClick(this._name, this._isDefaultChecked)

    return this._switchNode
  }
}

export { Switch }
