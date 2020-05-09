import {
  checkNodeHasClass,
  getEventListener,
  getClassAction,
  toggleFocusTrap,
} from '../../helpers/index.js'
import { KeyboardKeys } from '../../common/map/index.js'

const header = document.querySelector(`.header`)
const headerOverlay = document.querySelector(`.header__navigation-wrapper`)
const headerNavLinks = document.querySelectorAll(`.navigation__item a[href]`)
const toggleBtn = document.querySelector(`.header__toggle-button`)

const focusTrapElements = [toggleBtn, ...headerNavLinks]

const HEADER_ACTIVE_CLASS = `header--active`

let cleanFocusTrap

const toggleOverlay = (isActive) => {
  document.body.style.overflowY = isActive ? 'hidden' : ``

  header.classList[getClassAction(isActive)](HEADER_ACTIVE_CLASS)

  cleanFocusTrap = isActive
    ? toggleFocusTrap(focusTrapElements)
    : cleanFocusTrap()

  headerOverlay[getEventListener(isActive)](`click`, onCloseOverlay)

  window[getEventListener(isActive)](`keydown`, onEscapePress)
}

const onEscapePress = (evt) => {
  if (evt.key === KeyboardKeys.ESCAPE) {
    onCloseOverlay()
  }
}

const onCloseOverlay = () => toggleOverlay(false)

export const initHeader = () => {
  toggleBtn.addEventListener(`click`, (evt) => {
    evt.stopPropagation()

    const hasActiveClass = checkNodeHasClass(header, HEADER_ACTIVE_CLASS)

    toggleOverlay(!hasActiveClass)
  })
}
