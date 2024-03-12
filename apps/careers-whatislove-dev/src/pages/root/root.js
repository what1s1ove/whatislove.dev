import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ComponentPrefix } from '~/libs/enums/enums.js'
import { parseRawStyleSheet } from '~/libs/helpers/helpers.js'
import { TableNames, appDatabase } from '~/libs/modules/database/database.js'
import { ValuesOf } from '~/libs/types/types.js'

import './libs/components/components.js'
import { Scene } from './libs/enums/enums.js'
import styles from './styles.css?inline'

@customElement(`${ComponentPrefix.CWD}-root`)
class _Root extends LitElement {
	static styles = parseRawStyleSheet(styles)

	/** @type {(event_: CustomEvent<ValuesOf<typeof Scene>>) => void} */
	#handleChangeScene

	/**
	 * @type {(
	 * 	event: CustomEvent<Record<string, unknown>>,
	 * ) => Promise<void>}
	 */
	#handleMemberFormSubmit

	/** @type {(scene: ValuesOf<typeof Scene>) => ReturnType<html>} */
	#handleSceneRender

	constructor() {
		super()

		this.#handleChangeScene = this.#changeSceneHandler.bind(this)
		this.#handleSceneRender = this.#renderSceneHandler.bind(this)
		this.#handleMemberFormSubmit = this.#submitMemberFormHandler.bind(this)
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
						@submitMember=${this.#handleMemberFormSubmit}
					></cwd-screen-form>
				`
			}
		}
	}

	/**
	 * @param {CustomEvent<Record<string, unknown>>} _event
	 * @returns {Promise<void>}
	 */
	async #submitMemberFormHandler(_event) {
		let { set } = appDatabase.getTableReference(TableNames.MEMBERS)

		await set(_event.detail)
	}

	/** @returns {ReturnType<html>} */
	render() {
		return this.#handleSceneRender(this.#scene)
	}

	/** @type {ValuesOf<typeof Scene>} */
	@property()
	accessor #scene = Scene.INITIAL
}
