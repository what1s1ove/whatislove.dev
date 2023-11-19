/**
 * @param {string} template
 * @returns {HTMLElement}
 */
let createElement = (template) => {
	let newElement = document.createElement(`div`)

	newElement.innerHTML = template

	return /** @type {HTMLElement} */ (newElement.firstElementChild)
}

export { createElement }
