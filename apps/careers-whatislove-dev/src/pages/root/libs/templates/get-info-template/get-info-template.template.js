import { html } from 'lit'

import { ValuesOf } from '~/libs/types/types.js'

import { Scene } from '../../../libs/enums/enums.js'

/**
 * @param {{
 * 	scene: ValuesOf<typeof Scene>
 * }} elementOffset
 * @returns {ReturnType<html>}
 */
let getInfoTemplate = ({ scene }) => {
	return html`
		<div class="info">
			<button class="info-btn info-btn--${scene}" popovertarget="info">
				<cwd-visually-hidden>Info</cwd-visually-hidden>
			</button>
			<div class="info-content" id="info" popover>
				<dl>
					<dt>Track</dt>
					<dd>
						<a
							href="https://open.spotify.com/track/1pDtsyUe9vv80YBHS1yfw0"
							target="_blank"
							rel="noreferrer noopener"
						>
							No_4mat – I'll Call U Mine
						</a>
					</dd>
					<dt>Video</dt>
					<dd>
						Randoms from ones
						<a
							href="https://coub.com/random"
							target="_blank"
							rel="noreferrer noopener"
						>
							coub.com
						</a>
					</dd>
					<dt>Font</dt>
					<dd>
						<a
							href="https://en.wikipedia.org/wiki/Helvetica"
							target="_blank"
							rel="noreferrer noopener"
						>
							Helvetica
						</a>
					</dd>
				</dl>
			</div>
		</div>
	`
}

export { getInfoTemplate }
