import { initSettingBtn } from './helpers'
import {
  AttributeTypes,
  MediaQueriesTypes,
  ThemeCheckTypes,
  MotionCheckTypes,
} from './common'

let themeBtn = document.querySelector(`.settings__button--theme input`)
let motionBtn = document.querySelector(`.settings__button--animate input`)

let themeBtnSettings = {
  target: themeBtn,
  mediaQuery: MediaQueriesTypes.THEME,
  attr: AttributeTypes.THEME,
  checkTypes: ThemeCheckTypes,
  isDefaultSetAttr: false
}

let motionBtnSettings = {
  target: motionBtn,
  mediaQuery: MediaQueriesTypes.MOTION,
  attr: AttributeTypes.MOTION,
  checkTypes: MotionCheckTypes,
  isDefaultSetAttr: true
}

export default () => {
  initSettingBtn(themeBtnSettings)

  initSettingBtn(motionBtnSettings)
}
