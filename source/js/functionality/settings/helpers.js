import { MediaBooleanMap } from './common'

const setSettingAttr = (isChecked, attr, checkTypes) => {
  document.documentElement.setAttribute(
    attr,
    isChecked ? checkTypes.CHECKED : checkTypes.UNCHECKED,
  )
}

const checkHasDefaultCheck = (mediaQuery) => {
  const storageValue = localStorage.getItem(mediaQuery)

  const isChecked = storageValue
    ? MediaBooleanMap[storageValue]
    : window.matchMedia(mediaQuery).matches

  return isChecked
}

const initSettingBtn = (options) => {
  const { togglerNode, mediaQuery, attr, checkTypes } = options
  const dataAttr = `data-${attr}`

  const hasDefaultCheck = checkHasDefaultCheck(mediaQuery)

  setSettingAttr(hasDefaultCheck, dataAttr, checkTypes)

  togglerNode.checked = hasDefaultCheck

  togglerNode.addEventListener(`change`, (evt) => {
    const { checked } = evt.target

    setSettingAttr(checked, dataAttr, checkTypes)

    localStorage.setItem(mediaQuery, checked)
  })
}

export { initSettingBtn }
