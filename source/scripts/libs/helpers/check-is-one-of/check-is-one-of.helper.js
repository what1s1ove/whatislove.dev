/**
 * @template T
 * @param {T} checkItem
 * @param {...T} checksItems
 * @returns {boolean}
 */
let checkIsOneOf = (checkItem, ...checksItems) => {
  return checksItems.includes(checkItem)
}

export { checkIsOneOf }
