import { NodeMethods, ClassListActions } from '../common/map/node.js'

const setAttribute = (attr, value) => {
  document.documentElement.setAttribute(`data-${attr}`, value)
}

const checkNodeHasClass = (node, className) => {
  const hasClass = node.classList.contains(className)

  return hasClass
}

const getEventListener = (flag) => {
  const listener = flag
    ? NodeMethods.ADD_EVET_LISTENER
    : NodeMethods.REMOVE_EVENT_LISTENER

  return listener
}

const getClassAction = (flag) => {
  const classAction = flag ? ClassListActions.ADD : ClassListActions.REMOVE

  return classAction
}

export { setAttribute, checkNodeHasClass, getEventListener, getClassAction }
