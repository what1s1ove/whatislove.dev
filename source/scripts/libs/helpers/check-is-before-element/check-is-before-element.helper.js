/**
 * @param {number} elementOffset
 * @returns {boolean}
 */
let checkIsBeforeElement = (elementOffset) => {
  let breakPoint = globalThis.scrollY + document.documentElement.clientHeight

  return breakPoint >= elementOffset
}

export { checkIsBeforeElement }
