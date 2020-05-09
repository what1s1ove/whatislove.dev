import { HEADER_ACTIVE_CLASS } from './common'

const toggleOverlay = (header, isActive) => {
  if (isActive) {
    document.body.style.overflowY = ``
    
    header.classList.remove(HEADER_ACTIVE_CLASS)
  } else {
    document.body.style.overflowY = `hidden`

    header.classList.add(HEADER_ACTIVE_CLASS)
  }
}

export { toggleOverlay }
