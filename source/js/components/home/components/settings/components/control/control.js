class Control {
  constructor({ name, defaultValue, onChange }) {
    this._name = name
    this._onChange = onChange
    this._defaultValue = defaultValue

    this._controlNode = null

    this._handleSwitchChange = this._handleSwitchChange.bind(this)
  }

  init(selector) {
    this._controlNode = document.querySelector(selector)

    this._setInitialValue()

    this._initListeners()
  }

  _setInitialValue() {
    const inputNodes = this._controlNode.querySelectorAll(
      `input[name="${this._name}"]`,
    )

    inputNodes.forEach((it) => {
      const isChecked = it.value === this._defaultValue

      if (isChecked) {
        it.checked = isChecked
      }
    })
  }

  _initListeners() {
    this._controlNode.addEventListener(`change`, this._handleSwitchChange)
  }

  _handleSwitchChange({ target }) {
    this._onChange({
      name: this._name,
      value: target.value,
    })
  }
}

export { Control }
