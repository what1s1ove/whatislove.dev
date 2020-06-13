import {
  getTargetValue,
  getFormValues,
  changeObjectKey,
} from '../../helpers/index'
import { timelineData } from '../../data/index'
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
