import { createElement } from '~/helpers/helpers.js'

const getSettingItemElement = ({ name, label }) => {
  return createElement(`
    <li class="settings__item">
      <button class="settings__button settings__button--${name}" type="button" role="switch" aria-checked="false">
        <span class="visually-hidden">${label}</span>
      </button>
    </li>
  `)
}

export { getSettingItemElement }
