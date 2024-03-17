import { LitElement, html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { createRef, ref } from 'lit/directives/ref.js'

import { KeyboardKey } from '~/libs/enums/enums.js'
import {
	defineCustomElement,
	parseRawStyleSheet,
} from '~/libs/helpers/helpers.js'
import { NodeReference } from '~/libs/types/types.js'

import { Scene } from '../../enums/enums.js'
import {
	PROCESS_PHRASE_DURATION_MS,
	PROCESS_PHRASE_TIMESTAMPS,
} from './libs/constants/constants.js'
import styles from './styles.css?inline'

class ScreenProcess extends LitElement {
	static styles = parseRawStyleSheet(styles)

	/** @type {NodeReference<HTMLAudioElement>} */
	#audioPlayerNodeRef = createRef()

	/** @type {() => void} */
	#handleClickPlay

	/** @type {() => void} */
	#handleEnded

	/** @type {(event_: KeyboardEvent) => void} */
	#handleEscPress

	/** @type {() => void} */
	#handleFullscreenClick

	/** @type {() => void} */
	#handleTimeUpdate

	/** @type {NodeReference<HTMLProgressElement>} */
	#progressNodeRef = createRef()

	/** @type {NodeReference<HTMLVideoElement>} */
	#videoPlayerNodeRef = createRef()

	constructor() {
		super()
		this.#handleTimeUpdate = this.#updateTimeHandler.bind(this)
		this.#handleEnded = this.#endedHandler.bind(this)
		this.#handleFullscreenClick = this.#clickFullscreenHandler.bind(this)
		this.#handleEscPress = this.#pressEscHandler.bind(this)
		this.#handleClickPlay = this.#clickPlayHandler.bind(this)
	}

	/** @returns {void} */
	#clickFullscreenHandler() {
		document.fullscreenElement
			? void document.exitFullscreen()
			: void document.documentElement.requestFullscreen()
	}

	/** @returns {void} */
	#clickPlayHandler() {
		this.#togglePlayHandler()
	}

	/** @returns {void} */
	#endedHandler() {
		this.dispatchEvent(
			new CustomEvent(`changeScene`, {
				detail: Scene.FORM,
			}),
		)
	}

	/**
	 * @param {KeyboardEvent} _event
	 * @returns {void}
	 */
	#pressEscHandler(_event) {
		if (document.activeElement !== document.body) {
			return
		}

		if (_event.key === KeyboardKey.SPACE) {
			this.#togglePlayHandler()
		}
	}

	/** @returns {void} */
	#togglePlayHandler() {
		let audioPlayerNode = /** @type {HTMLAudioElement} */ (
			this.#audioPlayerNodeRef.value
		)

		let videoPlayerNode = /** @type {HTMLVideoElement} */ (
			this.#videoPlayerNodeRef.value
		)

		this.#isPlaying = !this.#isPlaying

		if (this.#isPlaying) {
			void audioPlayerNode.play()
			void videoPlayerNode.play()
		} else {
			audioPlayerNode.pause()
			videoPlayerNode.pause()
		}
	}

	/** @returns {void} */
	#updateTimeHandler() {
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

			this.requestUpdate()
		}
	}

	/** @returns {void} */
	connectedCallback() {
		super.connectedCallback()

		window.addEventListener(`keydown`, this.#handleEscPress)
	}

	/** @returns {void} */
	disconnectedCallback() {
		super.disconnectedCallback()

		if (document.fullscreenElement) {
			void document.exitFullscreen()
		}

		window.removeEventListener(`keydown`, this.#handleEscPress)
	}

	/** @returns {ReturnType<html>} */
	render() {
		let hasPhrase = this.#phraseTimeoutId !== undefined

		return html`
			<audio
				class="audio"
				src="/sounds/process.mp3"
				autoplay
				${ref(this.#audioPlayerNodeRef)}
				@timeupdate=${this.#handleTimeUpdate}
				@ended=${this.#handleEnded}
			></audio>
			<video
				class="video"
				src="/videos/process.mp4"
				autoplay
				${ref(this.#videoPlayerNodeRef)}
			></video>
			<progress class="progress" ${ref(this.#progressNodeRef)}></progress>
			<button
				class="play-btn"
				type="button"
				role="switch"
				aria-checked=${this.#isPlaying}
				@click=${this.#handleClickPlay}
			>
				<cwd-icon name=${this.#isPlaying ? `pause` : `play`}>
					<cwd-visually-hidden>Play</cwd-visually-hidden>
				</cwd-icon>
			</button>
			<button
				class="fullscreen-btn"
				type="button"
				@click=${this.#handleFullscreenClick}
			>
				<cwd-icon name="fullscreen">
					<cwd-visually-hidden>Toggle Fullscreen</cwd-visually-hidden>
				</cwd-icon>
			</button>
			${hasPhrase
				? html`<div class="phrase">I'll Call U Mine</div>`
				: nothing}
		`
	}

	/** @type {boolean} */
	@property()
	accessor #isPlaying = true

	/** @type {ReturnType<typeof setTimeout> | undefined} */
	@property()
	accessor #phraseTimeoutId = undefined
}

defineCustomElement(`cwd-screen-process`, ScreenProcess)
