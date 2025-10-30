import slugify from '@sindresorhus/slugify'

import { EMPTY_LENGTH_COUNT } from '../../scripts/libs/constants/constants.js'
import { BlockName } from './libs/enums/enums.js'
import { generateTocMarkup, getTocItemParent } from './libs/helpers/helpers.js'
import { TocItem } from './libs/types/types.js'

/**
 * @param {Window} window
 * @returns {void}
 */
let addToc = (window) => {
	let tocWrapperNode = window.document.querySelector(`.${BlockName.TOC}`)
	let contentNode = window.document.querySelector(
		`.${BlockName.ARTICLE_CONTENT}`,
	)

	if (!tocWrapperNode || !contentNode) {
		return
	}

	let hasTocNodes = tocWrapperNode.children.length > EMPTY_LENGTH_COUNT

	if (hasTocNodes) {
		return
	}

	let headingNodes = contentNode.querySelectorAll(`h2, h3, h4, h5, h6`)

	/** @type {TocItem} */
	let toc = {
		children: [],
		level: 0,
		parent: undefined,
		slug: undefined,
		text: undefined,
	}

	let previous = toc

	for (let heading of headingNodes) {
		heading.id = slugify(heading.textContent, {
			decamelize: false,
		})

		/** @type {TocItem} */
		let current = {
			children: [],
			level: Number(heading.tagName.replace(`H`, ``)),
			parent: undefined,
			slug: heading.id,
			text: heading.textContent.trim(),
		}

		let parent = getTocItemParent(previous, current)

		current.parent = parent
		parent.children.push(current)
		previous = current
	}

	tocWrapperNode.innerHTML = generateTocMarkup(toc)
}

export { addToc }
