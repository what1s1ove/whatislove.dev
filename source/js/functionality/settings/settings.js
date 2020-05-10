import { initSettingBtn } from './helpers'
import {
  AttributeTypes,
  MediaQueriesTypes,
  ColorThemeTypes,
  MotionTypes,
} from './common'

const darkModeToggler = document.querySelector(`.settings__button--theme input`)
const animateBtn = document.querySelector(`.settings__button--animate input`)

export default () => {
  initSettingBtn(
    darkModeToggler,
    MediaQueriesTypes.THEME,
    AttributeTypes.THEME,
    ColorThemeTypes
  )

  initSettingBtn(
    animateBtn,
    MediaQueriesTypes.MOTION,
    AttributeTypes.MOTION,
    MotionTypes
  )
}
