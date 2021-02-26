import { booleanToNumber } from '~/common/maps'
import { CHECKED_ATTR } from '../../common/constants'

const checkIsChecked = (node) => {
  return Boolean(booleanToNumber[node.getAttribute(CHECKED_ATTR)])
}

export { checkIsChecked }
