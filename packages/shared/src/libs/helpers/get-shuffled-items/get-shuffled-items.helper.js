let RANDOM_SEPARATOR = /** @type {const} */ (0.5)

/**
 * @template T
 * @param {T[]} items
 * @returns {T[]}
 */
let getShuffledItems = (items) => {
	return [...items].sort(() => Math.random() - RANDOM_SEPARATOR)
}

export { getShuffledItems }
