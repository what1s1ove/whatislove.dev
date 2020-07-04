import { NodeEventListener } from '~/common/enum'

const getEventListener = (flag) => {
  const eventListener = flag ? NodeEventListener.ADD : NodeEventListener.REMOVE

  return eventListener
}

export { getEventListener }
