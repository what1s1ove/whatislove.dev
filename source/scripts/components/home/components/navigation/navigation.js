import { KeyboardKey } from '~/common/enums/enums.js'
import { checkIsOneOf, subscribeFocusTrap } from '~/helpers/helpers.js'

import { HEADER_ACTIVE_CLASS } from './common/constants.js'

class Navigation {
  constructor() {
    this._headerNode = undefined
    this._headerOverlayNode = undefined
    this._headerBtnNode = undefined
    this._cleanFocusTrap = undefined

    this._handleEscapePress = this._handleEscapePress.bind(this)
    this._handleOverlayClick = this._handleOverlayClick.bind(this)
    this._handleNavBtnClick = this._handleNavBtnClick.bind(this)
  }

  get headerLinkNodes() {
    return this._headerNode.querySelectorAll(`.navigation__item a[href]`)
  }

  init() {
    this._headerNode = document.querySelector(`.header`)
    this._headerOverlayNode = this._headerNode.querySelector(
      `.header__navigation-wrapper`,
    )
    this._headerBtnNode = this._headerNode.querySelector(
      `.header__toggle-button`,
    )

    this._initListeners()
  }

  _initListeners() {
    this._headerBtnNode.addEventListener(`click`, this._handleNavBtnClick)
  }

  _toggleOverlay(isActive) {
    document.body.style.overflowY = isActive ? `hidden` : ``

    this._headerNode.classList.toggle(HEADER_ACTIVE_CLASS)

    this._headerBtnNode.setAttribute(`aria-expanded`, isActive)

    isActive ? this._initOverlayListeners() : this._removeOverlayListeners()

    this._cleanFocusTrap = isActive
      ? subscribeFocusTrap(this._headerBtnNode, ...this.headerLinkNodes)
      : this._cleanFocusTrap()
  }

  _initOverlayListeners() {
    this._headerOverlayNode.addEventListener(`click`, this._handleOverlayClick)
    window.addEventListener(`keydown`, this._handleEscapePress)
  }

  _removeOverlayListeners() {
    this._headerOverlayNode.removeEventListener(
      `click`,
      this._handleOverlayClick,
    )
    window.removeEventListener(`keydown`, this._handleEscapePress)
  }

  _handleNavBtnClick(event_) {
    event_.stopPropagation()

    const hasClass = this._headerNode.classList.contains(HEADER_ACTIVE_CLASS)

    this._toggleOverlay(!hasClass)
  }

  _handleEscapePress({ key }) {
    if (checkIsOneOf(key, KeyboardKey.ESCAPE)) {
      this._handleOverlayClick()
    }
  }

  _handleOverlayClick() {
    this._toggleOverlay(false)
  }
}

export { Navigation }
