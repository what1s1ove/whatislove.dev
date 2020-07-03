import {
  getTargetValue,
  getFormValues,
  changeObjectKey,
} from '../../helpers'
import { timelineData } from '../../data'
import { outputTimelineItems } from './helpers'

const timelineList = document.querySelector(`.timeline__list`)
const filterForm = document.forms.timeline

const filterSettings = getFormValues(filterForm.elements)

const setNewFilter = (newFilter) => {
  outputTimelineItems(timelineList, timelineData, newFilter)
}

setNewFilter(filterSettings)

export default () => {
  filterForm.addEventListener(`change`, ({ target }) => {
    const targetValue = getTargetValue(target)

    const newFilterSettings = changeObjectKey(
      filterSettings,
      target.name,
      targetValue
    )

    setNewFilter(newFilterSettings)
  })
}
