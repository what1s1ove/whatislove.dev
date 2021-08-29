import { getFormattedDate, getStringWitCheck } from '~/helpers/helpers.js'
import { getReplacedIconPath } from '../get-replaced-icon-path/get-replaced-icon-path.helper.js'

const getTimelineTemplate = (timeline, iconPath) => {
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

  const replacedIconPath = getReplacedIconPath(iconPath, type)
  const titleStrNode = getStringWitCheck(
    title,
    `<h3 class="timeline__item-title">${title}</h3>`,
  )
  const originStrNode = getStringWitCheck(
    origin,
    `<a class="timeline__item-origin" href="${origin}" target="_blank" rel="noreferrer">${originDesc}</a>`,
  )
  const descStrNode = getStringWitCheck(
    desc,
    `<p class="timeline__item-desc">${desc}</p>`,
  )
  const linkStrNode = getStringWitCheck(
    link,
    `<a class="timeline__item-link" href="${link}" target="_blank" rel="noreferrer">${linkDesc}</a>`,
  )
  const endDateStrNode = getStringWitCheck(
    endDate,
    `<time datetime="${endDate}"> — ${getFormattedDate(endDate)}</time>`,
  )
  const dateStrNode = getStringWitCheck(
    date,
    `
      <p class="timeline__dates">
        <time datetime="${date}">${getFormattedDate(date)}</time>
        ${endDateStrNode}
      </p>
    `,
  )

  return `
    <li class="timeline__item">
      <div class="timeline__item-wrapper">
        ${titleStrNode}
        ${originStrNode}
        ${descStrNode}
        ${linkStrNode}
        ${dateStrNode}
      </div>
      <span class="timeline__icon-wrapper">
        <svg class="timeline__icon" width="28" height="28" aria-hidden="true">
          <use xlink:href="${replacedIconPath}"></use>
        </svg>
      </span>
    </li>
  `
}

export { getTimelineTemplate }
