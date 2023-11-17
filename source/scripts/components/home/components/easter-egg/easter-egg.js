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

/** @typedef {import('~/common/types/toast/toast').ToastMessagePayload} ToastMessagePayload */
/** @typedef {import('~/common/types/settings/settings').SettingButtonPayload} SettingButtonPayload */
/** @typedef {typeof import('~/common/enums/enums.js').SettingName} SettingName */

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
    this._handleWindowResize = debounce(
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
