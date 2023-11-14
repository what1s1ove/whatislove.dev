import { createElement } from '~/helpers/helpers.js'

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
