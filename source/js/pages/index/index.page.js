import { Toast } from '~/components/components.js'
import { Settings, Navigation, Timeline, EasterEgg } from './components/components.js'

class IndexPage {
  constructor({ timelineApi, storage }) {
    this._handleSettingBtnAppend = this._handleSettingBtnAppend.bind(this)
    this._handleNotificationAdd = this._handleNotificationAdd.bind(this)

    this._settingsComponent = new Settings({
      storage,
    })
    this._navigationComponent = new Navigation()
    this._timelineComponent = new Timeline({
      timelineApi,
    })
    this._easterEggComponent = new EasterEgg({
      onSettingBtnAppend: this._handleSettingBtnAppend,
      onNotificationAdd: this._handleNotificationAdd,
    })
    this._toastComponent = new Toast()
  }

  init() {
    this._toastComponent.init()
    this._settingsComponent.init()
    this._navigationComponent.init()
    this._timelineComponent.init()
    this._easterEggComponent.init()
  }

  _handleSettingBtnAppend(settings) {
    return this._settingsComponent.appendNewBtn(settings)
  }

  _handleNotificationAdd(message) {
    this._toastComponent.pushMessage(message)
  }
}

export { IndexPage }
