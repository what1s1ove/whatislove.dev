import { createElement } from '~/helpers/helpers.js'

/** @typedef {typeof import('~/common/enums/enums.js').SettingName} SettingName */
/** @typedef {typeof import('~/common/enums/enums.js').SettingButtonLabel} SettingButtonLabel */

/**
 * @param {{
 *   label: SettingButtonLabel[keyof SettingButtonLabel]
 *   name: SettingName[keyof SettingName]
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
