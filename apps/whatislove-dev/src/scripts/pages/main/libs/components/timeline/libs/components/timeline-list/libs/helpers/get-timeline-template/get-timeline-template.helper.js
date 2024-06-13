import { getFormattedDate, getISODate } from '~/libs/helpers/helpers.js'
import { Timeline } from '~/modules/timeline/timeline.js'

/**
 * @param {Timeline} timeline
 * @returns {string}
 */
let getTimelineTemplate = (timeline) => {
	let { date, desc, endDate, link, linkDesc, origin, originDesc, title } =
		timeline

	let titleStringNode = title
		? `<h3 class="timeline__item-title">${title}</h3>`
		: ``

	let originStringNode = origin
		? `<a class="timeline__item-origin" href="${origin}" target="_blank" rel="noreferrer noopener">${originDesc}</a>`
		: ``

	let descStringNode = desc
		? `<p class="timeline__item-description">${desc}</p>`
		: ``

	let linkStringNode = link
		? `<a class="timeline__item-link" href="${link}" target="_blank" rel="noreferrer noopener">${linkDesc}</a>`
		: ``

	let endDateStringNode = endDate
		? `
			<time class="timeline__item-date timeline__item-date--end" datetime="${getISODate(endDate)}">
				${getFormattedDate(endDate, `M_YEAR`)}
			</time>
		`
		: ``

	let dateStringNode = date
		? `
			<p class="timeline__item-dates">
				<time class="timeline__item-date timeline__item-date--start" datetime="${getISODate(date)}">${getFormattedDate(date, `M_YEAR`)}</time>
				${endDateStringNode}
			</p>
		`
		: ``

	return `
		<li class="timeline__item">
				${dateStringNode}
				<div class="timeline__item-wrapper">
					${titleStringNode}
					${originStringNode}
					${descStringNode}
					${linkStringNode}
				</div>
		</li>
	`
}

export { getTimelineTemplate }
