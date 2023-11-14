import { CHECKED_ATTR } from './common/constants.js'
import { checkIsChecked } from './helpers/helpers.js'

class Switch {
  constructor({ isDefaultChecked, name, onClick }) {
    this._name = name
    this._isDefaultChecked = isDefaultChecked
    this._onClick = onClick

    this._switchNode = undefined

    this._handleSwitchClick = this._handleSwitchClick.bind(this)
  }

  _handleSwitchClick({ target }) {
    let isChecked = !checkIsChecked(target)

    this._isChecked = isChecked

    this._onClick({
      isChecked,
      name: this._name,
    })
  }

  _initListeners() {
    this._switchNode.addEventListener(`click`, this._handleSwitchClick)
  }

  set _isChecked(isChecked) {
    this._switchNode.setAttribute(CHECKED_ATTR, isChecked)
  }

  init(selector) {
    this._switchNode = document.querySelector(selector)

    this._isChecked = this._isDefaultChecked

    this._initListeners()

    this._onClick({
      isChecked: this._isDefaultChecked,
      name: this._name,
    })

    return this._switchNode
  }
}

export { Switch }
