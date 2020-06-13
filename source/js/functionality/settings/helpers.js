import { setAttribute } from '../../helpers/index'
import { MediaBooleanTypes } from './common'

const initSettingBtn = (options) => {
  let { target, mediaQuery, attr, checkTypes, isDefaultSetAttr } = options
  let DataAttr = `data-${attr}`

  let storageValue = localStorage.getItem(mediaQuery)
  let isChecked = storageValue
    ? MediaBooleanTypes[storageValue]
    : window.matchMedia(mediaQuery).matches

  if (storageValue || isDefaultSetAttr) {
    setAttribute(
      document.documentElement,
      DataAttr,
      isChecked ? checkTypes.checked : checkTypes.unchecked
    )
  }

  // eslint-disable-next-line no-param-reassign
  target.checked = isChecked

  target.addEventListener(`change`, (evt) => {
    let { checked } = evt.target

    setAttribute(
      document.documentElement,
      DataAttr,
      checked ? checkTypes.checked : checkTypes.unchecked
    )

    localStorage.setItem(mediaQuery, checked)
  })
}

export { initSettingBtn }
