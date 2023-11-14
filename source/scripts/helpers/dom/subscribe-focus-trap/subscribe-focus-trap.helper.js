import { KeyboardKey } from '~/common/enums/enums.js'

const subscribeFocusTrap = (...elements) => {
  const firstNode = elements[0]
  const lastNode = elements.at(-1)

  const onFirstElementFocus = (event_) => {
    if (event_.key === KeyboardKey.TAB && event_.shiftKey) {
      event_.preventDefault()

      lastNode.focus()
    }
  }

  const onLastElementFocus = (event_) => {
    if (event_.key === KeyboardKey.TAB && !event_.shiftKey) {
      event_.preventDefault()

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
