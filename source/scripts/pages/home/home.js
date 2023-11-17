import { Toast } from '~/libs/components/components.js'

import {
  EasterEgg,
  Navigation,
  Settings,
  Timeline,
} from './libs/components/components.js'

/** @typedef {import('~/pages/home/libs/types/types').SettingButtonPayload} SettingButtonPayload */
/** @typedef {import('~/libs/types/types').ToastMessagePayload} ToastMessagePayload */
/** @typedef {import('~/libs/packages/storage/storage').Storage} Storage */
/** @typedef {import('~/packages/timeline/timeline').TimelineApi} TimelineApi */

class Home {
  /**
   * @param {{
   *   storage: Storage
   *   timelineApi: TimelineApi
   * }} constructor
   */
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

  /**
   * @param {ToastMessagePayload} message
   * @returns {void}
   */
  _handleNotificationAdd(message) {
    this._toastComponent.pushMessage(message)
  }

  /**
   * @param {SettingButtonPayload} settings
   * @returns {HTMLButtonElement}
   */
  _handleSettingBtnAppend(settings) {
    return this._settingsComponent.appendNewBtn(settings)
  }

  /** @returns {void} */
  init() {
    this._toastComponent.init()
    this._settingsComponent.init()
    this._navigationComponent.init()
    this._timelineComponent.init()
    this._easterEggComponent.init()
  }
}

export { Home }
