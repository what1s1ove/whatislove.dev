import { createElement } from '~/libs/helpers/helpers.js'

/** @typedef {typeof import('~/pages/main/libs/enums/enums').SettingName} SettingName */
/** @typedef {typeof import('~/pages/main/libs/enums/enums').SettingButtonLabel} SettingButtonLabel */

/**
 * @param {{
 * 	label: SettingButtonLabel[keyof SettingButtonLabel]
 * 	name: SettingName[keyof SettingName]
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
