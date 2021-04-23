import { getRandomNumber } from '~/helpers/helpers.js'

const MIN_COORD_NUMBER = 0

const getNodeRandomCoords = (node) => {
  const y = getRandomNumber(
    MIN_COORD_NUMBER,
    document.documentElement.offsetHeight - node.offsetHeight,
  )
  const x = getRandomNumber(
    MIN_COORD_NUMBER,
    document.documentElement.offsetWidth - node.offsetWidth,
  )

  return {
    x,
    y,
  }
}

export { getNodeRandomCoords }
