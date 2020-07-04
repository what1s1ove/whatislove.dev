import { NodeEventListener } from '~/common/enum'

const setAttribute = (element, attr, value) => {
  element.setAttribute(attr, value)
}

const getEventListener = (flag) => {
  const listener = flag
    ? NodeEventListener.ADD_EVET_LISTENER
    : NodeEventListener.REMOVE_EVENT_LISTENER

  return listener
}

const outputStringNodes = (container, stringNodes) => {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = ``

  container.insertAdjacentHTML(`afterbegin`, stringNodes.join(``))
}

export { setAttribute, getEventListener, outputStringNodes }
