import {
  getEventListener,
  setAttribute,
  toggleFocusTrap,
} from '../../helpers'
import { KeyboardKeys } from '../../common/map'

const HEADER_ACTIVE_CLASS = `header--active`

const header = document.querySelector(`.header`)
const headerOverlay = document.querySelector(`.header__navigation-wrapper`)
const headerNavLinks = document.querySelectorAll(`.navigation__item a[href]`)
const toggleBtn = document.querySelector(`.header__toggle-button`)

const focusTrapElements = [toggleBtn, ...headerNavLinks]
let cleanFocusTrap

// eslint-disable-next-line no-use-before-define
const onCloseOverlay = () => toggleOverlay(false)

const onEscapePress = (evt) => {
  if (evt.key === KeyboardKeys.ESCAPE) onCloseOverlay()
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

    const hasActiveClass = header.classList.contains(HEADER_ACTIVE_CLASS)

    toggleOverlay(!hasActiveClass)
  })
}
