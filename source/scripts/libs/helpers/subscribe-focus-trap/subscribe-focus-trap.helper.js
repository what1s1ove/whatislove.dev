import { KeyboardKey } from '~/libs/enums/enums.js'

/**
 * @param {HTMLElement[]} elements
 * @returns {() => void}
 */
let subscribeFocusTrap = (...elements) => {
  let firstNode = /** @type {HTMLElement} */ (elements.at(0))
  let lastNode = /** @type {HTMLElement} */ (elements.at(-1))

  /**
   * @param {KeyboardEvent} event_
   * @returns {void}
   */
  let onFirstElementFocus = (event_) => {
    if (event_.key === KeyboardKey.TAB && event_.shiftKey) {
      event_.preventDefault()

      lastNode.focus()
    }
  }

  /**
   * @param {KeyboardEvent} event_
   * @returns {void}
   */
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
