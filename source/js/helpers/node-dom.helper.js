import { NodeMethods } from '../common/map/node'

const setAttribute = (element, attr, value) => {
  element.setAttribute(attr, value)
}

const getEventListener = (flag) => {
  let listener = flag
    ? NodeMethods.ADD_EVET_LISTENER
    : NodeMethods.REMOVE_EVENT_LISTENER

  return listener
}

const outputStringNodes = (container, stringNodes) => {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = ``

  container.insertAdjacentHTML(`afterbegin`, stringNodes.join(``))
}

export { setAttribute, getEventListener, outputStringNodes }
