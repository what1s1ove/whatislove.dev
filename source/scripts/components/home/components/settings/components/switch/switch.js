import { CHECKED_ATTR } from './common/constants.js'
import { checkIsChecked } from './helpers/helpers.js'

class Switch {
  constructor({ name, isDefaultChecked, onClick }) {
    this._name = name
    this._isDefaultChecked = isDefaultChecked
    this._onClick = onClick

    this._switchNode = undefined

    this._handleSwitchClick = this._handleSwitchClick.bind(this)
  }

  set _isChecked(isChecked) {
    this._switchNode.setAttribute(CHECKED_ATTR, isChecked)
  }

  init(selector) {
    this._switchNode = document.querySelector(selector)

    this._isChecked = this._isDefaultChecked

    this._initListeners()

    this._onClick({
      name: this._name,
      isChecked: this._isDefaultChecked,
    })

    return this._switchNode
  }

  _initListeners() {
    this._switchNode.addEventListener(`click`, this._handleSwitchClick)
  }

  _handleSwitchClick({ target }) {
    const isChecked = !checkIsChecked(target)

    this._isChecked = isChecked

    this._onClick({
      name: this._name,
      isChecked,
    })
  }
}

export { Switch }
