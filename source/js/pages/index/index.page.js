import { Settings, Navigation, Timeline, EasterEgg } from './components'

class IndexPage {
  constructor({ timelineApi, storage }) {
    this._handleSettingBtnAppend = this._handleSettingBtnAppend.bind(this)

    this._settingsComponent = new Settings({
      storage,
    })
    this._navigationComponent = new Navigation()
    this._timelineComponent = new Timeline({
      timelineApi,
    })
    this._easterEggComponent = new EasterEgg({
      onClick: this._handleSettingBtnAppend,
    })
  }

  init() {
    this._settingsComponent.init()
    this._navigationComponent.init()
    this._timelineComponent.init()
    this._easterEggComponent.init()
  }

  _handleSettingBtnAppend(settings) {
    this._settingsComponent.appendNewBtn(settings)
  }
}

export { IndexPage }
