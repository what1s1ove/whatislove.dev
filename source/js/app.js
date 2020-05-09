import { initHeader } from './functionality/header/header'
import { initColorTheme } from './functionality/theme-button/theme-button'
import { initAnimate } from './functionality/animate-button/animate-button'

const init = () => {
  initColorTheme()
  initHeader()
  initAnimate()
}

export default init
