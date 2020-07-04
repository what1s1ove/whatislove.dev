import { getTargetValue, getFormValues, changeObjectKey } from '~/helpers'
import { timelineData } from '~/data'
import { outputTimelineItems } from './helpers'

const timelineListNode = document.querySelector(`.timeline__list`)
const filterFormNode = document.forms.timeline

const setNewFilter = (newFilter) => {
  outputTimelineItems(timelineListNode, timelineData, newFilter)
}

export default () => {
  const defaultFilterSettings = getFormValues(filterFormNode.elements)

  setNewFilter(defaultFilterSettings)

  filterFormNode.addEventListener(`change`, ({ target }) => {
    const targetValue = getTargetValue(target)

    const newFilterSettings = changeObjectKey(
      defaultFilterSettings,
      target.name,
      targetValue
    )

    setNewFilter(newFilterSettings)
  })
}
