import { ControlType, getFormValues } from 'form-payload'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { ComponentPrefix } from '~/libs/enums/enums.js'
import { parseRawStyleSheet } from '~/libs/helpers/helpers.js'
import { TableNames, database } from '~/libs/modules/database/database.js'
import { notify } from '~/libs/modules/notify/notify.js'

import { Scene } from '../../enums/enums.js'
import { MemberFormKey } from './libs/enums/enums.js'
import styles from './styles.css?inline'

@customElement(`${ComponentPrefix.CWD}-screen-form`)
class _ScreenForm extends LitElement {
	static styles = parseRawStyleSheet(styles)

	/** @type {() => void} */
	#handleClickRepeat

	/** @type {(event_: SubmitEvent) => void} */
	#handleSubmit

	constructor() {
		super()

		this.#handleSubmit = this.#submitHandler.bind(this)
		this.#handleClickRepeat = this.#clickRepeatHandler.bind(this)
	}

	/** @returns {void} } */
	#clickRepeatHandler() {
		this.dispatchEvent(
			new CustomEvent(`changeScene`, {
				detail: Scene.PROCESS,
			}),
		)
	}

	/**
	 * @param {SubmitEvent} event_
	 * @returns {void}
	 */
	#submitHandler(event_) {
		event_.preventDefault()

		let formNode = /** @type {HTMLFormElement} */ (event_.target)
		let { set } = database.getTableReference(TableNames.MEMBERS)

		set(getFormValues(formNode))
			.then(() => {
				notify.success(`See u.`)
			})
			.catch(() => {
				notify.error(
					`Failed to submit your form! Reach me another way.`,
				)
			})

		formNode.reset()
	}

	/** @returns {ReturnType<html>} */
	render() {
		return html`
			<div class="form-wrapper">
				<header class="header">
					<h2 class="title">Join Form</h2>
					<p class="description">Run with me or run from me.</p>
				</header>
				<form class="form" @submit=${this.#handleSubmit}>
					<label class="label">
						Head:
						<input
							class="input"
							type=${ControlType.TEXT}
							name=${MemberFormKey.HEAD}
							placeholder="O Captain! My Captain..."
							minlength="3"
							required
						/>
					</label>
					<label class="label">
						Body:
						<textarea
							class="input"
							type=${ControlType.TEXT}
							name=${MemberFormKey.BODY}
							placeholder="I want to join cuz..."
							minlength="3"
							rows="5"
							required
						></textarea>
					</label>
					<button class="submit-btn" type="submit">Join</button>
				</form>
			</div>
			<button
				class="repeat-btn"
				type="button"
				@click=${this.#handleClickRepeat}
			>
				Didn't get it. Repeat.
			</button>
		`
	}
}
