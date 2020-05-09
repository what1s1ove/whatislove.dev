import { setAttribute } from '../../helpers/index'
import { AttributeTypes } from '../../common/map/index'
import { AnimateTypes } from './common'

const initAnimate = () => {
  const animateBtn = document.querySelector(`.settings__button--animate input`)

  animateBtn.addEventListener(`change`, () => {
    animateBtn.checked
      ? setAttribute(AttributeTypes.ANIMATE, AnimateTypes.ALLOW)
      : setAttribute(AttributeTypes.ANIMATE, AnimateTypes.NOT_ALLOW)
  })
}

export { initAnimate }
