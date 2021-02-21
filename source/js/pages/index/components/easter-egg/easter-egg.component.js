import { SettingBtnLabel, SettingName } from '~/common/enums'
import { getPlayerElement } from './helpers'
import { SOUND_SRC } from './common/constants'

class EasterEgg {
  constructor({ onClick }) {
    this._onClick = onClick

    this._easterEggBtn = null
    this._audio = null

    this._handleEasterEggClick = this._handleEasterEggClick.bind(this)
    this._handleSettingBtnClick = this._handleSettingBtnClick.bind(this)
  }

  init() {
    this._easterEggBtn = document.querySelector(`.easter-egg`)

    this._initListeners()
  }

  _initListeners() {
    this._easterEggBtn.addEventListener(`click`, this._handleEasterEggClick)
  }

  _renderPlayer() {
    this._audio = getPlayerElement(SOUND_SRC)

    document.body.append(this._audio)
  }

  _handleEasterEggClick() {
    this._renderPlayer()

    this._onClick({
      name: SettingName.WHATISLOVE,
      label: SettingBtnLabel.SWITCH_LOVE,
      isDefaultChecked: true,
      onClick: this._handleSettingBtnClick,
    })

    this._easterEggBtn.remove()
  }

  _handleSettingBtnClick({ isChecked }) {
    isChecked ? this._audio.play() : this._audio.pause()
  }
}

export { EasterEgg }
