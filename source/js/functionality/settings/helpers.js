import { setAttribute } from '../../helpers/index'
import { MediaBooleanTypes } from './common'

const initSettingBtn = (options) => {
  const { target, mediaQuery, attr, checkTypes, isDefaultSetAttr } = options

  const storageValue = localStorage.getItem(mediaQuery)
  const isChecked = storageValue
    ? MediaBooleanTypes[storageValue]
    : window.matchMedia(mediaQuery).matches

  if (storageValue || isDefaultSetAttr) {
    setAttribute(attr, isChecked ? checkTypes.checked : checkTypes.unchecked)
  }

  // eslint-disable-next-line no-param-reassign
  target.checked = isChecked

  target.addEventListener(`change`, (evt) => {
    const { checked } = evt.target

    setAttribute(attr, checked ? checkTypes.checked : checkTypes.unchecked)

    localStorage.setItem(mediaQuery, checked)
  })
}

export { initSettingBtn }
