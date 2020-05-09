import { HEADER_ACTIVE_CLASS } from './common'

const toggleOverlay = (header, isActive) => {
  if (isActive) {
    header.classList.remove(HEADER_ACTIVE_CLASS)

    document.body.style.overflowY = ''
  } else {
    header.classList.add(HEADER_ACTIVE_CLASS)

    document.body.style.overflowY = 'hidden'
  }
}

export { toggleOverlay }
