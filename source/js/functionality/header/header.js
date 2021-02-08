/* eslint-disable no-use-before-define */
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

const toggleListeners = (isActive) => {
  const eventListener = getEventListener(isActive)

  headerOverlayNode[eventListener](`click`, onOverlayClose)

  window[eventListener](`keydown`, onEscapePress)
}

const onOverlayClose = () => {
  toggleOverlay(false)
}

const onEscapePress = (evt) => {
  checkKeydownEvent(evt, KeyboardKey.ESCAPE, onOverlayClose)
}

const toggleOverlay = (isActive) => {
  document.body.style.overflowY = isActive ? `hidden` : ``

  headerNode.classList.toggle(HEADER_ACTIVE_CLASS)

  headerBtnNode.setAttribute(`aria-expanded`, isActive)

  toggleListeners(isActive)

  cleanFocusTrap = isActive
    ? subscribeFocusTrap(focusTrapElements)
    : cleanFocusTrap()
}

const initHeader = () => {
  headerBtnNode.addEventListener(`click`, (evt) => {
    evt.stopPropagation()

    const hasActiveClass = headerNode.classList.contains(HEADER_ACTIVE_CLASS)

    toggleOverlay(!hasActiveClass)
  })
}

export { initHeader }
