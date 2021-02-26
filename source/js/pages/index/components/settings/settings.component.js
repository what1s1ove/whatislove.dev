import { checkIsMediaQueryMatch, getCustomAttrName } from '~/helpers'
import { numberToBoolean } from '~/common/maps'
import { SettingName } from '~/common/enums'
import { getSettingItemElement } from './helpers'
import { SettingButton } from './components'
import { MediaQueriesType } from './common/enums'
import { settingNameToCheckTypes } from './common/maps'

class Settings {
  constructor({ storage }) {
    this._storage = storage

    this._settingListNode = null

    this._handleSettingBtnClick = this._handleSettingBtnClick.bind(this)
  }

  init() {
    this._settingListNode = document.querySelector(`.settings`)

    new SettingButton({
      name: SettingName.THEME,
      isDefaultChecked: this._checkIsBtnChecked({
        name: SettingName.THEME,
        mediaQuery: MediaQueriesType.THEME,
      }),
      onClick: this._handleSettingBtnClick,
    }).init(`.settings__button--theme`)

    new SettingButton({
      name: SettingName.MOTION,
      isDefaultChecked: this._checkIsBtnChecked({
        name: SettingName.MOTION,
        mediaQuery: MediaQueriesType.MOTION,
      }),
      onClick: this._handleSettingBtnClick,
    }).init(`.settings__button--motion`)
  }

  appendNewBtn(settings) {
    const { name, label, isDefaultChecked, onClick } = settings

    const newSettingItemNode = getSettingItemElement({ name, label })

    this._settingListNode.prepend(newSettingItemNode)

    new SettingButton({
      name,
      isDefaultChecked,
      onClick,
    }).init(`.settings__button--${name}`)
  }

  _handleSettingBtnClick({ name, isChecked }) {
    this._setSettingAttr({
      name,
      isChecked,
      checkTypes: settingNameToCheckTypes[name],
    })

    this._storage.setItem(name, Number(isChecked))
  }

  _setSettingAttr({ name, checkTypes, isChecked }) {
    document.documentElement.setAttribute(
      getCustomAttrName(name),
      isChecked ? checkTypes.checked : checkTypes.unchecked,
    )
  }

  _checkIsBtnChecked({ name, mediaQuery }) {
    const settingStoredValue = this._storage.getItem(name)

    return settingStoredValue
      ? numberToBoolean[settingStoredValue]
      : checkIsMediaQueryMatch(mediaQuery)
  }
}

export { Settings }
