import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { ComponentPrefix } from '~/libs/enums/enums.js'
import { parseRawStyleSheet } from '~/libs/helpers/helpers.js'

import styles from './styles.css?inline'

@customElement(`${ComponentPrefix.CWD}-app`)
class _App extends LitElement {
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
