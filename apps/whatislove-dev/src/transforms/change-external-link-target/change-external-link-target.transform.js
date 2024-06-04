let CONTENT_BLOCK = /** @type {const} */ (`content`)

/** @param {globalThis} window */
let changeExternalLinkTarget = (window) => {
	let contentNodes = window.document.querySelectorAll(`.${CONTENT_BLOCK}`)

	if (contentNodes.length === 0) {
		return
	}

	let externalLinkNodes = /** @type {HTMLAnchorElement[]} */ (
		[...contentNodes].flatMap((contentNode) => {
			return [...contentNode.querySelectorAll(`a[href^="http"]`)]
		})
	)

	for (let externalLinkNode of externalLinkNodes) {
		let hasTarget = externalLinkNode.hasAttribute(`target`)
		let hasRelation = externalLinkNode.hasAttribute(`rel`)

		if (!hasTarget && !hasRelation) {
			externalLinkNode.target = `_blank`

			externalLinkNode.setAttribute(`rel`, `noreferrer noopener`)
		}
	}
}

export { changeExternalLinkTarget }
