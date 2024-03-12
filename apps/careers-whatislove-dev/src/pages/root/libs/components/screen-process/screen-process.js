import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { createRef, ref } from 'lit/directives/ref.js'

import { ComponentPrefix, KeyboardKey } from '~/libs/enums/enums.js'
import { parseRawStyleSheet } from '~/libs/helpers/helpers.js'
import { NodeReference } from '~/libs/types/types.js'

import { Scene } from '../../enums/enums.js'
import {
	PROCESS_PHRASE_DURATION_MS,
	PROCESS_PHRASE_TIMESTAMPS,
} from './libs/constants/constants.js'
import styles from './styles.css?inline'

@customElement(`${ComponentPrefix.CWD}-screen-process`)
class _ScreenProcess extends LitElement {
	static styles = parseRawStyleSheet(styles)

	/** @type {NodeReference<HTMLAudioElement>} */
	#audioPlayerNodeRef = createRef()

	/** @type {() => void} */
	#handleEnded

	/** @type {() => void} */
	#handleFullscreen

	/** @type {(event: KeyboardEvent) => void} */
	#handlePause

	/** @type {() => void} */
	#handleTimeUpdate

	/** @type {NodeReference<HTMLProgressElement>} */
	#progressNodeRef = createRef()

	/** @type {NodeReference<HTMLVideoElement>} */
	#videoPlayerNodeRef = createRef()

	constructor() {
		super()
		this.#handleTimeUpdate = this.#timeUpdateHandler.bind(this)
		this.#handleEnded = this.#endedHandler.bind(this)
		this.#handleFullscreen = this.#fullscreenHandler.bind(this)
		this.#handlePause = this.#pauseHandler.bind(this)
	}

	/** @returns {void} */
	#endedHandler() {
		this.dispatchEvent(
			new CustomEvent(`changeScene`, {
				detail: Scene.FORM,
			}),
		)
	}

	/** @returns {void} */
	#fullscreenHandler() {
		document.fullscreenElement
			? void document.exitFullscreen()
			: void document.documentElement.requestFullscreen()
	}

	/**
	 * @param {KeyboardEvent} event
	 * @returns {void}
	 */
	#pauseHandler(event) {
		let isSpacePressed = event.key === KeyboardKey.SPACE

		if (!isSpacePressed) {
			return
		}

		let audioPlayerNode = /** @type {HTMLAudioElement} */ (
			this.#audioPlayerNodeRef.value
		)

		let videoPlayerNode = /** @type {HTMLVideoElement} */ (
			this.#videoPlayerNodeRef.value
		)

		let isPaused = audioPlayerNode.paused

		if (isPaused) {
			void audioPlayerNode.play()
			void videoPlayerNode.play()
		} else {
			audioPlayerNode.pause()
			videoPlayerNode.pause()
		}
	}

	/** @returns {void} */
	#timeUpdateHandler() {
		let audioPlayerNode = /** @type {HTMLAudioElement} */ (
			this.#audioPlayerNodeRef.value
		)
		let progressNode = /** @type {HTMLProgressElement} */ (
			this.#progressNodeRef.value
		)

		progressNode.value = audioPlayerNode.currentTime
		progressNode.max = audioPlayerNode.duration

		let isTimeToShow = PROCESS_PHRASE_TIMESTAMPS.includes(
			Math.trunc(audioPlayerNode.currentTime),
		)

		let hasPhrase = this.#phraseTimeoutId !== undefined

		if (isTimeToShow && !hasPhrase) {
			this.#phraseTimeoutId = setTimeout(() => {
				clearTimeout(
					/** @type {ReturnType<typeof setTimeout>} */ (
						this.#phraseTimeoutId
					),
				)

				this.#phraseTimeoutId = undefined
			}, PROCESS_PHRASE_DURATION_MS)
		}
	}

	/** @returns {void} */
	connectedCallback() {
		super.connectedCallback()

		window.addEventListener(`keydown`, this.#handlePause)
	}

	/** @returns {void} */
	disconnectedCallback() {
		super.disconnectedCallback()

		if (document.fullscreenElement) {
			void document.exitFullscreen()
		}

		window.removeEventListener(`keydown`, this.#handlePause)
	}

	/** @returns {ReturnType<html>} */
	render() {
		let hasPhrase = this.#phraseTimeoutId !== undefined

		return html`
			<audio
				class="audio"
				src="/process.mp3"
				autoplay
				${ref(this.#audioPlayerNodeRef)}
				@timeupdate=${this.#handleTimeUpdate}
				@ended=${this.#handleEnded}
			></audio>
			<video
				class="video"
				src="/process.mp4"
				autoplay
				${ref(this.#videoPlayerNodeRef)}
			></video>
			<progress class="progress" ${ref(this.#progressNodeRef)}></progress>
			<button class="fullscreen-btn" @click=${this.#handleFullscreen}>
				<cwd-visually-hidden> Toggle Fullscreen </cwd-visually-hidden>
			</button>
			${hasPhrase
				? html`<div class="phrase">I'll Call U Mine</div>`
				: nothing}
		`
	}

	/** @type {ReturnType<typeof setTimeout> | undefined} */
	@property()
	accessor #phraseTimeoutId = undefined
}
