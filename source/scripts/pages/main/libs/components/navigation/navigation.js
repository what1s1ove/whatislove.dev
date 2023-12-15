import { KeyboardKey } from '~/libs/enums/enums.js'
import { checkIsOneOf, subscribeFocusTrap } from '~/libs/helpers/helpers.js'

import { HEADER_ACTIVE_CLASS } from './libs/constants/constants.js'

class Navigation {
	/** @type {(() => void) | undefined} */
	#cleanFocusTrap

	/** @type {(event_: KeyboardEvent) => void} */
	#handleEscapePress

	/** @type {(event_: Event) => void} */
	#handleNavButtonClick

	/** @type {() => void} */
	#handleOverlayClick

	/** @type {HTMLButtonElement | undefined} */
	#headerButtonNode

	/** @type {HTMLElement | undefined} */
	#headerNode

	/** @type {HTMLElement | undefined} */
	#headerOverlayNode

	constructor() {
		this.#headerNode = undefined
		this.#headerOverlayNode = undefined
		this.#headerButtonNode = undefined
		this.#cleanFocusTrap = undefined

		this.#handleNavButtonClick = this.#clickNavButtonHandler.bind(this)
		this.#handleOverlayClick = this.#clickOverlayHandler.bind(this)
		this.#handleEscapePress = this.#pressEscapeHandler.bind(this)
	}

	/**
	 * @param {Event} event_
	 * @returns {void}
	 */
	#clickNavButtonHandler(event_) {
		event_.stopPropagation()

		let hasClass = /** @type {HTMLElement} */ (
			this.#headerNode
		).classList.contains(HEADER_ACTIVE_CLASS)

		this.#toggleOverlay(!hasClass)
	}

	/** @returns {void} */
	#clickOverlayHandler() {
		this.#toggleOverlay(false)
	}

	/** @returns {void} */
	#initListeners() {
		let headerButtonNode = /** @type {HTMLButtonElement} */ (
			this.#headerButtonNode
		)

		headerButtonNode.addEventListener(`click`, this.#handleNavButtonClick)
	}

	/** @returns {void} */
	#initOverlayListeners() {
		let headerOverlayNode = /** @type {HTMLElement} */ (
			this.#headerOverlayNode
		)

		headerOverlayNode.addEventListener(`click`, this.#handleOverlayClick)
		globalThis.addEventListener(`keydown`, this.#handleEscapePress)
	}

	/**
	 * @param {KeyboardEvent} event_
	 * @returns {void}
	 */
	#pressEscapeHandler({ key }) {
		if (checkIsOneOf(key, KeyboardKey.ESCAPE)) {
			this.#handleOverlayClick()
		}
	}

	/** @returns {void} */
	#removeOverlayListeners() {
		let headerOverlayNode = /** @type {HTMLElement} */ (
			this.#headerOverlayNode
		)

		headerOverlayNode.removeEventListener(`click`, this.#handleOverlayClick)
		globalThis.removeEventListener(`keydown`, this.#handleEscapePress)
	}

	/**
	 * @param {boolean} isActive
	 * @returns {void}
	 */
	#toggleOverlay(isActive) {
		let headerNode = /** @type {HTMLElement} */ (this.#headerNode)
		let headerButtonNode = /** @type {HTMLButtonElement} */ (
			this.#headerButtonNode
		)

		document.body.style.overflowY = isActive ? `hidden` : ``

		headerNode.classList.toggle(HEADER_ACTIVE_CLASS)

		headerButtonNode.ariaExpanded = isActive.toString()

		isActive ? this.#initOverlayListeners() : this.#removeOverlayListeners()

		let focusTrapElements = /** @type {HTMLElement[]} */ ([
			headerButtonNode,
			...this.headerLinkNodes,
		])

		if (isActive) {
			this.#cleanFocusTrap = subscribeFocusTrap(...focusTrapElements)
		} else {
			let cleanFocusTrap = /** @type {() => void} */ (
				this.#cleanFocusTrap
			)

			cleanFocusTrap()
		}
	}

	/**
	 * @param {HTMLElement} headerNode
	 * @returns {void}
	 */
	init(headerNode) {
		this.#headerNode = headerNode
		this.#headerOverlayNode = /** @type {HTMLElement} */ (
			this.#headerNode.querySelector(`.header__navigation-wrapper`)
		)
		this.#headerButtonNode = /** @type {HTMLButtonElement} */ (
			this.#headerNode.querySelector(`.header__toggle-button`)
		)

		this.#initListeners()
	}

	/** @returns {NodeListOf<HTMLAnchorElement>} */
	get headerLinkNodes() {
		let headerNode = /** @type {HTMLElement} */ (this.#headerNode)

		return headerNode.querySelectorAll(`.navigation__item a[href]`)
	}
}

export { Navigation }
