/**
 * @param {`${'cwd'}-${string}`} tagName
 * @param {CustomElementConstructor} component
 * @returns {void}
 */
let defineCustomElement = (tagName, component) => {
	customElements.define(tagName, component)
}

export { defineCustomElement }
