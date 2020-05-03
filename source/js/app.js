const ColorThemeTypes = {
  DARK: `dark`,
  LIGHT: `light`,
}

const setColorTheme = (color) => {
  document.documentElement.setAttribute(`data-theme`, color)
}

darkModeBtn.addEventListener(`click`, () => {
  darkModeBtn.checked
    ? setColorTheme(ColorThemeTypes.DARK)
    : setColorTheme(ColorThemeTypes.LIGHT)
})

