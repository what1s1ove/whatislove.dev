import { html, LitElement } from 'lit'

import {
	defineCustomElement,
	parseRawStyleSheet,
} from '~/libs/helpers/helpers.js'

import styles from './styles.css?inline'

class App extends LitElement {
	static styles = parseRawStyleSheet(styles)

	/** @returns {ReturnType<html>} */
	render() {
		return html`
			<cwd-visually-hidden>
				<h1>Join the whatislove.dev community</h1>
			</cwd-visually-hidden>
			<cwd-root></cwd-root>
		`
	}
}

defineCustomElement(`cwd-app`, App)
