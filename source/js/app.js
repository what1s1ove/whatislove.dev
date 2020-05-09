import { initHeader } from './functionality/header/header.js'
import { initColorTheme } from './functionality/theme-button/theme-button.js'
import { initAnimate } from './functionality/animate-button/animate-button'

const init = () => {
  initColorTheme()
  initHeader()
  initAnimate()
}

export default init
