/**
 * @param {`${'cwd'}-${string}`} tagName
 * @param {CustomElementConstructor} component
 */
let defineCustomElement = (tagName, component) => {
	customElements.define(tagName, component)
}

export { defineCustomElement }
