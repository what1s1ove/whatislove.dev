import { KeyboardKeys } from '../common/map/index'

const toggleFocusTrap = (focusTrapElements) => {
  const firstNode = focusTrapElements[0]
  const lastNode = focusTrapElements[focusTrapElements.length - 1]

  const onFirstElementFocus = (evt) => {
    if (evt.key === KeyboardKeys.TAB && evt.shiftKey) {
      evt.preventDefault()

      lastNode.focus()
    }
  }

  const onLastElementFocus = (evt) => {
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
