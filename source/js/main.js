import 'focus-visible/dist/focus-visible.min'
import { initHeader } from './functionality/header/header'
import { initSettings } from './functionality/settings/settings'
import { initTimeline } from './functionality/timeline/timeline'

const initApp = () => {
  initHeader()
  initSettings()
  initTimeline()
}

initApp()
