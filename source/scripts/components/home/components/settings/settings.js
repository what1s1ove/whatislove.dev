import { SettingName } from '~/common/enums/enums.js'
import { getCustomAttributeName } from '~/helpers/helpers.js'

import { Control, Switch } from './components/components.js'
import { getSettingItemElement } from './helpers/helpers.js'

let RESULT_VALUE = `auto`

class Settings {
  constructor({ storage }) {
    this._storage = storage

    this._settingListNode = undefined

    this._handleControlChange = this._handleControlChange.bind(this)
  }

  _handleControlChange({ name, value }) {
    if (value === RESULT_VALUE) {
      this._removeSettingAttr(name)

      return this._storage.removeItem(name)
    }

    this._setSettingAttr(name, value)

    this._storage.setItem(name, value)
  }

  _initControl(name) {
    let defaultValue = this._setInitialSettingAttr(name)

    new Control({
      defaultValue,
      name,
      onChange: this._handleControlChange,
    }).init(`.settings__item-fieldset--${name}`)
  }

  _removeSettingAttr(name) {
    document.documentElement.removeAttribute(getCustomAttributeName(name))
  }

  _setInitialSettingAttr(name) {
    let value = this._storage.getItem(name)
    let hasValue = Boolean(value)

    if (hasValue) {
      this._setSettingAttr(name, value)
    }

    return value
  }

  _setSettingAttr(name, value) {
    document.documentElement.setAttribute(getCustomAttributeName(name), value)
  }

  appendNewBtn(settings) {
    let { isDefaultChecked, label, name, onClick } = settings

    let newSettingItemNode = getSettingItemElement({ label, name })

    this._settingListNode.prepend(newSettingItemNode)

    return new Switch({
      isDefaultChecked,
      name,
      onClick,
    }).init(`.settings__item-switch--${name}`)
  }

  init() {
    this._settingListNode = document.querySelector(`.settings`)

    this._initControl(SettingName.THEME)
    this._initControl(SettingName.MOTION)
  }
}

export { Settings }
