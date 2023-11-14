import { booleanToNumber } from '~/common/maps/maps.js'

import { CHECKED_ATTR } from '../../common/constants.js'

let checkIsChecked = (node) => {
  return Boolean(booleanToNumber[node.getAttribute(CHECKED_ATTR)])
}

export { checkIsChecked }
