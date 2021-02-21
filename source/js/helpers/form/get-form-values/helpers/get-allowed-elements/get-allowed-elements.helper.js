import { checkIsElementAllowed } from '../check-is-element-allowed/check-is-element-allowed.helper'

const getAllowedElements = (elements) => {
  return elements.filter(checkIsElementAllowed)
}

export { getAllowedElements }
