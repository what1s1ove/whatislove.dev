import { createFocusTrap } from 'focus-trap'

/**
 * @param {HTMLElement} element
 * @returns {{ activate: () => void; deactivate: () => void }}
 */
let subscribeFocusTrap = (element) => {
	let focusTrap = createFocusTrap(element)

	return {
		/** @returns {void} */
		activate: () => {
			focusTrap.activate()
		},
		/** @returns {void} */
		deactivate: () => {
			focusTrap.deactivate()
		},
	}
}

export { subscribeFocusTrap }
