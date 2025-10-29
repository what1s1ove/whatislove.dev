import { EMPTY_LENGTH_COUNT } from '@whatislove.dev/shared'

let CONTENT_FLOW_BLOCK = /** @type {const} */ (`content--flow`)

/**
 * @param {Window} window
 * @returns {void}
 */
let changeExternalLinkTarget = (window) => {
	let contentNodes = window.document.querySelectorAll(
		`.${CONTENT_FLOW_BLOCK}`,
	)

	if (contentNodes.length === EMPTY_LENGTH_COUNT) {
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

			externalLinkNode.rel = `noreferrer noopener`
		}
	}
}

export { changeExternalLinkTarget }
