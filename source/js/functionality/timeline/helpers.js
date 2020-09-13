import { getFormattedDate } from '~/helpers'
import { timelineIconMap } from '~/common/maps'

const SVG_HREF_ATTR = `xlink:href`

const checkIsSuitableItem = (timelineItem, filterValues) => {
  const isSuitable = filterValues.skillTypes[timelineItem.skillType] && filterValues.types[timelineItem.type]

  return isSuitable
}

const getReplacedIconPath = (iconSourceNode, iconType) => {
  const replacedIconPath = iconSourceNode
    .getAttribute(SVG_HREF_ATTR)
    .replace(/timeline-(.*)\./, `timeline-${timelineIconMap[iconType]}.`)

  return replacedIconPath
}

const getTimelineItemNode = (getTimelineItemTemplateNode, itemData) => {
  const {
    type,
    title,
    origin,
    originDesc,
    desc,
    link,
    linkDesc,
    date,
    endDate,
  } = itemData
  const timelineItemNode = getTimelineItemTemplateNode.cloneNode(true)
  const originLinkNode = timelineItemNode.querySelector(`.timeline__item-origin`)
  const titleNode = timelineItemNode.querySelector(`.timeline__item-title`)
  const descriptionNode = timelineItemNode.querySelector(`.timeline__item-desc`)
  const linkNode = timelineItemNode.querySelector(`.timeline__item-link`)
  const dateStartNode = timelineItemNode.querySelector(`.timeline__dates-date--start`)
  const dateEndNode = timelineItemNode.querySelector(`.timeline__dates-date--end`)
  const iconSourceNode = timelineItemNode.querySelector(`.timeline__icon-source`)
  const replacedIconPage = getReplacedIconPath(iconSourceNode, type)

  titleNode.textContent = title

  originLinkNode.textContent = originDesc
  originLinkNode.href = origin || ``

  descriptionNode.textContent = desc

  linkNode.textContent = linkDesc
  linkNode.href = link || ``

  dateStartNode.textContent = date ? getFormattedDate(date) : ``
  dateStartNode.dateTime = date || ``

  dateEndNode.textContent = endDate ? `— ${getFormattedDate(endDate)}` : ``
  dateEndNode.dateTime = endDate || ``

  iconSourceNode.setAttribute(SVG_HREF_ATTR, replacedIconPage)

  return timelineItemNode
}

const getTimelineItemNodes = (timelineItemTemplateNode, timelineItems, filterValues) => {
  const timelineItemNodes = timelineItems.reduce((acc, it) => {
    const isSuitable = checkIsSuitableItem(it, filterValues)

    return isSuitable
      ? [...acc, getTimelineItemNode(timelineItemTemplateNode, it)]
      : acc
  }, [])

  return timelineItemNodes
}

export { getTimelineItemNodes }
