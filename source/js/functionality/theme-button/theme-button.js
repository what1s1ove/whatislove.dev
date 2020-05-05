import { setAttribute } from '../../helpers/index'
import { AttributeTypes } from '../../common/map/index'
import { ColorThemeTypes } from './common.js'

const initColorTheme = () => {
  const darkModeBtn = document.querySelector(`.settings__button--theme input`)

  let isPreferDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  darkModeBtn.checked = isPreferDark

  darkModeBtn.addEventListener(`change`, () => {
    darkModeBtn.checked
      ? setAttribute(AttributeTypes.THEME, ColorThemeTypes.DARK)
      : setAttribute(AttributeTypes.THEME, ColorThemeTypes.LIGHT)
  })
}

export { initColorTheme }
