/**
 * @param {HTMLSelectElement} selectNode
 * @param {string[]} options
 * @returns {void}
 */
let fillSelectOptions = (selectNode, options) => {
	let selectOptions = options.map((option) => new Option(option, option))

	for (let option of selectOptions) {
		selectNode.add(option)
	}
}

export { fillSelectOptions }
