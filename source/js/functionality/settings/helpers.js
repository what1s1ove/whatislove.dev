import { setAttribute } from '../../helpers/index'
import { MediaBooleanTypes } from './common'

const initSettingBtn = (toggler, mediaQuery, attr, types) => {
  const storageValue = localStorage.getItem(mediaQuery)
  const mappedTypes = Object.values(types)
  const checkedValue = mappedTypes[0]
  const uncheckedValue = mappedTypes[1]
  let isChecked

  if (storageValue) {
    isChecked = MediaBooleanTypes[storageValue]

    setAttribute(attr, isChecked ? checkedValue : uncheckedValue)
  } else {
    isChecked = window.matchMedia(mediaQuery).matches
  }

  // eslint-disable-next-line no-param-reassign
  toggler.checked = isChecked

  toggler.addEventListener(`change`, (evt) => {
    const { checked } = evt.target

    setAttribute(attr, checked ? checkedValue : uncheckedValue)

    localStorage.setItem(mediaQuery, checked)
  })
}

export { initSettingBtn }
