import { NodeEventListener } from '~/common/enums'

const getEventListener = (flag) => {
  const eventListener = flag ? NodeEventListener.ADD : NodeEventListener.REMOVE

  return eventListener
}

export { getEventListener }
