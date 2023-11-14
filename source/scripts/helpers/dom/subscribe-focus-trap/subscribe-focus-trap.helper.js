import { KeyboardKey } from '~/common/enums/enums.js'

let subscribeFocusTrap = (...elements) => {
  let [firstNode] = elements
  let lastNode = elements.at(-1)

  let onFirstElementFocus = (event_) => {
    if (event_.key === KeyboardKey.TAB && event_.shiftKey) {
      event_.preventDefault()

      lastNode.focus()
    }
  }

  let onLastElementFocus = (event_) => {
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
