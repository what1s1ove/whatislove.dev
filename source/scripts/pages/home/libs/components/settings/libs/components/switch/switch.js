/** @typedef {typeof import('~/pages/home/libs/enums/enums').SettingName} SettingName */

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
    let isChecked = /** @type {HTMLElement} */ (target).ariaChecked === `true`

    this._isChecked = !isChecked

    this._onClick(this._name, !isChecked)
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

    switchNode.ariaChecked = isChecked.toString()
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
