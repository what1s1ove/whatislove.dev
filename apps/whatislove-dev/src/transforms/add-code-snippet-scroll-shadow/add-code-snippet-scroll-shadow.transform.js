let ARTICLE_CONTENT_BLOCK = /** @type {const} */ (`article__content`)

/**
 * @param {Window} window
 * @returns {void}
 */
let addCodeSnippetScrollShadow = (window) => {
	let contentNode = window.document.querySelector(`.${ARTICLE_CONTENT_BLOCK}`)

	if (!contentNode) {
		return
	}

	let preNodes = contentNode.querySelectorAll(`pre`)

	for (let preNode of preNodes) {
		preNode.classList.add(`scroll-shadows`, `scroll-shadows--horizontal`)
	}
}

export { addCodeSnippetScrollShadow }
