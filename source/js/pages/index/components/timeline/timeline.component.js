import {
  getTargetValue,
  getFormValues,
  changeObjectKey,
  debounce,
  getFormattedDate,
  configureNode,
} from '~/helpers'

const DEBOUNCE_DELAY = 200
const SVG_HREF_ATTR = `xlink:href`

const timelineListNode = document.querySelector(`.timeline__list`)
const timelineItemTemplate = document
  .querySelector(`.timeline-item`)
  .content.querySelector(`.timeline__item`)
const filterFormNode = document.forms.timeline

const defaultFilterSettings = getFormValues(filterFormNode.elements)

class Timeline {
  constructor({ timelineApi }) {
    this._timelineApi = timelineApi

    this._onFormChange = this._onFormChange.bind(this)
  }

  init() {
    this._renderTimelineItems(defaultFilterSettings)

    filterFormNode.addEventListener(
      `change`,
      debounce(this._onFormChange, DEBOUNCE_DELAY),
    )
  }

  async _renderTimelineItems(filterValues) {
    const templates = await this._timelineApi.getTimelines()
    const timelineItemNodes = this._getTimelineItemNodes(
      timelineItemTemplate,
      templates,
      filterValues,
    )

    timelineListNode.innerHTML = ``

    timelineListNode.append(...timelineItemNodes)
  }

  _onFormChange({ target }) {
    const targetValue = getTargetValue(target)

    const newFilterSettings = changeObjectKey(
      defaultFilterSettings,
      target.name,
      targetValue,
    )

    this._renderTimelineItems(newFilterSettings)
  }

  _checkIsSuitableItem(timelineItem, filterValues) {
    const isSuitable =
      filterValues.skillTypes[timelineItem.skillType] &&
      filterValues.types[timelineItem.type]

    return isSuitable
  }

  _getReplacedIconPath(iconSourceNode, type) {
    const replacedIconPath = iconSourceNode
      .getAttribute(SVG_HREF_ATTR)
      .replace(/timeline-(.*)\./, `timeline-${type}.`)

    return replacedIconPath
  }

  _getTimelineItemNode(timelineItemTemplateNode, itemData) {
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
    const timelineItemNode = timelineItemTemplateNode.cloneNode(true)
    const originLinkNode = timelineItemNode.querySelector(
      `.timeline__item-origin`,
    )
    const titleNode = timelineItemNode.querySelector(`.timeline__item-title`)
    const descriptionNode = timelineItemNode.querySelector(
      `.timeline__item-desc`,
    )
    const linkNode = timelineItemNode.querySelector(`.timeline__item-link`)
    const dateStartNode = timelineItemNode.querySelector(
      `.timeline__dates-date--start`,
    )
    const dateEndNode = timelineItemNode.querySelector(
      `.timeline__dates-date--end`,
    )
    const iconSourceNode = timelineItemNode.querySelector(
      `.timeline__icon-source`,
    )
    const replacedIconPage = this._getReplacedIconPath(iconSourceNode, type)

    configureNode(titleNode, {
      textContent: title,
    })

    configureNode(originLinkNode, {
      textContent: originDesc,
      href: origin ?? ``,
    })

    configureNode(descriptionNode, {
      textContent: desc,
    })

    configureNode(linkNode, {
      textContent: linkDesc,
      href: link ?? ``,
    })

    configureNode(dateStartNode, {
      textContent: date ? getFormattedDate(date) : ``,
      dateTime: date ?? ``,
    })

    configureNode(dateEndNode, {
      textContent: endDate ? `— ${getFormattedDate(endDate)}` : ``,
      dateTime: endDate ?? ``,
    })

    iconSourceNode.setAttribute(SVG_HREF_ATTR, replacedIconPage)

    return timelineItemNode
  }

  _getTimelineItemNodes(timelineItemTemplateNode, timelineItems, filterValues) {
    const timelineItemNodes = timelineItems.reduce((acc, it) => {
      const isSuitable = this._checkIsSuitableItem(it, filterValues)

      return isSuitable
        ? [...acc, this._getTimelineItemNode(timelineItemTemplateNode, it)]
        : acc
    }, [])

    return timelineItemNodes
  }
}

export { Timeline }
