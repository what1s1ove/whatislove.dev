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
		return html`<cwd-root></cwd-root>`
	}
}
