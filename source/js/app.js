import { initHeader } from './functionality/header/header'
import { initColorTheme } from './functionality/theme-button/theme-button'
import { initAnimate } from './functionality/animate-button/animate-button'
import { initTimelineForm } from './functionality/timeline/timeline'

const init = () => {
  initColorTheme()
  initHeader()
  initAnimate()
  initTimelineForm()
}

export default init
