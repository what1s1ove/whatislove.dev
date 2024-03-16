import { LitElement, html } from 'lit'
import { property } from 'lit/decorators.js'

import {
	defineCustomElement,
	parseRawStyleSheet,
} from '~/libs/helpers/helpers.js'
import { ValuesOf } from '~/libs/types/types.js'

import './libs/components/components.js'
import { Scene } from './libs/enums/enums.js'
import { getInfoTemplate } from './libs/templates/templates.js'
import styles from './styles.css?inline'

class Root extends LitElement {
	static styles = parseRawStyleSheet(styles)

	/** @type {(event_: CustomEvent<ValuesOf<typeof Scene>>) => void} */
	#handleChangeScene

	/** @type {(scene: ValuesOf<typeof Scene>) => ReturnType<html>} */
	#handleSceneRender

	constructor() {
		super()

		this.#handleChangeScene = this.#changeSceneHandler.bind(this)
		this.#handleSceneRender = this.#renderSceneHandler.bind(this)
	}

	/**
	 * @param {CustomEvent<ValuesOf<typeof Scene>>} _event
	 * @returns {void}
	 */
	#changeSceneHandler(_event) {
		this.#scene = _event.detail
	}

	/**
	 * @param {ValuesOf<typeof Scene>} scene
	 * @returns {ReturnType<html>}
	 */
	#renderSceneHandler(scene) {
		switch (scene) {
			case Scene.INITIAL: {
				return html`
					<cwd-screen-initial
						@changeScene=${this.#handleChangeScene}
					></cwd-screen-initial>
				`
			}
			case Scene.PROCESS: {
				return html`
					<cwd-screen-process
						@changeScene=${this.#handleChangeScene}
					></cwd-screen-process>
				`
			}
			case Scene.FORM: {
				return html`
					<cwd-screen-form
						@changeScene=${this.#handleChangeScene}
					></cwd-screen-form>
				`
			}
		}
	}

	/** @returns {ReturnType<html>} */
	render() {
		return html`
			${getInfoTemplate({
				scene: this.#scene,
			})}
			${this.#handleSceneRender(this.#scene)}
		`
	}

	/** @type {ValuesOf<typeof Scene>} */
	@property()
	accessor #scene = Scene.INITIAL
}

defineCustomElement(`cwd-root`, Root)
