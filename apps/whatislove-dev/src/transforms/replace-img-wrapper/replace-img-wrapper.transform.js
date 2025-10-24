let ARTICLE_CONTENT_BLOCK = /** @type {const} */ (`article__content`)

/**
 * @param {Window} window
 * @returns {void}
 */
let replaceImgWrapper = (window) => {
	let contentNode = window.document.querySelector(`.${ARTICLE_CONTENT_BLOCK}`)

	if (!contentNode) {
		return
	}

	let pictureNodes = contentNode.querySelectorAll(`p > picture`)

	for (let pictureNode of pictureNodes) {
		let imgNode = /** @type {HTMLImageElement} */ (
			pictureNode.querySelector(`img`)
		)
		let paragraphNode = /** @type {HTMLParagraphElement} */ (
			pictureNode.parentNode
		)
		let figureNode = window.document.createElement(`figure`)
		let figureCaptionNode = window.document.createElement(`figcaption`)

		figureCaptionNode.textContent = imgNode.alt

		figureNode.append(pictureNode)
		figureNode.append(figureCaptionNode)

		paragraphNode.replaceWith(figureNode)
	}
}

export { replaceImgWrapper }
