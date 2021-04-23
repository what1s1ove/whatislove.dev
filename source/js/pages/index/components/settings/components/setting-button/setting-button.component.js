import { checkIsChecked } from './helpers/helpers.js'
import { CHECKED_ATTR } from './common/constants.js'

class SettingButton {
  constructor({ name, isDefaultChecked, onClick }) {
    this._name = name
    this._isDefaultChecked = isDefaultChecked
    this._onClick = onClick

    this._btnNode = null

    this._handleBtnClick = this._handleBtnClick.bind(this)
  }

  set _isChecked(isChecked) {
    this._btnNode.setAttribute(CHECKED_ATTR, isChecked)
  }

  init(selector) {
    this._btnNode = document.querySelector(selector)

    this._isChecked = this._isDefaultChecked

    this._initListeners()

    this._onClick({
      name: this._name,
      isChecked: this._isDefaultChecked,
    })
  }

  _initListeners() {
    this._btnNode.addEventListener(`click`, this._handleBtnClick)
  }

  _handleBtnClick({ target }) {
    const isChecked = !checkIsChecked(target)

    this._isChecked = isChecked

    this._onClick({
      name: this._name,
      isChecked,
    })
  }
}

export { SettingButton }
