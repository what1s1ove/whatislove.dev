import { initSettingBtn } from './helpers'
import {
  AttributeTypes,
  MediaQueriesTypes,
  ThemeCheckTypes,
  MotionCheckTypes,
} from './common'

const themeBtn = document.querySelector(`.settings__button--theme input`)
const motionBtn = document.querySelector(`.settings__button--animate input`)

const themeBtnSettings = {
  target: themeBtn,
  mediaQuery: MediaQueriesTypes.THEME,
  attr: AttributeTypes.THEME,
  checkTypes: ThemeCheckTypes,
  isDefaultSetAttr: false
}

const motionBtnSettings = {
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
