import { Settings, Navigation, Timeline } from './components'

class IndexPage {
  constructor({ timelineApi, storage }) {
    this._settingsComponent = new Settings({
      storage,
    })
    this._navigationComponent = new Navigation()
    this._timelineComponent = new Timeline({
      timelineApi,
    })
  }

  init() {
    this._settingsComponent.init()
    this._navigationComponent.init()
    this._timelineComponent.init()
  }
}

export { IndexPage }
