import { LitElement, html } from 'lit'

import {
	defineCustomElement,
	parseRawStyleSheet,
} from '~/libs/helpers/helpers.js'

import styles from './styles.css?inline'

class VisuallyHidden extends LitElement {
	static styles = parseRawStyleSheet(styles)

	/** @returns {ReturnType<html>} */
	render() {
		return html`<slot></slot>`
	}
}

defineCustomElement(`cwd-visually-hidden`, VisuallyHidden)
