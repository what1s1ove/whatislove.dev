import { initColorTheme } from './functionality/theme-button/theme-button.js'
import { initToggleHeader } from './functionality/header-button/header-button.js'
import { initAnimate } from './functionality/animate-button/animate-button'

const init = () => {
  initColorTheme()
  initToggleHeader()
  initAnimate()
}

export default init
