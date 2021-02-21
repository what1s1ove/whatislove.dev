import { debounce } from '~/helpers'
import { SettingBtnLabel, SettingName } from '~/common/enums'
import { getPlayerElement, getNodeRandomCoords } from './helpers'
import { SOUND_SRC, RESIZE_DELAY } from './common/constants'

class EasterEgg {
  constructor({ onClick }) {
    this._onClick = onClick

    this._easterEggContainer = null
    this._easterEggBtn = null
    this._audio = null

    this._handleEasterEggClick = this._handleEasterEggClick.bind(this)
    this._handleSettingBtnClick = this._handleSettingBtnClick.bind(this)
    this._handleWindowResize = debounce(
      this._handleWindowResize.bind(this),
      RESIZE_DELAY,
    )
  }

  init() {
    this._easterEggContainer = document.querySelector(`.easter-egg`)
    this._easterEggBtn = document.querySelector(`.easter-egg__button`)

    this._setRandomPosition()

    this._initListeners()
  }

  _initListeners() {
    this._easterEggBtn.addEventListener(`click`, this._handleEasterEggClick)
    window.addEventListener(`resize`, this._handleWindowResize)
  }

  _removeListeners() {
    this._easterEggBtn.removeEventListener(`click`, this._handleEasterEggClick)
    window.removeEventListener(`resize`, this._handleWindowResize)
  }

  _renderPlayer() {
    this._audio = getPlayerElement(SOUND_SRC)

    document.body.append(this._audio)
  }

  _setRandomPosition() {
    const { x, y } = getNodeRandomCoords(this._easterEggContainer)

    this._easterEggContainer.style.top = `${y}px`
    this._easterEggContainer.style.left = `${x}px`
  }

  _handleEasterEggClick() {
    this._renderPlayer()

    this._onClick({
      name: SettingName.WHATISLOVE,
      label: SettingBtnLabel.SWITCH_LOVE,
      isDefaultChecked: true,
      onClick: this._handleSettingBtnClick,
    })

    this._removeListeners()

    this._easterEggBtn.remove()
  }

  _handleSettingBtnClick({ isChecked }) {
    isChecked ? this._audio.play() : this._audio.pause()
  }

  _handleWindowResize() {
    this._setRandomPosition()
  }
}

export { EasterEgg }
