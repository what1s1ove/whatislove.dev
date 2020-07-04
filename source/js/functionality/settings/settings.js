import { initSettingBtn } from './helpers'
import {
  AttributeType,
  MediaQueriesType,
  ThemeCheckType,
  MotionCheckType,
} from './common'

const themeTogglerNode = document.querySelector(
  `.settings__button--theme input`
)
const motionTogglerNode = document.querySelector(
  `.settings__button--animate input`
)

const themeBtnSettings = {
  togglerNode: themeTogglerNode,
  mediaQuery: MediaQueriesType.THEME,
  attr: AttributeType.THEME,
  checkTypes: ThemeCheckType,
}

const motionBtnSettings = {
  togglerNode: motionTogglerNode,
  mediaQuery: MediaQueriesType.MOTION,
  attr: AttributeType.MOTION,
  checkTypes: MotionCheckType,
}

export default () => {
  initSettingBtn(themeBtnSettings)

  initSettingBtn(motionBtnSettings)
}
