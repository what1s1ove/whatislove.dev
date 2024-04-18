import { getFormattedDate, getStringWitCheck } from '~/libs/helpers/helpers.js'
import { Timeline } from '~/modules/timeline/timeline.js'

/**
 * @param {Timeline} timeline
 * @returns {string}
 */
let getTimelineTemplate = (timeline) => {
	let { date, desc, endDate, link, linkDesc, origin, originDesc, title } =
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
		`<p class="timeline__item-description">${desc}</p>`,
	)
	let linkStringNode = getStringWitCheck(
		link,
		`<a class="timeline__item-link" href="${link}" target="_blank" rel="noreferrer">${linkDesc}</a>`,
	)
	let endDateStringNode = getStringWitCheck(
		endDate,
		`<time class="timeline__item-date" datetime="${endDate}"> — ${getFormattedDate(endDate)}</time>`,
	)
	let dateStringNode = getStringWitCheck(
		date,
		`
	<p class="timeline__item-dates">
		<time class="timeline__item-date" datetime="${date}">${getFormattedDate(date)}</time>
		${endDateStringNode}
	</p>
	`,
	)

	return `
		<li class="timeline__item">
				${dateStringNode}
				${titleStringNode}
				${originStringNode}
				${descStringNode}
				${linkStringNode}
		</li>
	`
}

export { getTimelineTemplate }
