import { Toast } from '~/components/common/common.js'

import {
  EasterEgg,
  Navigation,
  Settings,
  Timeline,
} from './components/components.js'

class Home {
  constructor({ storage, timelineApi }) {
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
      onNotificationAdd: this._handleNotificationAdd,
      onSettingBtnAppend: this._handleSettingBtnAppend,
    })
    this._toastComponent = new Toast()
  }

  _handleNotificationAdd(message) {
    this._toastComponent.pushMessage(message)
  }

  _handleSettingBtnAppend(settings) {
    return this._settingsComponent.appendNewBtn(settings)
  }

  init() {
    this._toastComponent.init()
    this._settingsComponent.init()
    this._navigationComponent.init()
    this._timelineComponent.init()
    this._easterEggComponent.init()
  }
}

export { Home }
