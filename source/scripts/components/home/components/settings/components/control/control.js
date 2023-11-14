class Control {
  constructor({ defaultValue, name, onChange }) {
    this._name = name
    this._onChange = onChange
    this._defaultValue = defaultValue

    this._controlNode = undefined

    this._handleSwitchChange = this._handleSwitchChange.bind(this)
  }

  _handleSwitchChange({ target }) {
    this._onChange({
      name: this._name,
      value: target.value,
    })
  }

  _initListeners() {
    this._controlNode.addEventListener(`change`, this._handleSwitchChange)
  }

  _setInitialValue() {
    let inputNodes = this._controlNode.querySelectorAll(
      `input[name="${this._name}"]`,
    )

    for (let it of inputNodes) {
      let isChecked = it.value === this._defaultValue

      if (isChecked) {
        it.checked = isChecked
      }
    }
  }

  init(selector) {
    this._controlNode = document.querySelector(selector)

    this._setInitialValue()

    this._initListeners()
  }
}

export { Control }
