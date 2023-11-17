import { getFormattedDate, getStringWitCheck } from '~/helpers/helpers.js'

/** @typedef {import('~/common/types/timeline/timeline').Timeline} Timeline */

/**
 * @param {Timeline} timeline
 * @returns {string}
 */
let getTimelineTemplate = (timeline) => {
  let { date, desc, endDate, link, linkDesc, origin, originDesc, title, type } =
    timeline

  let titleStringNode = getStringWitCheck(
    title,
    `<h3 class="timeline__item-title">${title}</h3>`,
  )
  let originStringNode = getStringWitCheck(
    origin,
    `<a class="timeline__item-origin" href="${origin}" target="_blank" rel="noreferrer">${originDesc}</a>`,
  )
  let descStringNode = getStringWitCheck(
    desc,
    `<p class="timeline__item-desc">${desc}</p>`,
  )
  let linkStringNode = getStringWitCheck(
    link,
    `<a class="timeline__item-link" href="${link}" target="_blank" rel="noreferrer">${linkDesc}</a>`,
  )
  let endDateStringNode = getStringWitCheck(
    endDate,
    `<time datetime="${endDate}"> — ${getFormattedDate(endDate)}</time>`,
  )
  let dateStringNode = getStringWitCheck(
    date,
    `
      <p class="timeline__dates">
        <time datetime="${date}">${getFormattedDate(date)}</time>
        ${endDateStringNode}
      </p>
    `,
  )

  return `
    <li class="timeline__item">
      <div class="timeline__item-wrapper">
        ${titleStringNode}
        ${originStringNode}
        ${descStringNode}
        ${linkStringNode}
        ${dateStringNode}
      </div>
      <span class="timeline__icon-wrapper" aria-hidden="true">
        <span class="timeline__icon timeline__icon--${type}"></span>
      </span>
    </li>
  `
}

export { getTimelineTemplate }
