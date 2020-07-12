/* eslint-disable indent */
import { renderStringNodes, getFormattedDate } from '~/helpers'
import { timelineIconMap } from '~/common/maps'

const getTimelineItem = (itemData) => {
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

  const timelineItem = `
    <li class="timeline__item">
      <div class="timeline__item-wrapper">
        ${title ? `<h3 class="timeline__item-title">${title}</h3>` : ``}
        ${
          origin
            ? `<a class="timeline__item-origin" href="${origin}" target="_blank" rel="noreferrer">${originDesc}</a>`
            : ``
        }
        ${desc ? `<p class="timeline__item-desc">${desc}</p>` : ``}
        ${
          link
            ? `<a class="timeline__item-link" href="${link}" target="_blank" rel="noreferrer">${linkDesc}</a>`
            : ``
        }
        ${
          date
            ? `<p class="timeline__dates">
                <time datetime="${date}">${getFormattedDate(date)}</time>
                ${
                  endDate
                    ? `<time datetime="${endDate}">
                        — ${getFormattedDate(endDate)}
                      </time>`
                    : ``
                }
              </p>`
            : ``
        }
      </div>
      <span class="timeline__icon-wrapper">
        <svg class="timeline__icon" width="28" height="28" aria-hidden="true">
          <use xlink:href="img/sprite.svg#timeline-${
            timelineIconMap[type]
          }.icon"></use>
        </svg>
      </span>
    </li>`

  return timelineItem
}

const outputTimelineItems = (timelineList, timelineData, filterValues) => {
  const filteredTimelineData = timelineData.filter((it) => {
    // eslint-disable-next-line operator-linebreak
    const isSuitable =
      filterValues.skillTypes[it.skillType] && filterValues.types[it.type]

    return isSuitable
  })

  const timelineItems = filteredTimelineData.map((it) => {
    const timelineItem = getTimelineItem(it)

    return timelineItem
  })

  renderStringNodes(timelineList, timelineItems)
}

export { outputTimelineItems }
