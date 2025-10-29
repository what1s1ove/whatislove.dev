import { html, LitElement } from 'lit'

import {
	defineCustomElement,
	parseRawStyleSheet,
} from '~/libs/helpers/helpers.js'

import { Scene } from '../../enums/enums.js'
import styles from './styles.css?inline'

class ScreenInitial extends LitElement {
	static styles = parseRawStyleSheet(styles)

	/** @type {() => void} */
	#handlePlay

	constructor() {
		super()

		this.#handlePlay = this.#playHandler.bind(this)
	}

	/** @returns {ReturnType<html>} */
	render() {
		return html`
			<button class="play-btn" type="button" @click=${this.#handlePlay}>
				Join
			</button>
		`
	}

	/** @returns {void} } */
	#playHandler() {
		this.dispatchEvent(
			new CustomEvent(`changeScene`, {
				detail: Scene.PROCESS,
			}),
		)
	}
}

defineCustomElement(`cwd-screen-initial`, ScreenInitial)
