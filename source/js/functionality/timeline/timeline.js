import {
  getTargetValue,
  getFormValues,
  changeObjectKey,
} from '../../helpers/index'
import { timelineData } from '../../data/index'
import { outputTimelineItems } from './helpers'

const timelineList = document.querySelector(`.timeline__list`)
const filterForm = document.forms.timeline

const filterSettings = getFormValues(filterForm.elements)

const setNewFilter = (newFilter) => {
  outputTimelineItems(timelineList, timelineData, newFilter)
}

setNewFilter(filterSettings)

export const initTimelineForm = () => {
  filterForm.addEventListener('change', ({ target }) => {
    const targetValue = getTargetValue(target)

    const newFilterSettings = changeObjectKey(
      filterSettings,
      target.name,
      targetValue
    )

    setNewFilter(newFilterSettings)
  })
}
