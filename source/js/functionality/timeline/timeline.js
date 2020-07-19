import {
  getTargetValue,
  getFormValues,
  changeObjectKey,
  debounce,
} from '~/helpers'
import { timelineData } from '~/data'
import { outputTimelineItems } from './helpers'

const DEBOUNCE_DELAY = 200

const timelineListNode = document.querySelector(`.timeline__list`)
const filterFormNode = document.forms.timeline

const setNewFilter = (newFilter) => {
  outputTimelineItems(timelineListNode, timelineData, newFilter)
}

const defaultFilterSettings = getFormValues(filterFormNode.elements)

const onChangeForm = ({ target }) => {
  const targetValue = getTargetValue(target)

  const newFilterSettings = changeObjectKey(
    defaultFilterSettings,
    target.name,
    targetValue
  )

  setNewFilter(newFilterSettings)
}

export default () => {
  setNewFilter(defaultFilterSettings)

  filterFormNode.addEventListener(
    `change`,
    debounce(onChangeForm, DEBOUNCE_DELAY)
  )
}
