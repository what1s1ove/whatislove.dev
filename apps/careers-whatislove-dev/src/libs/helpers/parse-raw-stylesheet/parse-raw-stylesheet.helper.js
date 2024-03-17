/**
 * @param {string} rawStyle
 * @returns {CSSStyleSheet}
 */
let parseRawStyleSheet = (rawStyle) => {
	let styles = new CSSStyleSheet()

	styles.replaceSync(rawStyle)

	return styles
}

export { parseRawStyleSheet }
