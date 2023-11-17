import { NotificationMessage } from '~/libs/enums/enums.js'
import { initDebounce } from '~/libs/helpers/helpers.js'
import {
  SettingButtonLabel,
  SettingName,
} from '~/pages/home/libs/enums/enums.js'

import {
  NOTIFICATION_DELAY,
  RESIZE_DELAY,
  SOUND_SRC,
} from './libs/constants/constants.js'
import {
  getNodeRandomCoords,
  getPlayerElement,
} from './libs/helpers/helpers.js'

/** @typedef {import('~/libs/types/types').ToastMessagePayload} ToastMessagePayload */
/** @typedef {import('~/pages/home/libs/types/types').SettingButtonPayload} SettingButtonPayload */

class EasterEgg {
  /**
   * @param {{
   *   onNotificationAdd: (payload: ToastMessagePayload) => void
   *   onSettingBtnAppend: (payload: SettingButtonPayload) => HTMLButtonElement
   * }} constructor
   */
  constructor({ onNotificationAdd, onSettingBtnAppend }) {
    this._onNotificationAdd = onNotificationAdd
    this._onSettingBtnAppend = onSettingBtnAppend

    /** @type {HTMLElement | undefined} */
    this._easterEggContainerNode = undefined
    /** @type {HTMLButtonElement | undefined} */
    this._easterEggButtonNode = undefined
    /** @type {HTMLAudioElement | undefined} */
    this._audioNode = undefined

    this._handleEasterEggClick = this._handleEasterEggClick.bind(this)
    this._handleSettingBtnClick = this._handleSettingBtnClick.bind(this)
    this._handleWindowResize = initDebounce(
      this._handleWindowResize.bind(this),
      RESIZE_DELAY,
    )
  }

  /** @returns {void} */
  _handleEasterEggClick() {
    let easterEggContainerNode = /** @type {HTMLElement} */ (
      this._easterEggContainerNode
    )

    this._onNotificationAdd({
      /** @returns {void} */
      cb: () => {
        let buttonNode = this._onSettingBtnAppend({
          isDefaultChecked: true,
          label: SettingButtonLabel.SWITCH_LOVE,
          name: SettingName.WHATISLOVE,
          onClick: this._handleSettingBtnClick,
        })

        buttonNode.focus()
      },
      duration: NOTIFICATION_DELAY,
      message: NotificationMessage.LOVE,
    })

    this._renderPlayer()

    this._removeListeners()

    easterEggContainerNode.remove()
  }

  /**
   * @param {(typeof SettingName)[keyof typeof SettingName]} _name
   * @param {boolean} isChecked
   * @returns {void}
   */
  _handleSettingBtnClick(_name, isChecked) {
    let audioNode = /** @type {HTMLAudioElement} */ (this._audioNode)

    isChecked ? audioNode.play() : audioNode.pause()
  }

  /** @returns {void} */
  _handleWindowResize() {
    this._setRandomPosition()
  }

  /** @returns {void} */
  _initListeners() {
    let easterEggButtonNode = /** @type {HTMLElement} */ (
      this._easterEggButtonNode
    )

    easterEggButtonNode.addEventListener(`click`, this._handleEasterEggClick)
    globalThis.addEventListener(`resize`, this._handleWindowResize)
  }

  /** @returns {void} */
  _removeListeners() {
    let easterEggButtonNode = /** @type {HTMLElement} */ (
      this._easterEggButtonNode
    )

    easterEggButtonNode.removeEventListener(`click`, this._handleEasterEggClick)
    globalThis.removeEventListener(`resize`, this._handleWindowResize)
  }

  /** @returns {void} */
  _renderPlayer() {
    this._audioNode = getPlayerElement(SOUND_SRC)

    document.body.append(this._audioNode)
  }

  /** @returns {void} */
  _setRandomPosition() {
    let easterEggContainerNode = /** @type {HTMLElement} */ (
      this._easterEggContainerNode
    )
    let { x, y } = getNodeRandomCoords(easterEggContainerNode)

    easterEggContainerNode.style.top = `${y}px`
    easterEggContainerNode.style.left = `${x}px`
  }

  /** @returns {void} */
  init() {
    this._easterEggContainerNode = /** @type {HTMLElement} */ (
      document.querySelector(`.not-easter-egg`)
    )
    this._easterEggButtonNode = /** @type {HTMLButtonElement} */ (
      document.querySelector(`.not-easter-egg__button`)
    )

    this._setRandomPosition()

    this._initListeners()
  }
}

export { EasterEgg }
