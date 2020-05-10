import { outputStringNodes } from '../../helpers/index'
import { TimelineIcons } from '../../common/map/index'

const outputTimelineItems = (timelineList, timelineData, filterValues) => {
  const filterdTimelineData = timelineData.filter((it) => {
    const isSuitable =
      filterValues.skillTypes[it.skillType] && filterValues.types[it.type]

    return isSuitable
  })

  const timelineItems = filterdTimelineData.reduce((acc, it) => {
    const timelineItem = getTimelineItem(it)

    return [...acc, timelineItem]
  }, [])

  outputStringNodes(timelineList, timelineItems)
}

const getTimelineItem = (itemData) => {
  const { type, title, desk, date, endDate } = itemData

  const itmelineItem = `<li class="timeline__item">
  <div class="timeline__item-wrapper">
    ${title ? `<h3 class="timeline__item-title">${title}</h3>` : ``}
    ${desk ? `<p class="timeline__item-desc">${desk}</p>` : ``}
    ${
      date
        ? `<p class="timeline__dates">
            <time>${date}</time>
            ${endDate ? `<time>- ${endDate}</time>` : ``}
           </p>`
        : ``
    }
  </div>
  <span class="timeline__icon-wrapper">
    <svg class="timeline__icon" width="28" height="28" aria-hidden="true">
      <use xlink:href="img/sprite.svg#timeline-${
        TimelineIcons[type]
      }.icon"></use>
    </svg>
  </span>
</li>`

  return itmelineItem
}

export { getTimelineItem, outputTimelineItems }
