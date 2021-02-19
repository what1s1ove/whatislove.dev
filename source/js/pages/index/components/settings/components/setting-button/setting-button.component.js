class SettingButton {
  constructor({ name, isDefaultChecked, onClick }) {
    this._name = name
    this._isDefaultChecked = isDefaultChecked
    this._onClick = onClick

    this._btnNode = null

    this._handleBtnClick = this._handleBtnClick.bind(this)
  }

  init(selector) {
    this._btnNode = document.querySelector(selector)

    this._btnNode.checked = this._isDefaultChecked

    this._initListeners()

    this._onClick({
      name: this._name,
      isChecked: this._isDefaultChecked,
    })
  }

  _initListeners() {
    this._btnNode.addEventListener(`change`, this._handleBtnClick)
  }

  _handleBtnClick({ target }) {
    this._onClick({
      name: this._name,
      isChecked: target.checked,
    })
  }
}

export { SettingButton }
