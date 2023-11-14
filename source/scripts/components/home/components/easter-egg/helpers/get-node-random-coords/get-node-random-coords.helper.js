import { getRandomNumber } from '~/helpers/helpers.js'

let MIN_COORD_NUMBER = 0

let getNodeRandomCoords = (node) => {
  let y = getRandomNumber(
    MIN_COORD_NUMBER,
    document.documentElement.offsetHeight - node.offsetHeight,
  )
  let x = getRandomNumber(
    MIN_COORD_NUMBER,
    document.documentElement.offsetWidth - node.offsetWidth,
  )

  return {
    x,
    y,
  }
}

export { getNodeRandomCoords }
