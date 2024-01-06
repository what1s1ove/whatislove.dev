import { createElement } from '~/libs/helpers/helpers.js'

/**
 * @param {string} source
 * @returns {HTMLAudioElement}
 */
let getPlayerElement = (source) => {
	return /** @type {HTMLAudioElement} */ (
		createElement(`
			<audio class="visually-hidden" preload="auto" src="${source}">
		`)
	)
}

export { getPlayerElement }
