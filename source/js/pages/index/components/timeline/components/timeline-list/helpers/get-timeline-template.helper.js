import { getFormattedDate, getStringWitCheck } from '~/helpers'

const getTimelineTemplate = (timeline) => {
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
  } = timeline

  return `
    <li class="timeline__item">
      <div class="timeline__item-wrapper">
        ${getStringWitCheck(title, `<h3 class="timeline__item-title">${title}</h3>`)}
        ${getStringWitCheck(origin, `<a class="timeline__item-origin" href="${origin}" target="_blank" rel="noreferrer">${originDesc}</a>`)}
        ${getStringWitCheck(desc, `<p class="timeline__item-desc">${desc}</p>`)}
        ${getStringWitCheck(link, `<a class="timeline__item-link" href="${link}" target="_blank" rel="noreferrer">${linkDesc}</a>`)}
        ${getStringWitCheck(date, `
          <p class="timeline__dates">
            <time datetime="${date}">${getFormattedDate(date)}</time>
            ${getStringWitCheck(endDate, `<time datetime="${endDate}"> — ${getFormattedDate(endDate)}</time>`)}
          </p>
          `)}
      </div>
      <span class="timeline__icon-wrapper">
        <svg class="timeline__icon" width="28" height="28" aria-hidden="true">
          <use xlink:href="img/sprite.svg#timeline-${type}.icon"></use>
        </svg>
      </span>
    </li>
  `
}

export { getTimelineTemplate }
