let START_IDX = 0

/**
 * @template {{ slice(start: number, end?: number): T }} T
 * @param {T} input
 * @param {number} count
 * @returns {T}
 */
let takeFirst = (input, count) => {
	return input.slice(START_IDX, count)
}

export { takeFirst }
