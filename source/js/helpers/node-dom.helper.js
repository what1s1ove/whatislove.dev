import { NodeMethods, ClassListActions } from '../common/map/node'

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

const outputStringNodes = (container, stringNodes) => {
  container.innerHTML = ``  

  container.insertAdjacentHTML(`afterbegin`, stringNodes.join(``))
}

export {
  setAttribute,
  checkNodeHasClass,
  getEventListener,
  getClassAction,
  outputStringNodes,
}
