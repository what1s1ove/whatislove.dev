let BlockName = /** @type {const} */ ({
	ARTICLE_CONTENT: `article__content`,
	SHADOWS: `scroll-shadows`,
})

/** @param {globalThis} window */
let addPreShadows = (window) => {
	let contentNode = window.document.querySelector(
		`.${BlockName.ARTICLE_CONTENT}`,
	)

	if (!contentNode) {
		return
	}

	let preNodes = contentNode.querySelectorAll(`pre`)

	for (let preNode of preNodes) {
		preNode.classList.add(
			BlockName.SHADOWS,
			`${BlockName.SHADOWS}--horizontal`,
		)
	}
}

export { addPreShadows }
