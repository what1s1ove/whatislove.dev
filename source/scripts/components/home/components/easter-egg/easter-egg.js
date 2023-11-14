import {
  NotificationMessage,
  SettingButtonLabel,
  SettingName,
} from '~/common/enums/enums.js'
import { debounce } from '~/helpers/helpers.js'

import {
  NOTIFICATION_DELAY,
  RESIZE_DELAY,
  SOUND_SRC,
} from './common/constants.js'
import { getNodeRandomCoords, getPlayerElement } from './helpers/helpers.js'

class EasterEgg {
  constructor({ onSettingBtnAppend, onNotificationAdd }) {
    this._onSettingBtnAppend = onSettingBtnAppend
    this._onNotificationAdd = onNotificationAdd

    this._easterEggContainer = undefined
    this._easterEggBtn = undefined
    this._audio = undefined

    this._handleEasterEggClick = this._handleEasterEggClick.bind(this)
    this._handleSettingBtnClick = this._handleSettingBtnClick.bind(this)
    this._handleWindowResize = debounce(
      this._handleWindowResize.bind(this),
      RESIZE_DELAY,
    )
  }

  init() {
    this._easterEggContainer = document.querySelector(`.not-easter-egg`)
    this._easterEggBtn = document.querySelector(`.not-easter-egg__button`)

    this._setRandomPosition()

    this._initListeners()
  }

  _initListeners() {
    this._easterEggBtn.addEventListener(`click`, this._handleEasterEggClick)
    window.addEventListener(`resize`, this._handleWindowResize)
  }

  _removeListeners() {
    this._easterEggBtn.removeEventListener(`click`, this._handleEasterEggClick)
    window.removeEventListener(`resize`, this._handleWindowResize)
  }

  _renderPlayer() {
    this._audio = getPlayerElement(SOUND_SRC)

    document.body.append(this._audio)
  }

  _setRandomPosition() {
    const { x, y } = getNodeRandomCoords(this._easterEggContainer)

    this._easterEggContainer.style.top = `${y}px`
    this._easterEggContainer.style.left = `${x}px`
  }

  _handleEasterEggClick() {
    this._onNotificationAdd({
      message: NotificationMessage.LOVE,
      duration: NOTIFICATION_DELAY,
      cb: () => {
        const buttonNode = this._onSettingBtnAppend({
          name: SettingName.WHATISLOVE,
          label: SettingButtonLabel.SWITCH_LOVE,
          isDefaultChecked: true,
          onClick: this._handleSettingBtnClick,
        })

        buttonNode.focus()
      },
    })

    this._renderPlayer()

    this._removeListeners()

    this._easterEggContainer.remove()
  }

  _handleSettingBtnClick({ isChecked }) {
    isChecked ? this._audio.play() : this._audio.pause()
  }

  _handleWindowResize() {
    this._setRandomPosition()
  }
}

export { EasterEgg }
