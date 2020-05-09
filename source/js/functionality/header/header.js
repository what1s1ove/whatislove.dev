import {
  checkNodeHasClass,
  getEventListener,
  getClassAction,
} from '../../helpers/index.js'
import { KeyboardKeys } from '../../common/map/index.js'

const header = document.querySelector(`.header`)
const headerOverlay = document.querySelector(`.header__navigation-wrapper`)
const headerNavLinks = document.querySelectorAll(`.navigation__item a[href]`)
const toggleBtn = document.querySelector(`.header__toggle-button`)

const focusTrapElements = [...headerNavLinks, toggleBtn]
const firstNode = focusTrapElements[0]
const lastNode = focusTrapElements[focusTrapElements.length - 1]

const HEADER_ACTIVE_CLASS = `header--active`

const onFirstElementFocus = (evt) => {
  if (evt.key === KeyboardKeys.TAB && evt.shiftKey) {
    evt.preventDefault()

    lastNode.focus()
  }
}

const onLastElementFocus = (evt) => {
  if (evt.key === KeyboardKeys.TAB && !evt.shiftKey) {
    evt.preventDefault()

    console.log(focusTrapElements)

    firstNode.focus()
  }
}

const toggleOverlay = (isActive) => {
  // document.body.style.overflowY = isActive ? 'hidden' : ``

  header.classList[getClassAction(isActive)](HEADER_ACTIVE_CLASS)

  if (isActive) {
    firstNode.focus()
  }

  firstNode[getEventListener(isActive)](`keydown`, onFirstElementFocus)

  lastNode[getEventListener(isActive)](`keydown`, onLastElementFocus)

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
