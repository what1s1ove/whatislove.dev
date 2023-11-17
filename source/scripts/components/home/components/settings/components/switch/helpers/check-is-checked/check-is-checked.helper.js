import { booleanToNumber } from '~/common/maps/maps.js'

import { CHECKED_ATTR } from '../../common/constants.js'

/**
 * @param {HTMLElement} node
 * @returns {boolean}
 */
let checkIsChecked = (node) => {
  let attributeValue = /** @type {keyof typeof booleanToNumber} */ (
    node.getAttribute(CHECKED_ATTR)
  )
  let numberFromBoolean = booleanToNumber[attributeValue]

  return Boolean(numberFromBoolean)
}

export { checkIsChecked }
