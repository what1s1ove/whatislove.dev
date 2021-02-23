import { ICON_HREF_ATTR } from '../../common/constants'

const getIconPath = () => {
  return document
    .querySelector(`.timeline-icon`)
    .content.querySelector(`.timeline__icon-source`)
    .getAttribute(ICON_HREF_ATTR)
}

export { getIconPath }
