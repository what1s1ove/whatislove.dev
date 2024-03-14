import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { ComponentPrefix } from '~/libs/enums/enums.js'
import { parseRawStyleSheet } from '~/libs/helpers/helpers.js'

import { Scene } from '../../enums/enums.js'
import styles from './styles.css?inline'

@customElement(`${ComponentPrefix.CWD}-screen-initial`)
class _ScreenInitial extends LitElement {
	static styles = parseRawStyleSheet(styles)

	/** @type {() => void} */
	#handlePlay

	constructor() {
		super()

		this.#handlePlay = this.#playHandler.bind(this)
	}

	/** @returns {void} } */
	#playHandler() {
		this.dispatchEvent(
			new CustomEvent(`changeScene`, {
				detail: Scene.PROCESS,
			}),
		)
	}

	/** @returns {ReturnType<html>} */
	render() {
		return html`
			<button class="play-btn" type="button" @click=${this.#handlePlay}>
				Join
			</button>
		`
	}
}
