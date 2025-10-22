import { KeyboardKey } from '~/libs/enums/enums.js'
import { checkIsOneOf, subscribeFocusTrap } from '~/libs/helpers/helpers.js'

class Navigation {
	/** @type {ReturnType<typeof subscribeFocusTrap> | undefined} */
	#focusTrap

	/** @type {(event_: KeyboardEvent) => void} */
	#handleEscapePress

	/** @type {(event_: Event) => void} */
	#handleNavButtonClick

	/** @type {() => void} */
	#handleOverlayClick

	/** @type {HTMLButtonElement | undefined} */
	#headerButtonNode

	/** @type {HTMLElement | undefined} */
	#headerMenuNode

	/** @type {HTMLElement | undefined} */
	#headerNode

	constructor() {
		this.#headerMenuNode = undefined
		this.#headerButtonNode = undefined
		this.#focusTrap = undefined

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

		let isOpen =
			/** @type {HTMLElement} */ (this.#headerButtonNode).ariaExpanded ===
			`true`

		this.#toggleOverlay(!isOpen)
	}

	/** @returns {void} */
	#clickOverlayHandler() {
		this.#toggleOverlay(false)
	}

	/** @returns {void} */
	#initListeners() {
		let headerNode = /** @type {HTMLElement} */ (this.#headerNode)
		let headerButtonNode = /** @type {HTMLButtonElement} */ (
			this.#headerButtonNode
		)

		headerButtonNode.addEventListener(`click`, this.#handleNavButtonClick)

		this.#focusTrap = subscribeFocusTrap(headerNode)
	}

	/** @returns {void} */
	#initOverlayListeners() {
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
		globalThis.removeEventListener(`keydown`, this.#handleEscapePress)
	}

	/**
	 * @param {boolean} isOpen
	 * @returns {void}
	 */
	#toggleOverlay(isOpen) {
		let headerMenuNode = /** @type {HTMLElement} */ (this.#headerMenuNode)
		let headerButtonNode = /** @type {HTMLButtonElement} */ (
			this.#headerButtonNode
		)
		let focusTrap = /** @type {ReturnType<typeof subscribeFocusTrap>} */ (
			this.#focusTrap
		)

		document.documentElement.classList.toggle(`page--no-scroll`, isOpen)

		headerButtonNode.ariaExpanded = isOpen.toString()

		headerMenuNode.classList.toggle(`header__menu--opened`, isOpen)

		if (isOpen) {
			this.#initOverlayListeners()

			focusTrap.activate()
		} else {
			focusTrap.deactivate()

			this.#removeOverlayListeners()
		}
	}

	/**
	 * @param {HTMLElement} headerNode
	 * @returns {void}
	 */
	init(headerNode) {
		this.#headerNode = headerNode

		this.#headerMenuNode = /** @type {HTMLElement} */ (
			headerNode.querySelector(`.header__menu`)
		)
		this.#headerButtonNode = /** @type {HTMLButtonElement} */ (
			headerNode.querySelector(`.header__button`)
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
