import 'focus-visible/dist/focus-visible.min'
import initHeader from './functionality/header/header'
import initSettings from './functionality/settings/settings'
import initTimelineForm from './functionality/timeline/timeline'

const init = () => {
  initHeader()
  initSettings()
  initTimelineForm()
}

export default init
