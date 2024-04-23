import { createElement } from '~/libs/helpers/helpers.js'

/** @returns {HTMLButtonElement} */
let getEasterEggControl = () => {
	return /** @type {HTMLButtonElement} */ (
		createElement(`
		<button
			class="not-easter-egg__audio-control action switch"
			type="button" role="switch"
			aria-checked="false"
			aria-label="Toggle playing of love"
		>
		</button>
	`)
	)
}

export { getEasterEggControl }
