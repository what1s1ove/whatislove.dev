import { setAttribute } from '../../helpers/index'
import { AttributeTypes } from '../../common/map/index'
import { AnimateTypes } from './common'

const initAnimate = () => {
  

  const isPreferReduce = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches

  animateBtn.checked = isPreferReduce

  animateBtn.addEventListener(`change`, () => {
    animateBtn.checked
      ? setAttribute(AttributeTypes.ANIMATE, AnimateTypes.ALLOW)
      : setAttribute(AttributeTypes.ANIMATE, AnimateTypes.NOT_ALLOW)
  })
}

export { initAnimate }
