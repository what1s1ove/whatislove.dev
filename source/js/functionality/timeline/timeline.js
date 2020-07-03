import {
  getTargetValue,
  getFormValues,
  changeObjectKey,
} from '../../helpers'
import { timelineData } from '../../data'
import { outputTimelineItems } from './helpers'

let timelineList = document.querySelector(`.timeline__list`)
let filterForm = document.forms.timeline

let filterSettings = getFormValues(filterForm.elements)

let setNewFilter = (newFilter) => {
  outputTimelineItems(timelineList, timelineData, newFilter)
}

setNewFilter(filterSettings)

export default () => {
  filterForm.addEventListener(`change`, ({ target }) => {
    let targetValue = getTargetValue(target)

    let newFilterSettings = changeObjectKey(
      filterSettings,
      target.name,
      targetValue
    )

    setNewFilter(newFilterSettings)
  })
}
