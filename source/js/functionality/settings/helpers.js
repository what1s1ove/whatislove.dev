import { setAttribute } from '../../helpers/index'
import { MediaBooleanTypes } from './common'

const initSettingBtn = (options) => {
  let { target, mediaQuery, attr, checkTypes, isDefaultSetAttr } = options
  let dataAttr = `data-${attr}`

  let storageValue = localStorage.getItem(mediaQuery)
  let isChecked = storageValue
    ? MediaBooleanTypes[storageValue]
    : window.matchMedia(mediaQuery).matches

  // eslint-disable-next-line curly
  if (storageValue || isDefaultSetAttr) {
    setAttribute(
      document.documentElement,
      dataAttr,
      isChecked ? checkTypes.checked : checkTypes.unchecked
    )
  }

  // eslint-disable-next-line no-param-reassign
  target.checked = isChecked

  target.addEventListener(`change`, (evt) => {
    let { checked } = evt.target

    setAttribute(
      document.documentElement,
      dataAttr,
      checked ? checkTypes.checked : checkTypes.unchecked
    )

    localStorage.setItem(mediaQuery, checked)
  })
}

export { initSettingBtn }
