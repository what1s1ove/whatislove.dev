import { booleanToNumber } from '~/libs/maps/maps.js'

/**
 * @param {HTMLElement} node
 * @returns {boolean}
 */
let checkIsChecked = (node) => {
  let numberFromBoolean =
    booleanToNumber[
      /** @type {keyof typeof booleanToNumber} */ (node.ariaChecked) ?? `false`
    ]

  return Boolean(numberFromBoolean)
}

export { checkIsChecked }
