import {
  AttributeType,
  MediaQueriesType,
  ThemeCheckType,
  MotionCheckType,
  MediaBooleanMap,
} from './common'

class Settings {
  constructor({ storage }) {
    this._storage = storage
  }

  init() {
    this._initSettingBtn({
      node: document.querySelector(`.settings__button--theme input`),
      mediaQuery: MediaQueriesType.THEME,
      attr: AttributeType.THEME,
      checkTypes: ThemeCheckType,
    })

    this._initSettingBtn({
      node: document.querySelector(`.settings__button--animate input`),
      mediaQuery: MediaQueriesType.MOTION,
      attr: AttributeType.MOTION,
      checkTypes: MotionCheckType,
    })
  }

  _initSettingBtn({ node, mediaQuery, attr, checkTypes }) {
    const dataAttr = `data-${attr}`

    const hasDefaultCheck = this._checkHasDefaultCheck(mediaQuery)

    this._setSettingAttr(hasDefaultCheck, dataAttr, checkTypes)

    node.checked = hasDefaultCheck

    node.addEventListener(`change`, (evt) => {
      const { checked } = evt.target

      this._setSettingAttr(checked, dataAttr, checkTypes)

      this._storage.setItem(mediaQuery, checked)
    })
  }

  _setSettingAttr(isChecked, attr, checkTypes) {
    document.documentElement.setAttribute(
      attr,
      isChecked ? checkTypes.CHECKED : checkTypes.UNCHECKED,
    )
  }

  _checkHasDefaultCheck(mediaQuery) {
    const storageValue = this._storage.getItem(mediaQuery)

    const isChecked = storageValue
      ? MediaBooleanMap[storageValue]
      : window.matchMedia(mediaQuery).matches

    return isChecked
  }
}

export { Settings }
