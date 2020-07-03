import { KeyboardKeys } from '../common/map'

const toggleFocusTrap = (focusTrapElements) => {
  let firstNode = focusTrapElements[0]
  let lastNode = focusTrapElements[focusTrapElements.length - 1]

  let onFirstElementFocus = (evt) => {
    if (evt.key === KeyboardKeys.TAB && evt.shiftKey) {
      evt.preventDefault()

      lastNode.focus()
    }
  }

  let onLastElementFocus = (evt) => {
    if (evt.key === KeyboardKeys.TAB && !evt.shiftKey) {
      evt.preventDefault()

      firstNode.focus()
    }
  }

  firstNode.focus()

  firstNode.addEventListener(`keydown`, onFirstElementFocus)

  lastNode.addEventListener(`keydown`, onLastElementFocus)

  return () => {
    firstNode.removeEventListener(`keydown`, onFirstElementFocus)

    lastNode.removeEventListener(`keydown`, onLastElementFocus)
  }
}

export { toggleFocusTrap }
