import {
  getTargetValue,
  getFormValues,
  changeObjectKey,
  debounce,
} from '~/helpers'
import { timelineData as timelineItems } from '~/data'
import { getTimelineItemNodes } from './helpers'

const DEBOUNCE_DELAY = 200

const timelineListNode = document.querySelector(`.timeline__list`)
const timelineItemNode = document
  .querySelector(`.timeline-item`)
  .content.querySelector(`.timeline__item`)
const filterFormNode = document.forms.timeline

const renderTimelineItems = (filterValues) => {
  const timelineItemNodes = getTimelineItemNodes(
    timelineItemNode,
    timelineItems,
    filterValues
  )

  timelineListNode.innerHTML = ``

  timelineListNode.append(...timelineItemNodes)
}

const defaultFilterSettings = getFormValues(filterFormNode.elements)

const onFormChange = ({ target }) => {
  const targetValue = getTargetValue(target)

  const newFilterSettings = changeObjectKey(
    defaultFilterSettings,
    target.name,
    targetValue
  )

  renderTimelineItems(newFilterSettings)
}

export default () => {
  renderTimelineItems(defaultFilterSettings)

  filterFormNode.addEventListener(
    `change`,
    debounce(onFormChange, DEBOUNCE_DELAY)
  )
}
