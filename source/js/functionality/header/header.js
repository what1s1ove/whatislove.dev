import {
  checkNodeHasClass,
  getEventListener,
  getClassAction,
  toggleFocusTrap,
} from '../../helpers/index'
import { KeyboardKeys } from '../../common/map/index'

const header = document.querySelector(`.header`)
const headerOverlay = document.querySelector(`.header__navigation-wrapper`)
const headerNavLinks = document.querySelectorAll(`.navigation__item a[href]`)
const toggleBtn = document.querySelector(`.header__toggle-button`)

const focusTrapElements = [toggleBtn, ...headerNavLinks]

const HEADER_ACTIVE_CLASS = `header--active`

let cleanFocusTrap

// eslint-disable-next-line no-use-before-define
const onCloseOverlay = () => toggleOverlay(false)

const onEscapePress = (evt) => {
  if (evt.key === KeyboardKeys.ESCAPE) {
    onCloseOverlay()
  }
}

const toggleOverlay = (isActive) => {
  document.body.style.overflowY = isActive ? `hidden` : ``

  header.classList[getClassAction(isActive)](HEADER_ACTIVE_CLASS)

  cleanFocusTrap = isActive
    ? toggleFocusTrap(focusTrapElements)
    : cleanFocusTrap()

  headerOverlay[getEventListener(isActive)](`click`, onCloseOverlay)

  window[getEventListener(isActive)](`keydown`, onEscapePress)
}

export default  () => {
  toggleBtn.addEventListener(`click`, (evt) => {
    evt.stopPropagation()

    const hasActiveClass = checkNodeHasClass(header, HEADER_ACTIVE_CLASS)

    toggleOverlay(!hasActiveClass)
  })
}
