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
			<li class="${BlockName.TOC_BLOCK}__item">
				<a class="${BlockName.TOC_BLOCK}__link" href="#${item.slug}">
					${item.text}
				</a>
		`
	}

	if (item.children.length > 0) {
		let childrenMarkup = item.children
			.map((it) => generateTocMarkup(it))
			.join(``)

		markup += `
			<ol class="${BlockName.TOC_BLOCK}__list">${childrenMarkup}</ol>
		`
	}

	if (hasLiNode) {
		markup += `</li>`
	}

	return markup
}

export { generateTocMarkup }
