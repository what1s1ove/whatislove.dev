/* eslint-disable no-param-reassign */
import { TagName } from '~/common/enums'

const configureNode = (node, config) => {
  const { textContent, href, dateTime } = config

  if (!textContent) {
    node.remove()
  }

  switch (node.tagName) {
    case TagName.A: {
      node.textContent = textContent
      node.href = href

      break
    }
    case TagName.TIME: {
      node.textContent = textContent
      node.dateTime = dateTime

      break
    }
    case TagName.P:
    case TagName.H3: {
      node.textContent = textContent

      break
    }
    default: {
      throw new Error(`Oops. There is not such tag in the config`)
    }
  }
}

export { configureNode }
