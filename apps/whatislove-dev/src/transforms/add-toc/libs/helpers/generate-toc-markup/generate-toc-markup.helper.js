import { BlockName } from '../../enums/enums.js'
import { TocItem } from '../../types/types.js'

/**
 * @param {TocItem} item
 * @returns {string}
 */
let generateTocMarkup = (item) => {
	let hasLiNode = item.slug && item.text
	let markup = ``

	if (hasLiNode) {
		markup += `
			<li class="${BlockName.TOC}__item">
				<a
					class="${BlockName.TOC}__link"
					href="#${/** @type {string} */ (item.slug).toString()}"
				>
					${/** @type {string} */ (item.text).toString()}
				</a>
		`
	}

	if (item.children.length > 0) {
		let childrenMarkup = item.children
			.map((it) => generateTocMarkup(it))
			.join(``)

		markup += `
			<ol class="${BlockName.TOC}__list">${childrenMarkup}</ol>
		`
	}

	if (hasLiNode) {
		markup += `</li>`
	}

	return markup
}

export { generateTocMarkup }
