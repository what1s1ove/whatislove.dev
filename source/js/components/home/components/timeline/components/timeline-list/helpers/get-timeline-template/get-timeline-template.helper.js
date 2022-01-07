import { getFormattedDate, getStringWitCheck } from '~/helpers/helpers.js'

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
      <span class="timeline__icon-wrapper" aria-hidden="true">
        <span class="timeline__icon timeline__icon--${type}"></span>
      </span>
    </li>
  `
}

export { getTimelineTemplate }
