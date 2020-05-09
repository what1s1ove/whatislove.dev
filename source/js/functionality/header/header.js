import { checkNodeHasClass, toggleFocusTrap } from '../../helpers/index.js'
import { NodeMethods } from '../../common/map/index.js'
import { toggleOverlay } from './helpers'
import { HEADER_ACTIVE_CLASS } from './common'

const header = document.querySelector(`.header`)
const headerOverlay = document.querySelector(`.header__navigation-wrapper`)
const headerNavLinks = document.querySelectorAll(`.navigation__item a[href]`)
const toggleBtn = document.querySelector(`.header__toggle-button`)

const focusTrapElemnts = [...headerNavLinks, toggleBtn]

const onHeaderOverlay = () => {
  const isActive = checkNodeHasClass(header, HEADER_ACTIVE_CLASS)

  toggleOverlay(header, isActive)
}

export const initHeader = () => {
  toggleBtn.addEventListener(`click`, (evt) => {
    evt.stopPropagation()

    const hasActiveClass = checkNodeHasClass(header, HEADER_ACTIVE_CLASS)

    toggleOverlay(header, hasActiveClass)

    headerOverlay[
      hasActiveClass
        ? NodeMethods.REMOVE_EVENT_LISTENER
        : NodeMethods.ADD_EVET_LISTENER
    ](`click`, onHeaderOverlay)

    toggleFocusTrap(focusTrapElemnts, !hasActiveClass)
  })
}
