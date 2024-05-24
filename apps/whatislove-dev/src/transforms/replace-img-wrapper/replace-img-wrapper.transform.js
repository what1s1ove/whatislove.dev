let ARTICLE_CONTENT_BLOCK = /** @type {const} */ (`article__content`)

/** @param {globalThis} window */
let replaceImgWrapper = (window) => {
	let contentNode = window.document.querySelector(`.${ARTICLE_CONTENT_BLOCK}`)

	if (!contentNode) {
		return
	}

	let pictureNodes = contentNode.querySelectorAll(`p > picture`)

	for (let pictureNode of pictureNodes) {
		let paragraphNode = /** @type {HTMLParagraphElement} */ (
			pictureNode.parentNode
		)
		let figureNode = window.document.createElement(`figure`)

		figureNode.append(pictureNode)

		paragraphNode.replaceWith(figureNode)
	}
}

export { replaceImgWrapper }
