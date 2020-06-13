import {
  getEventListener,
  setAttribute,
  toggleFocusTrap,
} from '../../helpers/index'
import { KeyboardKeys } from '../../common/map/index'

let header = document.querySelector(`.header`)
let headerOverlay = document.querySelector(`.header__navigation-wrapper`)
let headerNavLinks = document.querySelectorAll(`.navigation__item a[href]`)
let toggleBtn = document.querySelector(`.header__toggle-button`)

let focusTrapElements = [toggleBtn, ...headerNavLinks]

const HEADER_ACTIVE_CLASS = `header--active`

let cleanFocusTrap

// eslint-disable-next-line no-use-before-define
let onCloseOverlay = () => toggleOverlay(false)

let onEscapePress = (evt) => {
  if (evt.key === KeyboardKeys.ESCAPE) {
    onCloseOverlay()
  }
}

let toggleOverlay = (isActive) => {
  document.body.style.overflowY = isActive ? `hidden` : ``

  header.classList.toggle(HEADER_ACTIVE_CLASS)

  setAttribute(toggleBtn, `aria-expanded`, isActive)

  cleanFocusTrap = isActive
    ? toggleFocusTrap(focusTrapElements)
    : cleanFocusTrap()

  headerOverlay[getEventListener(isActive)](`click`, onCloseOverlay)

  window[getEventListener(isActive)](`keydown`, onEscapePress)
}

export default () => {
  toggleBtn.addEventListener(`click`, (evt) => {
    evt.stopPropagation()

    let hasActiveClass = header.classList.contains(HEADER_ACTIVE_CLASS)

    toggleOverlay(!hasActiveClass)
  })
}
