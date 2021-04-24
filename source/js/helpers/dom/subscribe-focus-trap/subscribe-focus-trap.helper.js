import { KeyboardKey } from '~/common/enums/enums.js'

const subscribeFocusTrap = (...elements) => {
  const firstNode = elements[0]
  const lastNode = elements[elements.length - 1]

  const onFirstElementFocus = (evt) => {
    if (evt.key === KeyboardKey.TAB && evt.shiftKey) {
      evt.preventDefault()

      lastNode.focus()
    }
  }

  const onLastElementFocus = (evt) => {
    if (evt.key === KeyboardKey.TAB && !evt.shiftKey) {
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

export { subscribeFocusTrap }
