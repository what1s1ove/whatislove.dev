import { TocItem } from '../../types/toc-item.type.js'

/**
 * @param {TocItem} previous
 * @param {TocItem} current
 * @returns {TocItem}
 */
let getTocItemParent = (previous, current) => {
	if (current.level > previous.level) {
		return previous
	} else if (current.level === previous.level) {
		return /** @type {TocItem} */ (previous.parent)
	} else {
		return getTocItemParent(
			/** @type {TocItem} */ (previous.parent),
			current,
		)
	}
}

export { getTocItemParent }
