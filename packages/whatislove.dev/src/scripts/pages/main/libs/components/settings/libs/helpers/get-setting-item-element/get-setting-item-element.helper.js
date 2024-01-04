import { createElement } from '~/libs/helpers/helpers.js'
import { ValuesOf } from '~/libs/types/types.js'
import {
	SettingButtonLabel,
	SettingName,
} from '~/pages/main/libs/enums/enums.js'

/**
 * @param {{
 * 	label: ValuesOf<typeof SettingButtonLabel>
 * 	name: ValuesOf<typeof SettingName>
 * }} params
 * @returns {HTMLElement}
 */
let getSettingItemElement = ({ label, name }) => {
	return createElement(`
		<li class="settings__item">
			<button
				class="settings__item-switch settings__item-switch--${name}"
				type="button" role="switch"
				aria-checked="false"
			>
				<span class="visually-hidden">${label}</span>
			</button>
		</li>
	`)
}

export { getSettingItemElement }
