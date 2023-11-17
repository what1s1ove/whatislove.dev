import { SettingName } from '~/common/enums/enums.js'
import { getCustomAttributeName } from '~/helpers/helpers.js'

import { Control, Switch } from './components/components.js'
import { getSettingItemElement } from './helpers/helpers.js'

let RESULT_VALUE = /** @type {const} */ (`auto`)

/** @typedef {import('~/common/types/settings/settings').SettingButtonPayload} SettingButtonPayload */
/** @typedef {import('~/services/storage/storage.service').Storage} Storage */

class Settings {
  /**
   * @param {{
   *   storage: Storage
   * }} constructor
   */
  constructor({ storage }) {
    this._storage = storage

    /** @type {HTMLElement | undefined} */
    this._settingListNode = undefined

    this._handleControlChange = this._handleControlChange.bind(this)
  }

  /**
   * @param {(typeof SettingName)[keyof typeof SettingName]} name
   * @param {string} value
   * @returns {void}
   */
  _handleControlChange(name, value) {
    if (value === RESULT_VALUE) {
      this._removeSettingAttr(name)

      return this._storage.removeItem(name)
    }

    this._setSettingAttr(name, value)

    this._storage.setItem(name, value)
  }

  /**
   * @param {(typeof SettingName)[keyof typeof SettingName]} name
   * @returns {void}
   */
  _initControl(name) {
    let defaultValue = this._setInitialSettingAttr(name)

    new Control({
      defaultValue,
      name,
      onChange: this._handleControlChange,
    }).init(`.settings__item-fieldset--${name}`)
  }

  /**
   * @param {(typeof SettingName)[keyof typeof SettingName]} name
   * @returns {void}
   */
  _removeSettingAttr(name) {
    document.documentElement.removeAttribute(getCustomAttributeName(name))
  }

  /**
   * @param {(typeof SettingName)[keyof typeof SettingName]} name
   * @returns {string | null}
   */
  _setInitialSettingAttr(name) {
    let value = this._storage.getItem(name)
    let hasValue = Boolean(value)

    if (hasValue) {
      this._setSettingAttr(name, /** @type {string} */ (value))
    }

    return value
  }

  /**
   * @param {(typeof SettingName)[keyof typeof SettingName]} name
   * @param {string} value
   * @returns {void}
   */
  _setSettingAttr(name, value) {
    document.documentElement.setAttribute(getCustomAttributeName(name), value)
  }

  /**
   * @param {SettingButtonPayload} settings
   * @returns {HTMLButtonElement}
   */
  appendNewBtn(settings) {
    let { isDefaultChecked, label, name, onClick } = settings

    let newSettingItemNode = getSettingItemElement({ label, name })
    let settingListNode = /** @type {HTMLElement} */ (this._settingListNode)

    settingListNode.prepend(newSettingItemNode)

    return new Switch({
      isDefaultChecked,
      name,
      onClick,
    }).init(`.settings__item-switch--${name}`)
  }

  /** @returns {void} */
  init() {
    this._settingListNode = /** @type {HTMLElement} */ (
      document.querySelector(`.settings`)
    )

    this._initControl(SettingName.THEME)
    this._initControl(SettingName.MOTION)
  }
}

export { Settings }
