import { setColorTheme } from './helpers'
import { ColorThemeTypes } from './common'

const initColorTheme = () => {
  const darkModeBtn = document.querySelector(`.settings__theme-button input`)

  let isPreferDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  darkModeBtn.checked = isPreferDark

  darkModeBtn.addEventListener(`change`, () => {
    darkModeBtn.checked
      ? setColorTheme(ColorThemeTypes.DARK)
      : setColorTheme(ColorThemeTypes.LIGHT)
  })
}

export { initColorTheme }
