import { KeyboardKeys, NodeMethods } from '../common/map/index.js'

const toggleFocusTrap = (nodeList, isActive) => {
  const firstNode = nodeList[0]
  const lastNode = nodeList[nodeList.length - 1]

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

  firstNode[
    isActive ? NodeMethods.ADD_EVET_LISTENER : NodeMethods.REMOVE_EVENT_LISTENER
  ](`keydown`, onFirstElementFocus)

  lastNode[
    isActive ? NodeMethods.ADD_EVET_LISTENER : NodeMethods.REMOVE_EVENT_LISTENER
  ](`keydown`, onLastElementFocus)
}

export { toggleFocusTrap }
