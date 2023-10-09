import { getCustomAttrName } from '~/helpers/helpers.js'
import { SettingName } from '~/common/enums/enums.js'
import { getSettingItemElement } from './helpers/helpers.js'
import { Switch, Control } from './components/components.js'

const RESULT_VALUE = `auto`

class Settings {
  constructor({ storage }) {
    this._storage = storage

    this._settingListNode = null

    this._handleControlChange = this._handleControlChange.bind(this)
  }

  init() {
    this._settingListNode = document.querySelector(`.settings`)

    this._initControl(SettingName.THEME)
    this._initControl(SettingName.MOTION)
  }

  appendNewBtn(settings) {
    const { name, label, isDefaultChecked, onClick } = settings

    const newSettingItemNode = getSettingItemElement({ name, label })

    this._settingListNode.prepend(newSettingItemNode)

    return new Switch({
      name,
      isDefaultChecked,
      onClick,
    }).init(`.settings__item-switch--${name}`)
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
    const defaultValue = this._setInitialSettingAttr(name)

    new Control({
      name,
      defaultValue,
      onChange: this._handleControlChange,
    }).init(`.settings__item-fieldset--${name}`)
  }

  _setSettingAttr(name, value) {
    document.documentElement.setAttribute(getCustomAttrName(name), value)
  }

  _removeSettingAttr(name) {
    document.documentElement.removeAttribute(getCustomAttrName(name))
  }

  _setInitialSettingAttr(name) {
    const value = this._storage.getItem(name)
    const hasValue = Boolean(value)

    if (hasValue) {
      this._setSettingAttr(name, value)
    }

    return value
  }
}

export { Settings }
