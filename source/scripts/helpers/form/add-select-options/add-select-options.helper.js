/**
 * @param {HTMLSelectElement} selectNode
 * @param {HTMLOptionElement[]} options
 * @returns {void}
 */
let addSelectOptions = (selectNode, options) => {
  for (let option of options) {
    selectNode.add(option)
  }
}

export { addSelectOptions }
