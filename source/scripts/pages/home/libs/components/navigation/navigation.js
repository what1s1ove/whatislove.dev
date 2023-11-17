import { KeyboardKey } from '~/libs/enums/enums.js'
import { checkIsOneOf, subscribeFocusTrap } from '~/libs/helpers/helpers.js'

import { HEADER_ACTIVE_CLASS } from './libs/constants/constants.js'

class Navigation {
  constructor() {
    /** @type {HTMLElement | undefined} */
    this._headerNode = undefined
    /** @type {HTMLElement | undefined} */
    this._headerOverlayNode = undefined
    /** @type {HTMLButtonElement | undefined} */
    this._headerButtonNode = undefined
    /** @type {(() => void) | undefined} */
    this._cleanFocusTrap = undefined

    this._handleEscapePress = this._handleEscapePress.bind(this)
    this._handleOverlayClick = this._handleOverlayClick.bind(this)
    this._handleNavBtnClick = this._handleNavBtnClick.bind(this)
  }

  /**
   * @param {KeyboardEvent} event_
   * @returns {void}
   */
  _handleEscapePress({ key }) {
    if (checkIsOneOf(key, KeyboardKey.ESCAPE)) {
      this._handleOverlayClick()
    }
  }

  /**
   * @param {Event} event_
   * @returns {void}
   */
  _handleNavBtnClick(event_) {
    event_.stopPropagation()

    let hasClass = /** @type {HTMLElement} */ (
      this._headerNode
    ).classList.contains(HEADER_ACTIVE_CLASS)

    this._toggleOverlay(!hasClass)
  }

  /** @returns {void} */
  _handleOverlayClick() {
    this._toggleOverlay(false)
  }

  /** @returns {void} */
  _initListeners() {
    let headerButtonNode = /** @type {HTMLButtonElement} */ (
      this._headerButtonNode
    )

    headerButtonNode.addEventListener(`click`, this._handleNavBtnClick)
  }

  /** @returns {void} */
  _initOverlayListeners() {
    let headerOverlayNode = /** @type {HTMLElement} */ (this._headerOverlayNode)

    headerOverlayNode.addEventListener(`click`, this._handleOverlayClick)
    globalThis.addEventListener(`keydown`, this._handleEscapePress)
  }

  /** @returns {void} */
  _removeOverlayListeners() {
    let headerOverlayNode = /** @type {HTMLElement} */ (this._headerOverlayNode)

    headerOverlayNode.removeEventListener(`click`, this._handleOverlayClick)
    globalThis.removeEventListener(`keydown`, this._handleEscapePress)
  }

  /**
   * @param {boolean} isActive
   * @returns {void}
   */
  _toggleOverlay(isActive) {
    let headerNode = /** @type {HTMLElement} */ (this._headerNode)
    let headerButtonNode = /** @type {HTMLButtonElement} */ (
      this._headerButtonNode
    )

    document.body.style.overflowY = isActive ? `hidden` : ``

    headerNode.classList.toggle(HEADER_ACTIVE_CLASS)

    headerButtonNode.setAttribute(`aria-expanded`, isActive.toString())

    isActive ? this._initOverlayListeners() : this._removeOverlayListeners()

    let focusTrapElements = /** @type {HTMLElement[]} */ ([
      headerButtonNode,
      ...this.headerLinkNodes,
    ])

    this._cleanFocusTrap = isActive
      ? subscribeFocusTrap(...focusTrapElements)
      : /** @type {() => undefined} */ (this._cleanFocusTrap)()
  }

  /** @returns {void} */
  init() {
    this._headerNode = /** @type {HTMLElement} */ (
      document.querySelector(`.header`)
    )
    this._headerOverlayNode = /** @type {HTMLElement} */ (
      this._headerNode.querySelector(`.header__navigation-wrapper`)
    )
    this._headerButtonNode = /** @type {HTMLButtonElement} */ (
      this._headerNode.querySelector(`.header__toggle-button`)
    )

    this._initListeners()
  }

  /** @returns {NodeListOf<HTMLAnchorElement>} */
  get headerLinkNodes() {
    let headerNode = /** @type {HTMLElement} */ (this._headerNode)

    return headerNode.querySelectorAll(`.navigation__item a[href]`)
  }
}

export { Navigation }
