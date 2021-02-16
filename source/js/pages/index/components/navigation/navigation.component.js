import {
  getEventListener,
  checkKeydownEvent,
  subscribeFocusTrap,
} from '~/helpers'
import { KeyboardKey } from '~/common/enums'

const HEADER_ACTIVE_CLASS = `header--active`

const headerNode = document.querySelector(`.header`)
const headerOverlayNode = document.querySelector(`.header__navigation-wrapper`)
const headerLinkNodes = document.querySelectorAll(`.navigation__item a[href]`)
const headerBtnNode = document.querySelector(`.header__toggle-button`)

const focusTrapElements = [headerBtnNode, ...headerLinkNodes]
let cleanFocusTrap = null

class Navigation {
  constructor() {
    this._onEscapePress = this._onEscapePress.bind(this)
    this._onOverlayClose = this._onOverlayClose.bind(this)
  }

  init() {
    headerBtnNode.addEventListener(`click`, (evt) => {
      evt.stopPropagation()

      const hasActiveClass = headerNode.classList.contains(HEADER_ACTIVE_CLASS)

      this._toggleOverlay(!hasActiveClass)
    })
  }

  _toggleOverlay(isActive) {
    document.body.style.overflowY = isActive ? `hidden` : ``

    headerNode.classList.toggle(HEADER_ACTIVE_CLASS)

    headerBtnNode.setAttribute(`aria-expanded`, isActive)

    this._toggleListeners(isActive)

    cleanFocusTrap = isActive
      ? subscribeFocusTrap(focusTrapElements)
      : cleanFocusTrap()
  }

  _toggleListeners(isActive) {
    const eventListener = getEventListener(isActive)

    headerOverlayNode[eventListener](`click`, this._onOverlayClose)

    window[eventListener](`keydown`, this._onEscapePress)
  }

  _onOverlayClose() {
    this._toggleOverlay(false)
  }

  _onEscapePress(evt) {
    checkKeydownEvent(evt, KeyboardKey.ESCAPE, this._onOverlayClose)
  }
}

export { Navigation }
