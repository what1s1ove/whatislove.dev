import { checkNodeHasClass } from '../../helpers/index.js'
import { toggleOverlay } from './helpers'
import { HEADER_ACTIVE_CLASS } from './common'

const header = document.querySelector('.header')
const headerOverlay = document.querySelector('.header__navigation-wrapper')
const toggleBtn = document.querySelector('.header__toggle-button')

const onHeaderOverlay = () => {
  const isActive = checkNodeHasClass(header, HEADER_ACTIVE_CLASS)

  toggleOverlay(header, isActive)
}

export const initHeader = () => {
  toggleBtn.addEventListener('click', (evt) => {
    evt.stopPropagation()

    const isActive = checkNodeHasClass(header, HEADER_ACTIVE_CLASS)

    if (isActive) {
      toggleOverlay(header, isActive)

      headerOverlay.removeEventListener('click', onHeaderOverlay)
    } else {
      toggleOverlay(header, isActive)

      headerOverlay.addEventListener('click', onHeaderOverlay)
    }
  })
}
