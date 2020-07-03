import { setAttribute } from '../../helpers'
import { MediaBooleanTypes } from './common'

const initSettingBtn = (options) => {
  const { target, mediaQuery, attr, checkTypes, isDefaultSetAttr } = options
  const dataAttr = `data-${attr}`

  const storageValue = localStorage.getItem(mediaQuery)
  const isChecked = storageValue
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
    const { checked } = evt.target

    setAttribute(
      document.documentElement,
      dataAttr,
      checked ? checkTypes.checked : checkTypes.unchecked
    )

    localStorage.setItem(mediaQuery, checked)
  })
}

export { initSettingBtn }
