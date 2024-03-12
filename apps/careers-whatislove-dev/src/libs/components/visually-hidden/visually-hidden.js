import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { ComponentPrefix } from '~/libs/enums/enums.js'
import { parseRawStyleSheet } from '~/libs/helpers/helpers.js'

import styles from './styles.css?inline'

@customElement(`${ComponentPrefix.CWD}-visually-hidden`)
class _VisuallyHidden extends LitElement {
	static styles = parseRawStyleSheet(styles)

	/** @returns {ReturnType<html>} */
	render() {
		return html`<slot></slot>`
	}
}
